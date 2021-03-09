# Intercepting requests and responses
- Với các `interceptor` chúng ta có thể quan sát và biến đổi các Http request/response đến server  
- Các `interceptor` có thể thực hiện các nhiệm vụ khác nhau từ authenication, logging, chuẩn hóa các request/response

## Các nội dung chính
1. Tạo và provide một interceptor
2. Setting default headers
3. Using interceptors for logging
4. Using interceptors for caching

## Tạo và provide một interceptor
Để tạo `interceptor` chúng ta sẽ định nghĩa một class implements method `intercept()` của interface `HttpInterceptor`.  

```ts
import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class NoopInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      // do something
    return next.handle(req);
  }
}
```
Method `intercept()` có thể chuyển hóa 1 request thành một Observable và cuối cùng return về một HTTP response vì vậy các `interceptor` có thể hoàn toàn xử lý các HTTP request  
Giống như method `intercept()`, method `handle()` biến đổi một HTTP request thành một `Observable` của type `HttpEvents`
chứa response từ server method này được define như sau.  
```ts
export abstract class HttpHandler {
  abstract handle(req: HttpRequest<any>): Observable<HttpEvent<any>>;
}
```

### Provide một `interceptor`
Bởi vì `interceptor` là các optional dependencies của HttpClient service vì vậy chúng ta cần import `HttpClientModule` vào `AppModule`  
Sau đó import `HTTP_INTERCEPTORS` inject token từ package `@angular/common/http` rồi define `interceptor` vừa viết được vào `AppModule` như sau:  

```ts
providers: [
  { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },
],
```
### Thứ tự của `interceptor`
Angular apply các `interceptor` theo thứ tự mà bạn cung cấp cho `AppModule`. Nếu bạn cung cấp các `interceptor` theo thứ tự A, B, C thì các request sẽ được xử lý lần lượt bởi A->B->C còn các response sẽ theo thứ tự C->B->A

### Xử lý các `interceptor` events
Hầu hết các `interceptor` đều trả về các observable của lớp `HttpResponse<any>`, HttpResponse chính bản thân nó cũng là một event. Tuy nhiên một HTTP request có thể tạo ra các event với các loại khác nhau từ upload, download cho đến progress event. Các method `HttpInterceptor.intercept()` và `HttpHandler.handle()` đều trả về các observable của `HttpEvent<any>`  
Mặc dù các `interceptor` thì có thể chỉnh sửa cả request và response nhưng các property của 2 lớp `HttpRequest` và `HttpResponse` là các readonly property do một vài lý do. Vì vậy để chỉnh sửa chúng trước tiên bạn phải clone rồi sẽ sửa trước khi pass cho method `next.handle()`  
```ts
// clone request and replace 'http://' with 'https://' at the same time
const secureReq = req.clone({
  url: req.url.replace('http://', 'https://')
});
// send the cloned, "secure" request to the next handler.
return next.handle(secureReq);
```
### Modifying a request body
Các readonly property không thể ngăn chặn việc deep update đặc biệt là ngăn chặn update các property của request body. Nhưng sẽ là một ý tưởng tồi nếu bạn cố gắng update request body  
```ts
req.body.name = req.body.name.trim(); // bad idea!
```
Để update request body ta làm như sau:  
1. Copy the body and make your change in the copy.  
2. Clone the request object, using its clone() method.  
3. Replace the clone's body with the modified copy.  
```ts
// copy the body and trim whitespace from the name property
const newBody = { ...body, name: body.name.trim() };
// clone request and set its body
const newReq = req.clone({ body: newBody });
// send the cloned request to the next handler.
return next.handle(newReq);
```

## Setting default headers
Các ứng dụng thường xuyên sử dụng `interceptor` để set các headers mặc định cho các request.  
Ví dụ chúng ta có một AuthService, service này tạo ra authorization token kèm theo các request để thực hiện việc xác thực. Sau đây là một ví dụ sử dụng service này để thực hiện việc set authorization token này vào request headers  

```ts
import { AuthService } from '../auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = this.auth.getAuthorizationToken();

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken)
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
```

## Using interceptors for logging
Bởi vì các `interceptor` có thể xử lý với cả request và response cho nên chúng có thể thực hiện các công việc như timing hay logging toàn bộ hoạt động HTTP
Ví dụ sau đây là một `interceptor` bắt thời gian của một request, response và log lại kết quả:  
```ts
import { finalize, tap } from 'rxjs/operators';
import { MessageService } from '../message.service';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor(private messenger: MessageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const started = Date.now();
    let ok: string;

    // extend server response observable with logging
    return next.handle(req)
      .pipe(
        tap(
          // Succeeds when there is a response; ignore other events
          event => ok = event instanceof HttpResponse ? 'succeeded' : '',
          // Operation failed; error is an HttpErrorResponse
          error => ok = 'failed'
        ),
        // Log when response observable either completes or errors
        finalize(() => {
          const elapsed = Date.now() - started;
          const msg = `${req.method} "${req.urlWithParams}"
             ${ok} in ${elapsed} ms.`;
          this.messenger.add(msg);
        })
      );
  }
}
```

## Using interceptors for caching
Các `interceptor` có thể tự xử lý các request mà không cân chuyển tiếp bằng method `next.handle()`  
Ví dụ bạn có thể cache các request và response để cải thiện performance. Bạn có thể ủy nhiệm việc này cho một interceptor như ví dụ sau đây  
```ts
@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  constructor(private cache: RequestCache) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // continue if not cacheable.
    if (!isCacheable(req)) { return next.handle(req); }

    const cachedResponse = this.cache.get(req);
    return cachedResponse ?
      of(cachedResponse) : sendRequest(req, next, this.cache);
  }
}
```
Trường hợp có dữ liệu cache `interceptor` sẽ trả về `of()` observable với dữ liệu cache điều này bỏ qua xử lý tiếp theo của tất cả  các `interceptor` đứng sau  
```ts
function sendRequest(
  req: HttpRequest<any>,
  next: HttpHandler,
  cache: RequestCache): Observable<HttpEvent<any>> {

  return next.handle(noHeaderReq).pipe(
    tap(event => {
      // There may be other events besides the response.
      if (event instanceof HttpResponse) {
        cache.put(req, event); // Update the cache.
      }
    })
  );
}
```

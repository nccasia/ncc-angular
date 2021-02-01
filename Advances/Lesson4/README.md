# Intercepting requests and responses
- Với các `interceptor` chúng ta có thể quan sát và biến đổi các Http request/response đến server  
- Các `interceptor` có thể thực hiện các nhiệm vụ khác nhau từ authenication, logging, chuẩn hóa các request/response

## Các nội dung chính
1. Tạo một interceptor
2. Setting default headers
3. Using interceptors for logging
4. Using interceptors for caching

## Tạo một interceptor
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
Method `intercept` có thể chuyển hóa 1 request thành một Observable hoặc thậm chí trở thành một HTTP response vì vậy các `interceptor` có thể hoàn toàn xử lý các HTTP request  

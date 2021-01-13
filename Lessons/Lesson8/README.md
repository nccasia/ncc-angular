# Http Client
- Trong ứng dụng Angular chúng ta thương xuyên tương tác với server thông qua giao thức HTTP để nhận hoặc gửi dũ liệu, Angular đã cung cấp cho chúng ta một module tên là `HTTPClientModule`
- Bài viết này sẽ giúp chúng ta nắm được cách làm việc cơ bản với `HTTPClientModule` để tương tác với một server.

## Các nội dung chính
1. Làm việc với HttpClientModule
2. Lấy dữ liệu từ server với HttpClient
3. Gửi dữ liệu lên server với HttpClient
4. Configuring HTTP URL parameters
5. Xử lý request error/Handing request error

## Làm việc với HttpClientModule
Hầu hết các ứng dụng front-end đều cần giao tiếp với một server thông qua hiao thức HTTP. Angular cung cấp một HTTP API đơn giản ở phía máy khách được gọi là `HttpClient` service đây là một lớp nằm trong `@angular/common/http`
Thiết lập để connect với server thông qua HttpClient:

`import` HttpClientModule từ package `@angular/common/http`
```
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    // import HttpClientModule
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
```

`inject` HttpClient service như một dependency của một class/service:
```
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }
}
```

## Lấy dữ liệu từ server với HttpClient
Sử dụng method `HttpClient.get()` để get data từ server, đây là một `asynchronous` method gửi một HTTP request và trả về một `Observable`, `Observable` sẽ emit data từ server khi nhận được response. Phương thức `get()` có 2 tham số là API URL và `options` object:
Cấu trúc của `options` object như sau:
```
options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body' | 'events' | 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'arraybuffer'|'blob'|'json'|'text',
    withCredentials?: boolean,
  }
```
### Định nghĩa kiểu dữ liệu trả về (response typed)
Bạn có define cấu trúc request với một kiểu dữ liệu được định nghĩa cho dữ liệu trả về, điều này giúp xử lý dữ liệu response dễ dàng và trực quan hơn
```
export interface User {
  userName: string;
  age: number;
}

getUsers(): Observable<User[]> {
  return this.http.get<User[]>('api/users');
}
```

### Lấy toàn bộ thông tin từ response
Ở trên ta đã nói đên hàm `HttpClient.get()` có tham số thứ hai là một `options` object, nếu không thiết lập gì mặc định hàm này sẽ trả về JSON data chứa response body. Đôi khi bạn cần các thông tin khác từ response bên cạnh body như response header, status code,... điều này hoàn toàn có thể khi chỉ định `observe` option cho hàm `get()`, các value có thể được chỉ định cho option này: `body` (mặc định), `response`, `events`. (space, space)
Sau đây là một ví dụ sử dụng `response` để get full response:
```
getConfigResponse(): Observable<HttpResponse<Config>> {
  return this.http.get<Config>(
    this.configUrl, { observe: 'response' });
}
```
### Request dữ liệu không phải dạng JSON
Thỉng thoảng dữ liệu trả về từ một request không phải dướng dạng JSON đôi khi nó có thể là một file, text string, etc. Chúng ta có thể chỉ định kiểu dữ liệu trả về bằng cách sử dụng `responseType` option. Ví dụ sau xử lý một request trả về kiểu dữ liệu 'text':
```
getTextFile(filename: string) {
  return this.http.get(filename, {responseType: 'text'})
    .pipe(
      tap( // Log the result or error
        data => this.log(filename, data),
        error => this.logError(filename, error)
      )
    );
}
```
## Gửi dữ liệu lên server với HttpClient
Bên cạnh việc get data từ server, HttpClient cũng support các HTTP method khác như POST, PUT, PATCH, DELETE để gửi một request yều câu thêm, sửa, xóa một dữ liệu

### POST request
Các ứng dụng thường xuyển gửi các dữ liệu đến server với một POST request khi submit một form như ví dụ sau:
```
// POST: add a new hero to the database
addHero(hero: Hero): Observable<Hero> {
  return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
    .pipe(
      catchError(this.handleError('addHero', hero))
    );
}
```
Phương thức `HttpClient.post()` cũng có các params của riêng nó giống như phương thức `get()`:
* `body` - dữ liệu gửi lên server bên trong request body.
* `options` - An object containing method options which, in this case, specify required headers.

### DELETE request
Khi gửi một request yêu cầu xóa một bản ghi ở database với HttpClient chúng ta sử dụng phương thức `HttpClient.delete()`
```
/** DELETE: delete the hero from the server */
deleteHero(id: number): Observable<{}> {
  const url = `${this.heroesUrl}/${id}`; // DELETE api/heroes/42
  return this.http.delete(url, httpOptions)
    .pipe(
      catchError(this.handleError('deleteHero'))
    );
}
```

### PUT request
Bạn có thể send một PUT request sử dụng Http Client service, các params của method này giống như method POST:
```
updateHero(hero: Hero): Observable<Hero> {
  return this.http.put<Hero>(this.heroesUrl, hero, httpOptions)
    .pipe(
      catchError(this.handleError('updateHero', hero))
    );
}
```

### `subscribe` method
Một HttpClient method sẽ không gửi request nào cho tới khi bạn call `subscribe()` method. Việc gọi method này sẽ kích hoạt thực thì của `observable` khi đó HttpClient sẽ gửi request đến server
```
export class UserComponent implements OnInit {
  constructor(private userService: UserService) {
  }
  ngOnInit() {
    this.userService.getUsers().subcribe(users => {
      console.log('users', users);
    })
  }
}
```

### Request headers
Có thể server sẽ yêu cầu bạn một vài thông tin khác từ request headers, ví dụ như yêu cầu một `authorization` token hoặc `"Content-Type"`
Adding headers
```
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};
```
Updating headers
```
httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');
```

## Configuring HTTP URL parameters
Có 2 loại param thường xuyên sử dụng khi gửi một request đến server đó là URL params và query params, với URL params chúng ta sẽ sử dụng phương pháp nối chuỗi thông thường như ví dụ sau:
```
getUserById(userId: number) {
  return this.http.get(`/api/users/{userId}`);
}
``` 
Với query params chúng ta sẽ sử dụng class `HttpParams`
```
import {HttpParams} from "@angular/common/http";
```
```
searchHeroes(term: string): Observable<Hero[]> {
  term = term.trim();

  // Add safe, URL encoded search parameter if there is a search term
  const options = term ?
   { params: new HttpParams().set('name', term) } : {};

  return this.http.get<Hero[]>(this.heroesUrl, options)
    .pipe(
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
}
```
## Xử lý request error/Handing request error
Nếu request xử lý không thành công hoặc có lỗi trên server Http Client sẽ trả về một `error` object that vì một `successful` response. Trường hợp có lỗi xảy ra bạn có thể lấy được thông tin chi tiết của lỗi hoặc ở một vài trường hợp có thể retry request. Chúng ta có thể xử lý các lỗi này bằng một số cách như sau:
### Get error detail
Một ứng dụng thân thiện thường có các `notify` để thông báo đến người dùng trong trường hợp có lỗi. Có 2 loại lỗi có thể xảy ra khi tương tác với server:
* Server có thể `reject` request và trả về một HTTP respone với các status code khác status 200 có thể là 404 hoặc 500, đây là các error response
* Một số trường hợp lỗi có thể xảy ra ở phía client như lỗi mạng và một exception sẽ được `thrown` bên trong một Rxjs operator, các lỗi này tạp ra một JavaScript `ErrorEvent` object.
HttpClient có thể bắt cả 2 loại lỗi này bên trong [HttpErrorResponse](https://angular.io/api/common/http/HttpErrorResponse). Ví dụ sau dây define một error handler sẽ xử lý các lỗi có thể phát sinh khi tương tác với API

```
private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // Return an observable with a user-facing error message.
  return throwError(
    'Something bad happened; please try again later.');
}
```

Error handlẻ ở ví dụ trên đã trả về một `ErrorObservable` với giá trị là một `user-friendly` error message. Đoạn code dưới đấy sẽ dụng handler trên bằng các sử dụng 2 Rxjs operator là `pipe` và `catchError`:
```
getUser() {
  return this.http.get<User>('/api/users')
    .pipe(
      catchError(this.handleError)
    );
}
```

### Retry một Http request khi có lỗi xảy ra
Ở một số trường hợp các lỗi xảy ra chỉ là tạm thời và sẽ tự động biến mất khi bạn thử lại, ví dụ mất kết nối mạng là một trường hợp điển hình. Chúng ta có thể `retry` lại request bằng cách sử dụng `retry` operator như ví dụ sau:
```
getUser() {
  return this.http.get<User>('/api/users')
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError)
    );
}
```
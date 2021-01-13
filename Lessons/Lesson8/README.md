# Http Client
- Trong ứng dụng Angular chúng ta thương xuyên tương tác với server thông qua giao thức HTTP để nhận hoặc gửi dũ liệu, Angular đã cung cấp cho chúng ta một module tên là `HTTPClientModule`
- Bài viết này sẽ giúp chúng ta nắm được cách làm việc cơ bản với `HTTPClientModule` để tương tác với một server.

## Các nội dung chính
1. Làm việc với HttpClientModule
2. Lấy dữ liệu từ server với HttpClient
3. Gửi dữ liệu lên server với HttpClient
4. Xử lý request error/Handing request error
5. Configuring HTTP URL parameters

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

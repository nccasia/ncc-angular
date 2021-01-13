# Routing & Navigation
- Trong single-page app, những gì người dùng nhìn thấy khi điều hướng sang các page khác nhau thực chất là việc ẩn/hiện các component tương ứng thay vì request đến server để tải một trang HTML mới. Để xử lý navigation trong Angular chúng ta sử dụng Angular Router.
- Angular Router cho phép bạn chuyển trang bằng cách biên dịch browser URL, browser URL như là một chỉ dẫn để ẩn/hiện các view/component tương ứng.
- Bài viết này bao gồm tất cả các khái niệm/thành phần cơ bản khi làm việc với Angular Router

## Các nội dung chính
1. Define một router cơ bản
2. Lấy thông tin từ route
3. Thiết lập route ngoại tuyến (wildcard routes) với `404 page`
4. Thiết lập chuyển hướng/redirects
5. Các tuyến route lồng nhau (Nesting routes)
6. Sử dụng đường dẫn tương đối
7. Lazy loading trong Angular
8. Ngăn chặn các truy cập chưa được xác thực (unauthorized access)
9. Truyền parameter qua route
10. Nắm lại số khái niệm cốt lỗi (core router concepts) trong Angular Router
## Define một router cơ bản 

- Khai báo router và các component tương ứng `app-routing.module.ts`:
```
const routes: Routes = [
  { path: 'first-component', component: FirstComponent },
  { path: 'second-component', component: SecondComponent },
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```
- Add `AppRoutingModule` vào `AppModule`:
```
imports: [
    BrowserModule,
    AppRoutingModule
  ],
```
- Sử dụng router trong view để điều hướng với `routerLink`:
```
<nav>
  <ul>
    <li><a routerLink="/first-component" routerLinkActive="active">First Component</a></li>
    <li><a routerLink="/second-component" routerLinkActive="active">Second Component</a></li>
  </ul>
</nav>
<!-- Các component tương ứng sẽ được render bên trong thẻ <router-outlet>-->
<router-outlet></router-outlet>
```
## Lấy thông tin từ route
Để lấy thông tin từ URL trong Angular chúng ta có thể sử dụng các service sau:
* [Router](https://angular.io/api/router)
* [ActivatedRoute](https://angular.io/api/router/ActivatedRoute)
* [ParamMap](https://angular.io/api/router/ParamMap)
Ví dụ để lấy `name` từ `queryParams` chúng ta có thể sử dụng `ActivatedRoute`:
```
constructor(
  private route: ActivatedRoute,
) {}

ngOnInit() {
  this.route.queryParams.subscribe(params => {
    this.name = params['name'];
  });
}
```
## Thiết lập router ngoại tuyến (wildcard routes) với `404 page`
- Sẽ là tốt hơn nếu bạn có thể xử lý khi người dùng nhập vào một URL không khớp với các tuyến routing đã được định nghĩa. Để xử lý việc này chúng ta sẽ setup một `wildcard route`:
```
const routes: Routes = [
  { path: 'first-component', component: FirstComponent },
  { path: 'second-component', component: SecondComponent },
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];
```
- Ứng dụng sẽ tự động chuyển đến trang `404` khi người dùng nhập vào một URL không tồn tại.
## Thiết lập chuyển hướng/redirects
- Để thiết lập `redirect`, bạn phải thiết lập với path mà từ đây bạn muốn chuyến hướng:
```
const appRoutes: Routes = [
  { path: 'crisis-center', component: CrisisListComponent },
  { path: 'heroes',        component: HeroListComponent },
  { path: 'something',   redirectTo: '/heroes', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
```
- Lưu ý giá trị `pathMatch`, đây là giá trị để Router xác minh đường dẫn của bạn có khớp hay không. Thuộc tính này có thể là `full` hoặc `prefix` mặc định sẽ là `prefix`. Nếu giá trị là `full` Router yêu cầu URL phải khớp hoàn toàn với route đã được define ví dụ `localhost:3000/something`, trường hợp là `prefix` chỉ cần phần trước của URL khớp với path đã define ví dụ `localhost:3000/something/1` hoặc `localhost:3000/something/detail` hoặc cũng có thể chính là `localhost:3000/something`.
## Các tuyến route lồng nhau (Nesting routes)
- Khi ứng dụng của bạn trở nên lớn hơn, bạn có thể sẽ phải định nghĩa các route liên quan đến một component nào đó thay vì từ chính `root component`. Các route lồng nhau này được gọi là các `child routes`.
```
<h2>Parent Component</h2>
<nav>
  <ul>
    <li><a routerLink="child-a">Child A</a></li>
    <li><a routerLink="child-b">Child B</a></li>
  </ul>
</nav>
// Các component con sẽ được render bên trong <router-outlet>
<router-outlet></router-outlet>
```
- Định nghĩa các `child routes`
```
const routes: Routes = [
  {
    path: 'parrent-component',
    component: ParrentComponent, 
    children: [
      {
        path: 'child-a', // child route path
        component: ChildAComponent, // child route component that the router renders
      },
      {
        path: 'child-b',
        component: ChildBComponent, // another child route component that the router renders
      },
    ],
  },
];
```
## Sử dụng đường dẫn tương đối
- Đường dẫn tương đối cho phép bạn xác định đường dẫn liên quan đến URL hiện tại. Ví dụ sau đây chúng ta có 2 component cùng cấp `FirstComponent` và `SecondComponent` và đường dẫn đén `SecondComponent` nằm ở `FirstComponent`, chúng ta có thể sử sụng `../` để chuyển hướng thay vì dụng toàn bộ đường dẫn:
```
<h2>First Component</h2>

<nav>
  <ul>
    <li><a routerLink="../second-component">Relative Route to second component</a></li>
  </ul>
</nav>
<router-outlet></router-outlet>
```
- Chỉ định relative path bên trong class component sử dụng `relativeTo`:
```
goToItems() {
  this.router.navigate(['second-component'], { relativeTo: this.route.parrent });
}
```
## Lazy loading trong Angular
- Bạn có thể config router để load từng phần ứng các dưới dạng các module khi cần thay vì load toàn bộ ứng dụng một lần khi chạy ứng dụng lần đầu.
```
{
    path: 'routing-example',
    loadChildren: () => import('./src/app/examples/routing-example.module').then(m => m.RoutingExampleModule),
},
```

- Chi tiết hơn về `lazy loading` tham khảo thêm ở đây [Lazy Loading](https://angular.io/guide/lazy-loading-ngmodules), ở phần nâng cao chúng ta sẽ đi sâu hơn về lazyloading trong angular

## Ngăn chặn các truy cập chưa được xác thực (unauthorized access)
- Để ngặn chặn các truy cập chưa được xác thực (chưa login, không có quyền...) trong Angular chúng ta sử dụng `route guard`, một số `route guard` interface có sẵn trong Angular:
* [CanActivate](https://angular.io/api/router/CanActivate)
* [CanActivateChild](https://angular.io/api/router/CanActivateChild)
* [CanDeactivate](https://angular.io/api/router/CanDeactivate)
* [Resolve](https://angular.io/api/router/Resolve)
* [CanLoad](https://angular.io/api/router/CanLoad)

- Sẽ có bài viết riêng nói rõ hơn về cách viết một `route guard` để ngăn chặn các unauthorized access ở phần nâng cao.
## Truyền parameter qua route
- Truyển parameter trong view
```
// truyền path param
<a [routerLink]="['/hero', hero.id]">
  <span class="badge">{{ hero.id }}</span>{{ hero.name }}
</a>

// query param 
<a [routerLink]="['/crisis-center']" [queryParams]="{name: 'Crisis Cente'}>Crisis Center</a>
```
- Truyền parameter trong class component:

```
// truyền path param là một user ID
this.router.navigate(['users', userID]);

// truyền query param
this.router.navigate(['users'], {
    queryParams: { class: 'A1' }
})
```

## Nắm lại số khái niệm cốt lỗi (core router concepts) trong Angular Router

### Angular Router
- Angular Router là một optional service, nó không phải là một phần của Angular core vì vậy nó sẽ có package riêng `@angular/router`.
```
import { RouterModule, Routes } from '@angular/router';
```
### Các thành phần cơ bản khi setup router (Configuration)
```
const appRoutes: Routes = [
  { path: 'crisis-center', component: CrisisListComponent },
  { path: 'hero/:id',      component: HeroDetailComponent },
  {
    path: 'heroes',
    component: HeroListComponent,
    data: { title: 'Heroes List' }, //pass arbitrary data
    canActive: [YourGuard]
  },
  { 
    path: '',
    redirectTo: '/heroes',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    // other imports here
  ],
  ...
})
export class AppModule { }
```

* `RouterModule.forRoot()` method thiết lập tuyến route chính cho ứng dụng của bạn.
* `:id` tương ứng với một path parameter ví dụ `/hero/42`
* `data` là thuộc tính mà bạn có thể dùng để lưu một số data read only.
* `path: '**'` wildcard routes, giúp xử lý các URL không tồn tại trong ứng dụng.
* `canActive` thuộc tính định nghĩa các router guard giúp bạn ngăn chặn các truy cập chưa được xác thực.

### Router outlet
`RouterOutlet` là một directive của Angular Router được sử dụng như một component `<router-outlet></router-outlet>`. Nó là nơi mà router sẽ hiển thị các component tương ứng.

### Router links vs Active router links
`RouterLink` là một directive được xây dựng để chuyển hướng giữa các component
```
 <a routerLink="/crisis-center">Crisis Center</a>
```
`RouterLinkActive` directive giúp toggle CSS class cho một actived `RouterLink`
```
<a routerLink="/crisis-center" routerLinkActive="active">Crisis Center</a>
```
### Activated route
- Các thông tin như route path, parameter,.. thì có sẵn trong một `injected router service` được gọi là [ActivatedRoute](https://angular.io/api/router/ActivatedRoute)
- Có thể access các thông tin này qua các property của nó: `url`, `data`, `paramMap`, `outlet`,...
### Router events
Trong mỗi sự chuyển hướng, `Router` bắn ra các `events` thông qua `Router.events` property. Các `events` này bao gồm từ lúc bắt đầu cho đến lúc kết thúc một navigation. Một vài sự kiện như sau: `NavigationStart`, `RouteConfigLoadStart`, `RouteConfigLoadEnd`, `GuardsCheckStart`, `ChildActivationStart`,..

### Một số thuật ngữ
Khái niệm | Nội dung
------------ | -------------
[Router](https://angular.io/api/router/Router) | Hiển thị các thành phần ứng dụng/component tương ứng với URL hiện tại, quản lý sự điều hướng từ component này sang component khác
[RouterModule](https://angular.io/api/router/RouterModule) | Là một `NgModule` riêng biệt cung cấp các service và directive cần thiết cho việc điều hướng ứng dụng
[Routes](https://angular.io/api/router/Routes) | Định nghĩa một mảng các `Route`, mỗi `Route` mapping một URL đến một component
[Route](https://angular.io/api/router/Route) | Định nghĩa cách router navigate đến một component dựa trên URL pattern.
[RouterOutlet](https://angular.io/api/router/RouterOutlet) | Directive `(<router-outlet>)` nơi mà router hiển thị compoennt tương ứng.
[RouterLink](https://angular.io/api/router/RouterLink) | Directive giúp chuyển hướng tới một route thông qua một clickable HTML element.
[ActivatedRoute](https://angular.io/api/router/ActivatedRoute) | Một service cung cấp các thông tin về route như: parameters, static data, resolve data, global query params,...
# Angular Layzy Loading
- Mặc định các NgModule được load ngay khi ứng dụng angular khởi chạy, tuy nhiên có nhiều module không cần load ngay lập tức, vấn đề này thường hay gặp ở các ứng dụng lớn và để giải quyết nó ta sử dụng cơ chế lazy-loading trong angular
- Lazy-loading giúp giữ cho kích thước gói tin cần load ban đầu nhỏ hơn, do đó giúp giảm thời gian tải.

## Các nội dung chính
1. Setup lazy loading
2. forRoot() and forChild()
3. Preloading

## Setup lazy loading
 
### Tạo một moodule  
```
ng generate module routing
```

### Định nghĩa routing cho module vừa tạo ở file app-routing.module.ts  
```ts
{
    path: "routing-example",
    loadChildren: () =>
      import("./src/app/examples/routing/routing-module.module").then(
        (m) => m.RoutingModuleModule
      ),
},
```

### Setup UI
```html
<h1>
  {{title}}
</h1>

<button routerLink="/routing-example">Routing Example</button>
<button routerLink="">Home</button>

<router-outlet></router-outlet>
```

### Bên trong một lazy-load module  
Đây là nội dung của file `routing-module.module.ts`
```ts
const routes: Routes = [
  {
    path: '',
    component: RoutingModuleComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'heros'
      },
      {
        path: 'heros',
        component: HeroListComponent,
      },
      {
        path: 'cars',
        component: CarsComponent,
      },
    ]
  }
]


@NgModule({
  declarations: [RoutingModuleComponent, HerosComponent, HeroListComponent, HeroDetailComponent, CarsComponent],
  imports: [
    CommonModule,
    // Setup router cho lazy loading module
    RouterModule.forChild(routes)
  ]
})
export class RoutingModuleModule { }
```

### Kiểm tra lazy-loading module có hoạt động hay không
Để kiểm tra việc setup lazy-loading có hoạt động hay không ta sử dụng Chrome dev tool để check (tab Network)  
Click vào link dẫn đên module cần check và kiểm tra devtool ta sẽ thấy module này chỉ được load sau khi click vào link chứ không phải được load từ đầu  
![](./assets/Capture.PNG?raw=true)

## forRoot() and forChild()
Như chúng ta đã biết `AppRoutingModule` và `forRoot()` định nghĩa root routing cho ứng dụng angular. Tất cả các tuyến router con đều được định nghĩa ở đây vì thế `forRoot()` chỉ được sử dụng một lần duy nhất bến trong `AppRoutingModule`  
Bên cạnh đó ta cũng có `RouterModule.forChild(routes)` để định nghĩa một tuyến router cho các module con và vì vậy ta có thể sử dụng `forChild()` nhiều lần ở các module khác nhau  

## Preloading
Tải trước một số module cần thiết gíp cải thiện trải nghiệm người dùng.  
### Preloading all module
Để tải trước tất cả các lazy module import `PreloadAllModules` token từ `@angular/router`  
```ts
import { PreloadAllModules } from '@angular/router';
```
Chỉ định preloading strategy ở `forRoor()`  
```ts
RouterModule.forRoot(
  appRoutes,
  {
    preloadingStrategy: PreloadAllModules
  }
)
```
### Custome preloading
Như đã nói ở trên chúng ta có thể dùng `PreloadAllModules` để load trước tất cả các lazy-load module điều này sẽ làm ứng dụng của chúng ta tải về một lượng lớn các module. Trong một số trường hợp chúng ta chỉ cẩn load trước một số module cần thiết để cải thiện trải nghiệm người dùng. Để làm được việc nà chúng ta cần custom preloading Strategies của Angular. Ví dụ như sau:  

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppCustomPreloader } from './app-routing-loader';
import { Feature1Component } from './feature-1/feature-1.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'feature-1',
    pathMatch: 'full'
  },
  {
    path: 'feature-1',
    component: Feature1Component
  },
  {
    path: 'feature-2',
    loadChildren: './feature-2/feature-2.module#Feature2Module',
    data: { preload: true } // Custom property we will use to track what route to be preloaded
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: AppCustomPreloader })
  ], // Using our own custom preloader
  exports: [RouterModule],
  providers: [AppCustomPreloader]
})
export class AppRoutingModule {}
```

Custom preloading Strategies  
```ts
import { PreloadingStrategy, Route } from '@angular/router';

import { Observable, of } from 'rxjs';

export class AppCustomPreloader implements PreloadingStrategy {
  preload(route: Route, load: Function): Observable<any> {
    return route.data && route.data.preload ? load() : of(null);
  }
}
```
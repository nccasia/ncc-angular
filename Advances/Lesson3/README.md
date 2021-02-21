# Router guard

## Route guards là gì?

- Angular's route guards là các `interface` có thể cho bộ định tuyến biết liệu nó có cho phép điều hướng đến một route được yêu cầu hay không. Nó đưa ra quyết định này bằng cách tìm kiếm một giá trị trả về `true` hoặc `false` từ một lớp được implement từ `guard interface`
- Có 5 loại guards khác nhau và mỗi loại được gọi theo một trình tự cụ thể. Hành vi của bộ định tuyến được điều chỉnh khác nhau tùy thuộc vào guard nào được sử dụng. Angular Router cung cấp một số guards như sau:

  - **Activate components**

  ```ts
  interface CanActivate {
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ):
      | Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree>
      | boolean
      | UrlTree;
  }
  ```

  ```ts
  interface CanActivateChild {
    canActivateChild(
      childRoute: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ):
      | Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree>
      | boolean
      | UrlTree;
  }
  ```

  - **Deactivate components**

  ```ts
  interface CanDeactivate<T> {
    canDeactivate(
      component: T,
      currentRoute: ActivatedRouteSnapshot,
      currentState: RouterStateSnapshot,
      nextState?: RouterStateSnapshot
    ):
      | Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree>
      | boolean
      | UrlTree;
  }
  ```

- **Load children (lazy loading route)**

  ```ts
  interface CanLoad {
    canLoad(
      route: Route,
      segments: UrlSegment[]
    ):
      | Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree>
      | boolean
      | UrlTree;
  }
  ```

## CanActivate, CanDeactivate

- Giả sử chúng ta có chức năng edit bài viết, yêu cầu đưa ra là chỉ có ai là author mới có thể edit được bài của người đó. App demo sẽ có config routing như sau:

  ```ts
  const routes: Routes = [
    {
      path: "article",
      component: ArticleComponent,
      children: [
        {
          path: "",
          component: ArticleListComponent,
        },
        {
          path: ":slug",
          component: ArticleDetailComponent,
        },
        {
          path: ":slug/edit",
          component: ArticleEditComponent,
        },
      ],
    },
  ];
  ```

- Bạn có thể tạo một service, sau đó kiểm tra các quyền để có thể cho phép người dùng có được di chuyển vào hay không.

  - **CanActivate**

  ```ts
  import { Injectable } from "@angular/core";
  import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
  } from "@angular/router";
  import { Observable } from "rxjs";

  @Injectable({
    providedIn: "root", // you can change to any level if needed
  })
  export class CanEditArticleGuard implements CanActivate {
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ):
      | Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree>
      | boolean
      | UrlTree {
      return true; // replace with actual logic
    }
  }
  ```

  - **CanDeactivate**

  ```ts
  import { Injectable } from "@angular/core";
  import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanDeactivate,
    UrlTree,
  } from "@angular/router";
  import { Observable } from "rxjs";
  import { ArticleEditComponent } from "./article-edit/article-edit.component";

  @Injectable({
    providedIn: "root",
  })
  export class CanLeaveEditGuard
    implements CanDeactivate<ArticleEditComponent> {
    canDeactivate(
      component: ArticleEditComponent,
      currentRoute: ActivatedRouteSnapshot,
      currentState: RouterStateSnapshot,
      nextState?: RouterStateSnapshot
    ):
      | Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree>
      | boolean
      | UrlTree {
      return true; // replace with actual logic
    }
  }
  ```

- Để có thể register guard vừa tạo, chúng ta cần thêm vào canActivate array khi config routing như sau:

  ```ts
  const routes: Routes = [
    {
      path: "article",
      component: ArticleComponent,
      children: [
        {
          path: "",
          component: ArticleListComponent,
        },
        {
          path: ":slug",
          component: ArticleDetailComponent,
        },
        {
          path: ":slug/edit",
          component: ArticleEditComponent,
          canActivate: [CanEditArticleGuard], // <== this is an array, we can have multiple guards
          canDeactivate: [CanLeaveEditGuard], // <== this is an array, we can have multiple guards
        },
      ],
    },
  ];
  ```

  - Tương tự như `CanActivate`, chúng ta có cách hoạt động của `CanActivateChild`, nhưng được apply cho các children của một route.

## CanLoad

- Đối với các lazy load route, chúng ta có thể kiểm tra trước ở frontend, nếu thỏa mãn điều kiện mới cho phép tải về.
- Ví dụ, application của chúng ta có chức năng cho admin vào xem để quản lý. Đối với người dùng thông thường, chúng ta không cần thiết phải tải phần code của route /admin về. Lúc đó CanLoad sẽ là một guard hữu ích cho chúng ta sử dụng.

  ```ts
  import { Injectable } from "@angular/core";
  import {
    CanLoad,
    UrlSegment,
    Route,
    RouterStateSnapshot,
    UrlTree,
  } from "@angular/router";
  import { Observable } from "rxjs";

  @Injectable({
    providedIn: "root",
  })
  export class CanLoadAdminGuard implements CanLoad {
    canLoad(
      route: Route,
      segments: UrlSegment[]
    ):
      | Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree>
      | boolean
      | UrlTree {
      return true;
    }
  }
  ```

  ```ts
  const routes: Routes = [
    {
      path: "admin",
      loadChildren: () =>
        import("./admin/admin.module").then((m) => m.AdminModule),
      canLoad: [CanLoadAdminGuard], // <== this is an array, we can have multiple guards
    },
    {
      path: "",
      redirectTo: "article",
      pathMatch: "full",
    },
  ];
  ```

- Từ đây chúng ta có thể implement các logic để check xem có thể load về hay không, ví dụ như sau:
  ```ts
  @Injectable({
    providedIn: "root",
  })
  export class CanLoadAdminGuard implements CanLoad {
    constructor(private userService: UserService) {}
    canLoad(
      route: Route,
      segments: UrlSegment[]
    ):
      | Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree>
      | boolean
      | UrlTree {
      return this.userService.currentUser.isAdmin; // replace with actual logic
    }
  }
  ```

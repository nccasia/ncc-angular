# Angular animation
- Hệ thống animation của Angular được xây dựng dựa trên CSS animation, vì vậy bạn có thể cài đặt các hiệu ứng chuyển động cho bất kỳ property nào mà browser hỗ trợ như positions, sizes, transforms, colors, borders,..
- Một ứng dụng có hiệu ứng tốt giúp nâng cao trải nghiệm người dùng, gây chú ý và khiến người dùng muốn khám phá ứng dụng của bạn

## Các nội dung chính
1. Setup Angular animation
2. Tạo một animation đơn giản
3. Chuyển tiếp và kích hoạt animation
4. Reuseable animation
5. Route transition animation

## Setup Angular animation
Bước 1: Bật animations module: import `BrowserAnimationsModule` vào Angular root application module.  

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  declarations: [ ],
  bootstrap: [ ]
})
export class AppModule { }
```

Bước 2: Import các animation function vào component  
```ts
import { Component, HostBinding } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
```

Bước 3: Define animation của bạn  
```ts
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  animations: [
    // animation triggers go here
  ]
})
```

## Tạo một animation đơn giản
Ví dụ chúng ta có 1 button với 2 trạng thái như bên dưới, để làm được điều này với CSS ta chỉ cần sử dụng các CSS property như opacity, background-color cho từng trạng thái tương ứng. Trong angular chúng ta sử dụng function `style()` để định nghĩa các style tương ứng của từng trạng thái, một tập các style được gán vào một animation state như `open` hay `close`
![](./assets/open-closed.png?raw=true "DI Angular")

### Animation state and styles
Sử dụng `state()` function để định nghĩa các trạng thái khác nhau mà qua đó chúng ta sẽ thực hiện hiệu ứng chuyển đổi qua lại giữa các trạng thái này. Function này gồm 2 tham số đó là một unique name như `open` hay `close` và một `style()` function.  
Với `style()` function  chúng ta có thể định nghĩa các style tương ứng với mốt state.  
```ts
// ...
state('open', style({
  height: '200px',
  opacity: 1,
  backgroundColor: 'yellow'
})),
```
```ts
state('closed', style({
  height: '100px',
  opacity: 0.5,
  backgroundColor: 'green'
})),
```

### Transitions and timing  
Để xác định quá trình chuyển đổi từ trạng thái này sang trạng thái khác trong Angular chúng ta sử dụng function `transition()`, function này gồm 2 tham số đầu tiên là một biểu thức định nghĩa việc chuyển đổi từ trạng thái này sang trạng thái khác, tham số thứ 2 là tập các `animation()`.  
function `animate()` có các tham số định nghĩa việc timing và style của chuyển động: `animate ('duration delay easing')  
Ví dụ:  
```ts
transition('closed => open', [
  animate('0.5s 0.25s ease-in-out')
]),
```

### Kích hoạt một animation
Định nghĩa một animation  
```ts
@Component({
  selector: 'app-open-close',
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.5,
        backgroundColor: 'green'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
  templateUrl: 'open-close.component.html',
  styleUrls: ['open-close.component.css']
})
export class OpenCloseComponent {
  isOpen = true;

  toggle() {
    this.isOpen = !this.isOpen;
  }

}
```
Sử dụng animation ở template  
```html
<div [@openClose]="isOpen ? 'open' : 'closed'" class="open-close-container">
  <p>The box is now {{ isOpen ? 'Open' : 'Closed' }}!</p>
</div>
```
Trong ví dụ này giá trị của biến `isOpen` sẽ xác định trạng thái hiện tại của animation, khí biến này thay đổi giá trị, state của animation cũng thay đổi giá trị từ đó kích hoạt `openClose` animation.  

## Chuyển tiếp và kích hoạt animation
Phần này chúng ta sẽ tùm hiểu một số trạng thái đặc biệt như `* (wildcard)` hay `void` và các trạng thái đặc biệt này được sử dụng để apply hiệu ứng chuyển đối đối với các phần tử khi chúng xuất hiện hay biến mất.

### Wildcard state
Ký tự `*` tương ứng với bất kỳ trạng thái nào, ví dụ `open => *` được apply cho các trạng thái chuyển đổi từ `open` sang trạng thái bất kỳ. Hay `*=> *` sẽ được apply cho bất kỳ sự chuyển đổi trạng thái nào xảy ra. Trường hợp có nhiều sự chuyển đổi `transition()` được định nghĩa, transition sẽ được apply khi match với `transition()` đứng trước trong danh sách các transition mà bạn đã định nghĩa.
```ts
animations: [
  trigger('openClose', [
    // ...
    state('open', style({
      height: '200px',
      opacity: 1,
      backgroundColor: 'yellow'
    })),
    state('closed', style({
      height: '100px',
      opacity: 0.5,
      backgroundColor: 'green'
    })),
    transition('* => closed', [
      animate('1s')
    ]),
    transition('* => open', [
      animate('0.5s')
    ]),
    transition('* => *open*', [
      animate('0.25s')
    ]),
  ]),
],
```
### Hiệu ứng khi một phần tử xuất hiện hoặc biến mất
Bạn có thể sử dụng `void` state để định nghĩa các transition khi một phần tử xuất hiện hay biến mất:  
`* => void` apply khi một phần tử biến mất khỏi view.  
`void => *` apply khi một phần tử xuất hiện.  
wildcard state `*` sẽ khớp với tất cả trạng thái bao gồm `void`  
```ts
animations: [
  trigger('flyInOut', [
    state('in', style({ transform: 'translateX(0)' })),
    transition('void => *', [
      style({ transform: 'translateX(-100%)' }),
      animate(100)
    ]),
    transition('* => void', [
      animate(100, style({ transform: 'translateX(100%)' }))
    ])
  ])
]
```
Áp dụng vào view  
```html
<div @style *ngIf="isShown">
  <p>The box is inserted</p>
</div>
``` 
## Reuseable animation
Để tạo một Reuseable animation chúng ta sử dụng method `animation()` để định nghĩa một animation ở một file ts riêng và export nó ra như một biến. Từ đó ta có thể import để sủ dụng lại animation này bằng `useAnimation()` API.  

File animation.ts  
```ts
import {
  animation, trigger, animateChild, group,
  transition, animate, style, query
} from '@angular/animations';

export const transAnimation = animation([
  style({
    height: '{{ height }}',
    opacity: '{{ opacity }}',
    backgroundColor: '{{ backgroundColor }}'
  }),
  animate('{{ time }}')
]);
```
File component.ts  
```ts
import { Component } from '@angular/core';
import { transition, trigger, useAnimation } from '@angular/animations';
import { transAnimation } from './animations';

@Component({
  selector: 'app-open-close-reusable',
  animations: [
    trigger('openClose', [
      transition('open => closed', [
        useAnimation(transAnimation, {
          params: {
            height: 0,
            opacity: 1,
            backgroundColor: 'red',
            time: '1s'
          }
        })
      ])
    ])
  ],
  templateUrl: 'open-close.component.html',
  styleUrls: ['open-close.component.css']
})
```
## Route transition animation
Angular animation cho phép bạn apply các animation khi chuyển đổi qua lại giữa các router khác nhau. Sau đây ta sẽ tìm hiểu cách apply các animation trẻn router.  
### Route configuration
```ts
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent, data: {animation: 'HomePage'} },
      { path: 'about', component: AboutComponent, data: {animation: 'AboutPage'} },
    ])
  ],
```
`data` property định nghĩa các animation key cho các component tương ứng.
### Router outlet
`<router-outlet>` là nơi các component tương ứng với các tuyến route xuất hiện và là nơi các component đó apply các animation khi chúng xuất hiện hay rời đi.  
```html
<div [@routeAnimations]="prepareRoute(outlet)">
  <router-outlet #outlet="outlet"></router-outlet>
</div>
```
```ts
prepareRoute(outlet: RouterOutlet) {
  return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
}
```

### Animation definition
Cuối cùng ta định nghĩa animation đã setup từ các bước ở trên  
```ts
export const slideInAnimation =
  trigger('routeAnimations', [
    transition('HomePage <=> AboutPage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ left: '100%' }))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
    transition('* <=> FilterPage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('200ms ease-out', style({ left: '100%' }))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%' }))
        ])
      ]),
      query(':enter', animateChild()),
    ])
  ]);
  ```

  Apply vào component  
  ```ts
  @Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  animations: [
    slideInAnimation
    // animation triggers go here
  ]
})
```

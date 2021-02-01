# Directives

Directive trong Angular là một class javascript được khai báo với decorator @directive

Có 3 loại directive trong Angular:

- **Component Directives**: Component cho phép định nghĩa selector và gọi ra như một thẻ html tag (`<component-name></component-name>`)
- **Structural Directives**: Là directive cấu trúc, dùng để vẽ html, hiển thị data lên giao diện html, và thay đổi cấu trúc DOM bằng việc thêm bớt các phần tử trong DOM. Các structural directive thường có dấu '*' ở trước của directive. Ví dụ *ngFor, \*ngIf
- **Attribute Directives**: Thay đổi giao diện, tương tác của các đối tượng hoặc thay đổi directive khác hoặc thêm các thuộc tính động cho element html. ví dụ \*ngStyle

## Component Directives

Components là 1 directives phổ biến nhất. Nó là sự kết hợp của bộ template html (bộ khung html) và nhúng kèm code TypeScript. Các components là độc lập với nhau và độc lập với hệ thống. Nó có thể được cài vào hoặc tháo ra khỏi hệ thống dễ dàng. Một component có thể hiểu như một control trên màn hình hiển thị, gồm giao diện html và code logic xử lý sự kiện đi kèm control đó. Một component cũng có thể như là cả 1 màn hình chứa nhiều control hoặc một nhóm nhiều màn hình. Tức là là một component cũng có thể chứa và gọi được nhiều component khác nối vào. Như vậy Angular rất linh hoạt trong việc chia nhỏ code ra các component.

Trong Angular chúng ta khai báo một Component với cấu trúc như sau:

```ts
import { Component } from "@angular/core";
@Component({
  selector: "app-hello-world",
  template: `<h1>Hello Angular world</h1>`,
})
export class HelloWorld {}
```

- `selector` : Là tên được đặt để gọi một component trong code html. Ở ví dụ vừa rồi, từ khóa app-hello-world được đặt tên cho component này. Khi cần gọi component này ra ở màn hình html cha, ta sẽ gọi bằng html tag <app-hello-world></app-hello-world>. Gọi như vậy thì component con sẽ được render ra component cha.
- `template` : Là tự định nghĩa khung html cho component dạng string ở trong file này luôn. Ví dụ ở trên chỉ định nghĩa một thẻ html h1 đơn giản. Cách này chỉ dùng cho component đơn giản.
- `templateUrl` : Là đường dẫn url tới file html bên ngoài để load file đó vào làm khung html cho component này. Đây là cách code hay được dùng vì cho phép tách riêng khung html ra khỏi code logic, người làm design sẽ sửa file html riêng, độc lập với người làm code.
- `styles` : Là viết style css luôn vào file component này. Cách này chỉ dùng cho component đơn giản.
- `styleUrls` : Là đường dẫn url đến file style css độc lập cho component này. Cách này khuyên dùng vì file css nên để dành riêng cho người designer đụng vào.

## Structural Directives

Chúng ta sử dụng Structure Directive để thay đổi layout của trang website bằng cách thêm hoặc xoá các thành phần trên web (DOM Elements).

Một số thẻ về Structurall Directive như

- ngFor : dùng để lặp lại các phần HTML cho mỗi item. Nó giống như vòng lặp for. Mỗi lần lặp nó sẽ chạy lại các đoạn code trong vòng lặp

```html
<tr *ngFor="let customer of customers;">
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
```

- ngSwitch : chúng ta dùng để quyết định thêm hoặc xoá các thành phần của web phụ thuộc vào điều kiện có thoả mãn hay không. Chúng ta thường dùng chung với ngSwitchCase và ngSwitchDefault

```html
<div [ngSwitch]="Switch_Expression">
  <div *ngSwitchCase="MatchExpression1">First Template</div>
  <div *ngSwitchCase="MatchExpression2">Second template</div>
  <div *ngSwitchCase="MatchExpression3">Third Template</div>
  <div *ngSwitchCase="MatchExpression4">Third Template</div>
  <div *ngSwitchDefault?>Default Template</div>
</div>
```

- ngIf : chúng ta sử dụng ngIf để thêm và xoá các thành phần HTML dựa vào điều kiện có thảo mản không. Điều kiện phải đúng mới thực hiện các câu lệnh bên trong

```html
<div *ngIf="condition">This is shown if condition is true</div>
```

## Attribute Directives

Được dùng để thay đổi sự hiển thị hoặc hành vi của một thành phần trên web.

- ngModel : được sử dụng cho việc binding 2 chiều như ta đã học trong bài databinding

- ngClass : được sử dụng để thêm hoặc xoá một class của một thành phần web

```html
<div [ngClass]="'first second'">...</div>
```

- ngStyle : dùng để thêm nhiều thuộc tính css cho một thành phần của web

```html
<div [ngStyle]="{'color': 'blue', 'font-size': '24px', 'font-weight': 'bold'}">
  some text
</div>
```

## Custome Directives

Tạo directive với tên là emoji.directive.ts

```ts
import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appEmoji]'
})
export class EmojiDirective implements OnInit {

  constructor(private el: ElementRef) {}

   ngOnInit() {
    this.el.nativeElement.textContent +=️ '✌️';
  }
}
```

Giờ sử dụng directive `appEmoji` bên trong app-component

```html
<div style="text-align:center">
  <h1 appEmoji>Welcome to Angular 8</h1>
</div>

....
```
Kết quả như hình
![](./assets/lesson3-custome-directive.PNG?raw=true "custome-directive")

# Dynamic Component

Trong nhiều trường hợp, chúng ta muốn thay đổi trong lúc runtime, ở vị trí đó không phải chỉ fix cứng 1 component B như vậy. Có lúc sẽ là component B, có lúc sẽ là component C tùy logic của ứng dụng. Hay ở tình huống khác, chúng ta muốn người dùng phải làm gì đó ở component A thì mới load component B lên. Nếu code bình thường, component B luôn được fix cứng trong template là con của A.

Vậy việc load động 1 component khác trong lúc runtime được thực hiện như thế nào? `Dynamic Component` sẽ là câu trả lời phù hợp để làm việc này.

## Các nội dung chính
1. Thiết lập phần container: `ViewContainerRef` là gì? `static property` có ý nghĩa gì?
2. Tiến hành render component ở runtime
3. Tương tác giữa 2 component

## Thiết lập phần container

``` ts
export class AppComponent {
  @ViewChild("container", { read: ViewContainerRef })
  container: ViewContainerRef;
  ...
}
```

ở file app.component.html
```html
<ng-container #container></ng-container>
```

### ViewContainerRef là gì?
Nó là một cái container từ đó có thể tạo ra Host View (component khi được khởi tạo sẽ tạo ra view tương ứng), và Embedded View (được tạo từ TemplateRef). Với các view được tạo đó sẽ có nơi để gắn vào (container).

Container có thể chứa các container khác (ng-container chẳng hạn) tạo nên cấu trúc cây. Hay hiểu đơn giản thì nó giống như 1 DOM Element, khi đó có thể add thêm các view khác (Component, Template) vào đó.

### static property có ý nghĩa gì
static - True để giải quyết kết quả truy vấn trước khi chạy phát hiện thay đổi.
static - false để giải quyết sau khi phát hiện thay đổi. Giá trị mặc định là false.

Tìm hiểu thêm tại https://angular.io/api/core/ViewChild#description

## Tiến hành render component ở runtime

Tạo một dynamic component
```html
<p>Dynamic Component {{ index }}</p>
```

```ts
    import { Component, Input } from '@angular/core';

    @Component({
    selector: 'app-dynamic',
    templateUrl: './dynamic.component.html',
    styleUrls: ['./dynamic.component.css']
    })
    export class DynamicComponent {

    @Input() index: number;

    }
```

Chúng ta cần một số bước như sau để dynamic render component:

    Bước 1: Lấy ra ComponentFactoryResolver service để có thể tạo ra ComponentFactory.

    Bước 2: Từ ComponentFactory sẽ dùng ViewContainerRef để tạo ra component.

```ts
    ...
    private _counter = 1;
    constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

    add(): void {
        // Bước 1
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        DynamicComponent
        );

        // Bước 2
        const componentRef = this.container.createComponent(componentFactory);
    }
    ...
```
### ComponentFactory
Đây là 1 class dùng để tạo ra các components dynamic. Là kết quả trả về của ComponentFactoryResolver.resolveComponentFactory().
https://angular.io/api/core/ComponentFactory

### ComponentFactoryResolver
Đây là 1 class nhận vào các component để load dynamic và tạo ra 1 component factory của component đó. ViewContainerRef sẽ dùng ComponentFactory đó để load dynamic các components.

`Lưu ý:`  chúng ta sử dụng dynamic render, nên cần báo cho Angular biết chúng ta sẽ cần những component nào. Việc khai báo thì ta sẽ thêm vào app.module.ts như sau
```ts
@NgModule({
  /// ...other config
  entryComponents: [ DynamicComponent ]
})
```
## Tương tác giữa 2 component
### Gửi dữ liệu cho dynamic component
```ts
    add(): void {
        ...
        componentRef.instance.index = this._counter++;
    }
```
### Clear các dynamic components
```html
<button (click)="clearDynamicComp()" class="btn">Clear</button>
```
```ts
clearDynamicComp() {
    this.containerRef.clear();
  }
```

Tìm hiểu thêm tại https://angular.io/guide/dynamic-component-loader#dynamic-component-loading
# Dependency Injection
## Dependency Injection (DI) là gì?
Có thể hiểu Dependency Injection một cách đơn giản như sau:
 - Đây là một cách để hiện thực **Inversion of Control Pattern** (Có thể coi DI là một design pattern riêng cũng được).
 - Các module không giao tiếp trực tiếp với nhau, mà thông qua interface. Module cấp thấp sẽ implement interface, module cấp cao sẽ gọi module cấp thấp thông qua interface.
 - DI được dùng để làm giảm sự phụ thuộc giữa các module, dễ dàng hơn trong việc thay đổi module, bảo trì code và testing.

Thông thường, chúng ta chỉ thường gặp ba loại Dependency Injection sau:

- **Constructor injection:** Các dependency (biến phụ thuộc) được cung cấp thông qua constructor (hàm tạo lớp).
- **Setter injection:** Các dependency (biến phụ thuộc) sẽ được truyền vào 1 class thông qua các setter method (hàm setter).
- **Interface injection:** Dependency sẽ cung cấp một Interface, trong đó có chứa hàm có tên là `Inject`.  Các client phải triển khai một `Interface` mà có một setter method dành cho việc nhận dependency và truyền nó vào class thông qua việc gọi hàm `Inject` của `Interface` đó.

## Dependency injection trong Angular

Trong Angular, DI bao gồm ba thành phần sau đây:

- **Injector:** là một `object` có chứa các API để chúng ta có thể lấy về các `instances` đã tạo hoặc tạo các `instances` của các phụ thuộc.

- **Provider:** giống như một công thức để `Injector` có thể biết làm thế nào để tạo một `instance` của một phụ thuộc.

- **Dependency:** là một `object` (có thể là `function`, một `value` thông thường) của một kiểu dữ liệu cần phải khởi tạo. (Trong ví dụ phía dưới là `CartService`).
- **DI Token** là đinh danh duy nhất cho một `Dependency`. Chúng ta sử dụng `DI Token` khi chúng ta đăng ký `dependency`.

![](./assets/DI-angular.png?raw=true "DI Angular")

Bạn có thể cung cấp injectors với providers ở nhiều levels khác nhau trong app, bằng một trong ba cách sau:

- Trong `@Injectable()` decorator cho service đó.
- Trong `@NgModule()` decorator (providers array) đối với NgModule.
- Trong `@Component()` decorator (providers array) đối với component hoặc directive.

Ví dụ về cách provide `CartService`:
```ts
@Injectable({
  providedIn: "root",
})
export class CartService {
  // properties and methods
}
```

```ts
@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"],
})
export class ProductComponent implements OnInit {
  constructor(private cartService: CartService) {}

  ngOnInit() {
    console.log(this.cartService.calculateTotal());
  }
}
```
Với `@Injectable` decorator, chúng ta đã thêm metadata để Angular biết được cách để tạo instance của `CartService` khi có một class nào đó request như `ProductComponent`. Và thông tin `providedIn: 'root'` sẽ chỉ cách cho Angular biết rằng chúng ta mong muốn service này sẽ có một instance (singleton) cho suốt toàn bộ app.

### DI trong Angular hoạt động ra sao?
- Đầu tiên thì `Depedency` sẽ phải đăng ký với `Provider` trước và `@Injectable()` sẽ đánh dấu lớp dịch vụ đó để có thể inject. Điều này được thực hiện trong metadata `Provider` của `Injector`.
- Bộ `injector` sẽ chịu trách nhiệm tạo instance của lớp dịch vụ và đưa chúng vào các lớp như trong ví dụ trên là `ProductComponent`.
- Một `Provider` sẽ nói cho `injector` làm thế nào để tạo instance của lớp dịch vụ. Bạn sẽ phải config `injector` trước với `provider` khi mà `injector` có thể tạo instance của lớp dịch vụ.
- Một `Provider` có thể là chính lớp dịch vụ do đó bộ `injector` có thể sử dụng `new` để tạo instance . Bạn cũng có thể tạo nhiều lớp để cung cấp cùng một dịch vụ theo nhưng với các config khác với với các `Provider` khác nhau.
- `Injector` được kế thừa thì nó có thể yêu cầu injector cha của nó để sử dụng. Một Component có thể sử dụng dịch vụ từ injector của nó , nhận từ injetor của component cha nó, từ injector của `NgModule` hoặc root injector.
- `Injector` đọc các `dependencies` từ `Constructor Component` của `Consumer` và tìm kiếm `dependency` trong `provider`. Provider sẽ cung cấp instance và injector, sau đó sẽ được inject vào `Consumner Component`. Nếu `instance` của `dependency` đã tồn tại thì nó sẽ được sử dụng lại để tạo thành `dependecy singleton`.
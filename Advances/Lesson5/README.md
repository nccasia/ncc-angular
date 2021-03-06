# Rxjs
- Rxjs là một build-in dependency trong Angular, Rxjs giúp Angular trở nên `reactive`, ứng dụng Angular là một reactive system dễ thấy ở đây nhất là EventEmiter hay ReactiveForm. Trong bài học này chúng ta sẽ tìm hiểu thư viện Rxjs một số Operators thường xuyên sử dụng

## Các nội dung chính
1. Một số khái niệm/concepts cơ bản trong Rxjs
2. Phân loại các nhóm Operators trong Rxjs
3. Instance Operators vs Static Operators
4. Transformation Operators
5. Filtering Operators
6. Combination Operators
7. Utility Operators
8. Higher Order Observables

## Một số khái niệm/concepts cơ bản trong Rxjs
### Observable
`Observable` chỉ là một function (class) mà nó có một số yêu cầu đặc biệt. Nó nhận đầu vào là một Function, mà Function này nhận đầu vào là một Observer và trả về một function để có thể thực hiện việc cancel quá trình xử lý. Thông thường (Rxjs 5) chúng ta đặt tên function đó là `unsubscribe`.  
```ts
const observable = new Rx.Observable(function subscribe(observer) {
  const id = setInterval(() => {
    observer.next('Hello Rxjs');
  }, 1000);
});
```
### Observer
`Observer`: một object có chứa các phương thức next, error và complete để xử lý dữ liệu tương ứng với các signals được gửi từ Observable. Như vậy, chúng ta có thể thấy Observable là lazy computation, giống như function, nếu chúng ta tạo chúng ra mà không gọi, thì không có gì thực thi cả  
```ts
const observer = {
  next: x => console.log('Observer got a next value: ' + x),
  error: err => console.error('Observer got an error: ' + err),
  complete: () => console.log('Observer got a complete notification'),
};
```

### Subscription
`Subscription` là một object đại diện cho một nguồn tài nguyên có khả năng hủy được, thông thường trong Rxjs là hủy Observable execution. Subscription có chứa một method quan trọng unsubscribe (từ Rxjs 5), khi method này được gọi, execution sẽ bị hủy.  

```ts
const observable = Rx.Observable.interval(1000);
const subscription = observable.subscribe(x => console.log(x));
// Sau 5s sẽ hủy phần thực thì này bằng cách gọi hàm unsubscribe()
setTimeout(() => {
  subscription.unsubscribe();
}, 5000);
```

### Rxjs Subject

- Mỗi Subject là một Observable: bạn có thể subscribe vào nó, cung cấp cho nó một Observer và bạn có thể nhận data tương ứng.  

- Mỗi Subject là một Observer: bên trong Subject có chứa các method next, error, complete tương ứng để bạn có thể subscribe vào Observable chẳng hạn. Khi cần gửi dữ liệu cho các Observers mà Subject đang quản lý, bạn chỉ cần gọi hàm tương ứng

Ví dụ: subscribe một `Subject`
```ts
const subject = new Rx.Subject();

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});
subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

subject.next('Hello');
subject.next('Subject');

// result
"observerA: Hello"
"observerB: Hello"
"observerA: Subject"
"observerB: Subject"
```

Hoặc truyền vào một Observable  
```ts
const subject = new Rx.Subject();

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});
subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

// subject.next('Hello');
// subject.next('Subject');

const observable = Rx.Observable.interval(500).take(3);

observable.subscribe(subject);

// result
"observerA: 0"
"observerB: 0"
"observerA: 1"
"observerB: 1"
"observerA: 2"
"observerB: 2"
```

Ngoài ra trong lập trình ứng dụng Angular chúng ta thường sử dụng một số biến thể khác của `Subject` như `BehaviorSubject` hay `ReplaySubject`,...  

## Phân loại các nhóm Operators trong Rxjs
Sau đây chúng ta sẽ tìm hiểu qua một số Rxjs Operators hay được sử dụng khi làm việc với Angular, gồm các nhóm như sau:  
- Instance Operators vs Static Operators
- Transformation Operators
- Filtering Operators
- Combination Operators
- Error Handling Operators
- Utility Operators
- Higher Order Observables

## Instance Operators vs Static Operators
Thông thường static operators là các operators được gắn với class Observable, chúng được dùng phổ biến để tạo mới Observable  
Ví dụ như các operator `of`, `from`, `interval`, `fromPromise`, `empty`, etc.  
Ví dụ dùng `of` để mock data cho một API như sau:  

```ts
  getUser(): Observable<User[]> {
    // return this.api.get('/users');
    return of([{name: 'User1', age: 20}, {name: 'User2', age: 26}]);
  }
```

Ví dụ convert một `Promise` sang Observable ta dùng `fromPromise`:
```ts
function getInfo() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: 'User1',
        age: 20
      });
    }, 300);
  });
}

const source = Rx.Observable.fromPromise(getInfo());
```
### Transformation Operators
Transformation Operators dùng để chuyển đổi giá trị của Observable từ dạng này sang sang dạng khác như `map`, `buffer`, `bufferTime`, có lẽ hay sử dụng nhất là `map`:  
```ts
//emit (1,2,3,4,5)
const source = Rx.Observable.from([1,2,3,4,5]);
//add 10 to each value
const example = source.map(val => val + 10);
//output: 11,12,13,14,15
const subscribe = example.subscribe(val => console.log(val));
```
### Filtering Operators
Filtering Operators mục đích để filter các giá trị được emit thỏa mãn điều kiện nào đó, một số operator hay dùng thuộc nhóm này `filter`, `take`, `takeUntil`, `skip`, `throttleTime`, `debounceTime`, etc.  
```ts
const source = Rx.Observable.from([12, -22, -3, 45, 52]);

const filter$ = source.filter(num => num > 0);

const subscribe = filter$.subscribe(
  val => console.log(`Positive number: ${val}`)
);
```

### Combination Operators
Combination Operators: sử dụng để kết hợp các Observables lại với nhau, một số Combination Operators hay sử dụng:  

`merge`: Dùng để merge nhiều Observables thành một Observable, có thể thiểt lập con số stream chạy đồng thời qua tham số `concurrent`.  
`concat`: trong trường hợp bạn chỉ muốn 1 stream được chạy, các stream khác phải đợi stream trước complete. 
`combineLatest`: Mỗi khi một Observable emit value, emit giá trị mới nhất từ tất cả observables, nhưng phải thỏa mãn các Observable khác cũng đã emit value  
`forkJoin`: Khi tất cả các Observables complete, emit giá trị cuối cùng của mỗi Observable.  
Một ví dụ sử dụng `concat`:
```ts
const source = Rx.Observable.merge(
  s1,
  s2,
  s3,
  1
);

const csource = Rx.Observable.concat(
  s1,
  s2,
  s3
);

// output
"s1: 0"
"s1: 1"
"s1: 2"
"s1: 3"
"s1: 4"
"s2: 0"
"s2: 1"
"s2: 2"
"s3: 0"
"s3: 1"
```

### Error Handling Operators
Error Handling Operators sử dụng để handle error trong ứng dụng của bạn.  
`catch`: `catch(project : function): Observable`. Thường được sử dụng rộng rãi để handle error  
`retry`: Sử dụng để restart lại stream trong trường hợp stream bị văng ra lỗi. Có thể giới hạn số lần retry bằng cách truyền vào tham số. Nếu không truyền vào, sẽ luôn retry mỗi khi lỗi văng ra.  
Một ví dụ sử dụng `catch`:  
```ts
//emit error
const source = Rx.Observable.throw('This is an error!');
//gracefully handle error, returning observable with error message
const example = source.catch(val => Rx.Observable.of(`I caught: ${val}`));

const subscribe = example.subscribe(val => console.log(val));

//output:
'I caught: This is an error'
```
### Utility Operators
`do`: Dùng để thực hiện một hành động nào đó, và đảm bảo side-effect không ảnh hưởng tới source  
`delay`: Delay emit value theo một khoảng thời gian cho trước.  
Một ví dụ sử dụng `delay`:  
```ts
const source = Rx.Observable.of(1, 2, 3);

const foo$ = source.delay(1000);

foo$.subscribe(x => console.log(x));
```

### Higher Order Observables
Higher Order Observable (HOO) là một Observable trả về một Observable, nó giống như mảng nhiều chiều vậy - mảng 2 chiều chứa trong nó các mảng 1 chiều.  
Chúng ta có một só Operators nổi bật như `mergeMap`, `concatMap`, `switchMap`.  
Một ví dụ sử dụng `concatMap` để call 2 API mà API sau phụ thuộc vào kết quả của API trước:  

```ts
this.productCategoryService.getCategories()
.pipe(
  // load danh sách sản phẩm với danh mục đầu tiên tải về được
  concatMap(cates => {
    return cates.length > 0 ? this.productService.getProducts(cates[0]) : of([])
  })
).subcribe(products => {
  console.log('products', products);
})
```
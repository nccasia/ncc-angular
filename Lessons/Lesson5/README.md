# Data binding

## What is Binding?

Binding is the process which generates the connection between the application UI and the data which comes from the business logic. In Angular, it is called the automatic synchronization of the data and the view.

## Data Binding in Angular 8

Data binding is the most important and essential features in any software development language. It is a powerful feature of Angular. Angular Data binding is used for communication. It allows us to define the connection between the component and view. So, we can say that data binding is passed from component to view. It makes it easy to identify interactive applications without worrying about pushing and pulling the data. It is mainly used to communicate between our Typescript code and another component.

Data binding can be one-way data binding or two-way data binding.

![](./assets/Data-Binding-in-Angular-8.png?raw=true "Data binding")

### One way data-binding:

It is a simple one-way communication where HTML template is changed when we make changes in typescript code. The value of the model is used in the view (HTML page), but we can’t update the model from the view in one-way data binding. Property binding, Event binding, and String interpolation are an example of one-way data binding.

![](./assets/One-way-Data-Binding-in-Angular-8.png?raw=true "One-Way-Data-Binding")

### Two-way data binding

In two-way data binding, automatic synchronization of data happens between the model and the view. Here, changes are reflected in both components. When we make changes in the model from the view, and when we make changes in view, it will be reflected in the model.

This will happens immediately and automatically, ensures that the HTML template and the Typescript code are updated at all times.

![](./assets/Two-way-Data-Binding-in-Angular-8.png?raw=true "Two-Way-Data-Binding")

## Types of Data Binding:

- String Interpolation
- Property binding
- Event Binding
- Two Way Data Binding

![](./assets/Component-of-Data-Binding.png?raw=true "Component-of-Data-Binding")

## Examples:

### Event binding in Angular 8

```ts
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-data-binding",
  templateUrl: "./data-binding.component.html",
  styleUrls: ["./data-binding.component.css"],
})
export class DataBindingComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  onSave($event: any) {
    console.log("Save button is clicked!", $event);
  }

  onDivClick() {
    console.log("DIV is clicked!");
  }
}
```

```html
<h2>Event Binding Example</h2>
<div (click)="onDivClick()">
  <button (click)="onSave($event)">Save</button>
</div>
```

![](./assets/Event-Binding-Output.png?raw=true "Event binding in Angular 8")

### Property binding in Angular 8

```ts
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-data-binding",
  templateUrl: "./data-binding.component.html",
  styleUrls: ["./data-binding.component.css"],
})
export class DataBindingComponent implements OnInit {
  title = "Data binding using Property Binding";
  imgUrl = "../../../../../favicon.ico";

  constructor() {}

  ngOnInit() {}
}
```

```html
<!--String interpolation-->
<h2>{{title}}</h2>
<!--Property Binding-->
<img [src]="imgUrl" />
```

![](./assets/Property-Binding-Output.png?raw=true "Property binding in Angular 8")

### Two-way Data Binding in Angular 8

```ts
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-data-binding",
  templateUrl: "./data-binding.component.html",
  styleUrls: ["./data-binding.component.css"],
})
export class DataBindingComponent implements OnInit {
  titleInput = "Two-way Binding";

  constructor() {}

  ngOnInit() {}
}
```

```html
<h2>Two-way Binding Example</h2>
<input [(ngModel)]="titleInput" name="titleInput" /> <br /><br />
<p>{{titleInput}}</p>
```

![](./assets/Two-way-Data-Binding-Output.png?raw=true "Two-way Data Binding in Angular 8")

# Forms
In Angular 8, there are two approaches to handle the user’s input through forms:
* Reactive forms
* Template-driven forms

Both methods are used to collect user input event from the view, validate the user input, create a form model to update, and provide a way to track changes.

## Reactive forms

Reactive forms are more robust, and they are more scalable, reusable, and testable. If forms are a vital part of our application or are already using reactive patterns for building our app, handle responsive forms. 

## Template-driven forms

It is useful for adding a simple form to an app, such as an email list signup form to an app, such as an email list signup form.  It is easy to add to an app, but they don’t scale as well as reactive forms. If we have fundamental form requirements and logic that can be managed in the template and use template-driven forms.

## Difference between Reactive and Template-driven Forms:


| Index             | Reactive Forms           | Template-driven Forms  |
| ----------------- |:-------------------------| :---------------------- 
| Setup (form model)| Responsive forms are more explicit. They are created in the component class. | Template-driven forms are less explicit. Directives create them. |
| Data model        | Structured       | Unstructured |
| Predictability    | Synchronous      | Asynchronous |
| Form Validation   | Functions        | Directives |
| Mutability        | Immutable        |Mutable |
| Scalability       | Low-level API access | Abstraction on top of APIs.|

## Similarities between Reactive and Template-driven Forms

 There are some building blocks which are allocated by both reactive and template-driven forms:

* `FormControl`: It is mainly used to track the value and authentication status of an * individual form control.
* `FormGroup`: It has been used to track the same values and level of a collection for the form control.
* `FormArray`: It isused to route the same values and status for the array to form controls.
* `ControlValueAccessor`: It is used to create a gap between Angular native DOM elements and.Form Control instances

## Form Model Setup

Form model setup is used to trace value change between Angular forms and form input elements. Take an example to see the form model is defined and created.

## Form model setup in Reactive forms:

See the component with an input field for a single control implemented using reactive forms.

```ts
import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "my-app",
  template: `
    Favorite Color: <input type="text" [formControl]="favoriteColorControl" />
  `
})
export class AppComponent {
  favoriteColorControl = new FormControl("");
}
```
The form model is the source of truthfulness in reactive forms. The source of truth supply the value and status of the form element at a given point of time.

Here, in the above example, the form model is the form Control instance.

![](./assets/angular8-forms-control.png?raw=true "Forms")

In reactive forms, the form model is clearly defined in the component class. After the reactive form directive links the existing FromControl instance to a specific form element in the view using a value accessor.

## Form Model setup in Template-driven Forms

See the same component with an input field for a single control implemented using template-driven forms.
```ts
import { Component } from '@angular/core';
@Component({
selector: 'app-template-favorite-color',
template: `
Favorite Color: <input type="text" [(ngModel)]="favoriteColor"> `
})
export class FavoriteColorComponent {
favoriteColor = ''
}
```

In template-driven forms, the source of the truth is template itself.

![](./assets/angular8-template-driven-forms.png?raw=true "Forms")

The form model abstraction promotes simplicity over the structure. The template-driven form directive NgModel creates and organizes the FormControl instance for any form element. It’s less explicit, but it eliminates the direct control over the form model.

## Data Flow in Reactive Forms

In Reactive form, each form of elements in the view is linked to a form model (form Control instance). Updates from the view to the model and from the model to the view and synchronous. And aren’t dependent on the UI rendering. The diagram below uses the same favorite color example to demonstrate how data flows work when an input fields value is changed from the view and then from the model.

![](./assets/data-flow-forms-in-angular-8.png?raw=true "Forms")

The steps of the data flow from view to model:

1. The user types a value in the input element; in the case, the favorite color is Blue.

2. The form input element releases an “input” event with the latest value.

3. The control value accessor attends for functions on the form input element immediately relay the new value to the FormControl instance.

4. The form control instance releases the original amount through the value changes observables.

5. Any subscriber to the valueChanges observable receives the new value.

![](./assets/data-flow-forms-in-angular-8-1.png?raw=true "Forms")

The steps of the data flow from model to view:

1. The user calls the favoritecolorcontrol.setvalue method. Which update the form control value.
2. Then the form control instance recovers the new value through the value changes observables.
3. Then subscribers to the valueChanges observables receive the new value.
4. At least, the control value accessor on the form input element update the elements in the new value.


## Creating form in Angular 8

The steps are given below:

Create an Angular form app named angular8from and run the server by using the following commands.

```
ng new angular8form
```
![](./assets/Angular8FormApp.png?raw=true "Forms")


Then,
```
cd angular8form
ng serve 
```
![](./assets/ng-serve.png?raw=true "Forms")

### ``Template-driven forms``
We use the given below code in “app.module.ts” file.
![](./assets/Template-driven-forms-import.png?raw=true "Forms")

"app.component.html"

```html
<form>
  <div class="form-group row">
    <label class="col-2 col-form-label">
      Email:
    </label>
    <div class="col-10">
      <input class="form-control" type="text" [(ngModel)]="email" [ngModelOptions]="{standalone: true}">
    </div>
  </div>
  <div class="form-group">
    <button (click)="onSubmit()" class="btn btn-dark">Submit</button>
  </div>
  <p>
    Value: {{email}}
  </p>
</form>
```
"app.component.ts"

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  email: string;
  onSubmit() {
    console.log("submit");
  } 
}
```
Now, we can start the server to see the output.

![](./assets/template-forms-output.png?raw=true "Forms")

### ``Reactive form``
Register the Reactive forms Module
Use the reactive forms by importing ReactiveFormsModule from @angular/forms package and add it into the app.module.ts file’s import array.
“app.module.ts” file.

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

“app.component.ts” file.
```ts
import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  email = new FormControl("");
  onSubmit() {
    console.log("submit");
  }
}
```

"app.component.html"

```html
<div class="form-group row">
  <label class="col-2 col-form-label">
    Email:
  </label>
  <div class="col-10">
    <input class="form-control" type="text" [formControl]="email">
  </div>
</div>
<div class="form-group">
  <button (click)="onSubmit()" class="btn btn-dark">Submit</button>
</div>
<p>
  Value: {{email.value}}
</p>
```

Output
![](./assets/template-forms-output.png?raw=true "Forms")

## Form Validation
There are two validator functions:
* `Sync validators`: It is a type of service which controls instance and immediately returns either a set of validation errors or null. We can press these in as the second argument when we instantiate a Form Control.
* `Async validators`: It is functions that take a control instance and return a promise or observable that later emits a set of validation error or null. We can pass these in as the third argument when we instantiate a Form Control.

See the code:

```ts
  rfContact: FormGroup;

  ngOnInit(): void {
    this.rfContact = new FormGroup({
      email: new FormControl("",[
        Validators.required,
        Validators.email
      ]),
    });
  }
```

```html
<form (ngSubmit)="onSubmit()" [formGroup]="rfContact" class="row" style="margin: 5px;">
  <label class="col-2 col-form-label">
    Email:
  </label>
  <div class="col-10">
    <input class="form-control" type="email" formControlName="email">
    <div class="col alert alert-danger" role="alert" *ngIf="rfContact.controls.email?.errors?.required
           && rfContact.controls.email?.touched">
      Email is required!
    </div>
    <div class="col alert alert-danger" role="alert" *ngIf="rfContact.controls.email?.errors?.email
           && rfContact.controls.email?.touched">
      Invalid email address!
    </div>
  </div>
  <div class="form-group">
    <button class="btn btn-dark">Submit</button>
  </div>
</form>
<p>
  Value: {{email}}
</p>
```
``Example`` 
Email is required
![](./assets/email-error-1.png?raw=true "Forms")

Invalid Email
![](./assets/email-error-2.png?raw=true "Forms")

Valid Email
![](./assets/template-forms-output.png?raw=true "Forms")

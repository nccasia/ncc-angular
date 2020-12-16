# Angular 8 Components

- Components are defined using a **@component** decorator and a tree of the angular component. It makes our complex application in reusable parts which we can reuse easily.

- The component is the most critical concept in Angular and a tree of components with a root component. The root component is one contained in the bootstrap array in the main **ngModule** module defined in the **app.module.ts** file.

![](./assets/component.png?raw=true "Component")

## What is Component-Based Architecture?

An Angular application is build of some components which form a tree structure with parent and child components.

A component is an independent block of an extensive system that communicates with the other building blocks of the systems using inputs and outputs. It has an associated view, data, and behavior and has parent and child components.

The component allows maximum re-usability, secure testing, maintenance, and separation of concerns. Go to our Angular project folder and open the src/app folder, which we will see the following files.

**App folder:** The app folder contains the data we have created for app components.

- **app.component.css:** The component CSS file.
- **app.component.html:** This component is used for HTML view.
- **app.component.spec.ts:** The HTML view of the component
- **app.component.ts:** Component code (data and behavior)
- **app.module.ts:** The main application module.

Go further and open the **src/app/app.component.ts** file and let’s understand the code behind the root component of the application.

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "demo-app";
}
```

- **selector:** It specifies the tag that can be used to call this component in HTML templates just like the standard HTML tags.
- **templateUrl:** It indicates the path of the HTML template that will be used to display this component.
- **styleUrls:** It specifies an array of URLs for CSS style-sheet in the component.

## Creating a component with CLI

```c
ng generate component component_name
or
ng g c component_name
```

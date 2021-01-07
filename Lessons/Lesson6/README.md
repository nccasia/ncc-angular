# Pipes
Pipes are a useful feature in Angular. These are the simple way to transform values in an Angular template. It takes the integers, strings, array, and dates as input separated with | to be converted in the format as required and display same as an in the browser. 

Inside the interpolation expression, we define the pipe and use it based on the situation because there are many types of pipes. We can use in our angular applications.

A pipe holds in data as input and transforming it into the desired output. Some values benefit for a bit of editing. We may notice that we want many of the same transformations repeatedly, both within and across many applications.

We can almost think of them as styles, and In fact, we might like to apply them in our HTML templates.

### Syntax:
```
{{title | uppercase}}
```

## Built-in Angular pipes

Angular has a stock of pipes such as Date Pipe, Uppercase Pipe, Lowercase Pipe, currency pipe, and percent pipe. They are available for use in any angular template. Angular doesn’t have the Filter Pipe or any Orderbypipe. Angular doesn’t provide the pipes for filtering and sorting the lists.

![](./assets/Built-in-Angular-pipes.png?raw=true "build-pipes")

* AsyncPipe
* Currencypipe
* Datapipe
* Decimalpipe
* Jsonpipe
* Percentpipe
* Lower case pipe
* Upper case pipe
* Slicepipe
* Title case pipe

## Parameterizing a pipe

We can also move a parameter to the pipe; we can use the HTML code to pass the parameter.

``app.component.html``

```HTML
<h1>
    NCC’s birthday is {{ birthday | date:”dd/mm/yyyy”}}
</h1> 
```

Chaining pipes

We can chain pipes together and creates useful combinations and also can use the lowercase and upper case pipe in our example.

``app.component.html``

```HTML
<h1>
    NCC’s birthday is {{birthday | date | uppercase}}
</h1>
```

Now, our date is in upper case letter.

## Pure and Impure pipes
There are two categories of pipes:

1. Pure
2. Impure

By default, pipes of angular are pure. Every pipe we have seen are pure and built-in pipes. We can make the pipe impure by setting the pure flag into false.


``Pure pipes
``

Angular executes the pure pipe only when if it detects the perfect  change in the input value. The real difference is either in the shift to the primitive input value (Number, Boolean, Symbol, String) or a changed object reference (Array, Function, Object, Date).

``Impure pipes
``

Angular executes the corrupted pipe during every component change detection cycle. The impure pipe is called often every keystroke or mouse-move.

## How to Create a Custom Angular Pipe?

To create a custom pipe, we create a new ts file and use the code according to work, and we have to import Pipe, Pipe Transform from Angular/Core.

Create a custom pipe to convert temperatures between degrees Celsius and Fahrenheit.

``tempConverter.ts``
```ts
import { Pipe } from '@angular/core';

@Pipe({
  name: 'tempConverter'
})
export class TempConverterPipe {
}
```
* The default when created is pure pipe

We need to implement an interface called `PipeTransform`, and implement the `transform` function of that interface:

```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'tempConverter'
})
export class TempConverterPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
  }
}
```
In the `transform` function, we will do the work to transform the input and output the desired result in the output.

``Note``: we use Rest parameters of ES2015 “… args” to get all the parameters passed to the pipe.

After completing the above Pipe class implementation, we need to declare the NgModule it belongs to so that we can use it in the entire module:

```ts
import { TempConverterPipe } from './pipes/temp-converter.pipe';

@NgModule({
  declarations: [
    // Component, Directive, Pipe
    TempConverterPipe
  ],
  imports: [...],
  providers: [...],
  //...
})
export class AppModule { }
```
Use the pipe in the Component as follows:

```HTML
Temperature {{ temp | tempConverter:true:'F' }}
```

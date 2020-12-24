# Directives

Directives are instructions in the **DOM** (Document Object Model). It specifies how to place our business logic in Angular. The directive is markers on a DOM element that tell Angular to attach a specified behavior to that DOM element or even transform the DOM element and its children. Mostly directives in Angular starts with ng- where **ng** stands for **Angular**, and it extends the HTML.

There are three kinds of directives:

- **Component Directives**
- **Structural Directives**
- **Attribute Directives**

## Component Directives

Components are the most common of the directives. It contains the details of how the component should be processed, instantiated, and used at runtime. The component comprises meta-data.

## Structural Directives

Structural Directivesaredone in the elements section. These directives are used to manipulate and change the structure of the DOM elements. Structural directives have a star (_) sign before the directive. Like as,_ ngIf, *ngFor, and *ngSwitch directive.

**\*ngIf Directive:** The **\*ngIf** allows us to Add/Remove DOM Element.
**\*ngSwitch Directive:** The **\*ngSwitch** will enable us to Add/Remove DOM element. It is same as the switch statement of C#.
**\*ngFor Directive:** The **\*ngFor** directive is used to repeat a part of HTML template once per each item from an iterable list (Collection).

## Attribute Directives

Itdeals with changing the look and behavior of the DOM element. For example: **ngClass**, **ngStyle** etc.

- **NgClass Directive:** The ngClass Directive is used to add or remove CSS classes to an element.
- **NgStyle Directive:** The ngStyle Directive facilitates you to modify the style of an HTML element using the expression. We can also use the ngStyle Directive to change the style of our HTML element dynamically.

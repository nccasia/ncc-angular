import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicComponent } from './dynamic/dynamic.component';

@Component({
  selector: 'app-dynamic-example',
  template: `
    <button (click)="add()">Dynamically Add Component</button>
    <button (click)="clearDynamicComp()" class="btn">Clear</button>

    <!-- This is where we will insert the dynamic components -->
    <ng-container #container></ng-container>
  `,
  styleUrls: ['./dynamic-example.component.css']
})
export class DynamicExampleComponent {

  @ViewChild("container", { read: ViewContainerRef, static: true })
  container: ViewContainerRef;

  private _counter = 1;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  add(): void {
    // create the component factory
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      DynamicComponent
    );

    // add the component to the view
    const componentRef = this.container.createComponent(componentFactory);

    // pass some data to the component
    componentRef.instance.index = this._counter++;
  }
  clearDynamicComp() {
    this._counter = 1;
    this.container.clear();
  }
}

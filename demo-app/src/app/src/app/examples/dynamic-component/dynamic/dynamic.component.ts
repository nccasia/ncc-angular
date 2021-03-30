import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dynamic',
  template: `
    <p>Dynamic Component {{ index }}</p>
  `,
  styleUrls: ['./dynamic.component.css']
})
export class DynamicComponent {

  @Input() index: number;

}

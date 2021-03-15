import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-angular-animation',
  templateUrl: './angular-animation.component.html',
  styleUrls: ['./angular-animation.component.css'],
  animations: [
    trigger('flyInOut', [
      transition('void => *', [
        style({ transform: 'translateY(-100%)' }),
        animate('0.5s ease-in-out')
      ]),
      transition('* => void', [
        animate('0.5s ease-in-out', style({ transform: 'translateY(100%)' }))
      ])
    ]),
    trigger('slide', [
      state('left', style({left: 0})),
      state('right', style({left: '200px'})),
      transition('left => right', [
        animate('0.5s ease-in-out')
      ]),
      transition('right => left', [
        animate('0.5s ease-in-out')
      ])
    ])
  ]
})
export class AngularAnimationComponent implements OnInit {

  imgDisplay: boolean = null;
  slide: string = 'left';
  constructor() { }

  ngOnInit() {
    this.imgDisplay = true;
  }

  flyInOut() {
    console.log('test');
    this.imgDisplay = !this.imgDisplay;
  }

  playSlide() {
    if(this.slide === 'left') {
      this.slide = 'right';
    }
    else{
      this.slide = 'left';
    }
  }
}

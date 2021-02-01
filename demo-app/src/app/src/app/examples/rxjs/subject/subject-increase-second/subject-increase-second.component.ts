import { RxjsService } from './../../rxjs.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subject-increase-second',
  templateUrl: './subject-increase-second.component.html',
  styleUrls: ['./subject-increase-second.component.css']
})
export class SubjectIncreaseSecondComponent implements OnInit {

  number: number = 0;
  constructor(
    private rxjs: RxjsService
  ) { }

  ngOnInit() {
    this.rxjs.rxjsSubject.subscribe(res => {
      this.number = res;
    })
  }

}

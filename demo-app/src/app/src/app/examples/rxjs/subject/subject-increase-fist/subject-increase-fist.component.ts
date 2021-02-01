import { Component, OnInit } from '@angular/core';
import { RxjsService } from '../../rxjs.service';

@Component({
  selector: 'app-subject-increase-fist',
  templateUrl: './subject-increase-fist.component.html',
  styleUrls: ['./subject-increase-fist.component.css']
})
export class SubjectIncreaseFistComponent implements OnInit {
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

import { RxjsService } from './../rxjs.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  number: number = 0;
  constructor(
    private rxjsService: RxjsService
  ) { }

  ngOnInit() {
  }

  increase() {
    this.number++;
    this.rxjsService.rxjsSubject.next(this.number);
  }

}

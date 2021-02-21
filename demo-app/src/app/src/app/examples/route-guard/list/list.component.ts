import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  listData$: Observable<any[]>;
  constructor(private _api: DataService) {}

  ngOnInit(): void {
    this.listData$ = this._api.getListData();
  }

}

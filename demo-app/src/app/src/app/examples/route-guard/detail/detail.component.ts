import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit {

  data$: Observable<any>;
  constructor(private _route: ActivatedRoute, private _api: DataService) {}

  ngOnInit(): void {
    let slug = this._route.snapshot.paramMap.get('slug');
    this.data$ = this._api.getDataBySlug(slug);
  }
}

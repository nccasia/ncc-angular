import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {

  slug$ = this.activatedRoute.paramMap.pipe(
    map(params => params.get('slug'))
  );
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

}

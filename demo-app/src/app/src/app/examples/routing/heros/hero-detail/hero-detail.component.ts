import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  id: number;
  name: string;
  constructor(
    private activedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.activedRoute.snapshot.params['id'];
    this.name = this.activedRoute.snapshot.queryParams['name'];
  }

}

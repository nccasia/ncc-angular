import { DemoService, User } from './demo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-http-example',
  templateUrl: './http-example.component.html',
  styleUrls: ['./http-example.component.css']
})
export class HttpExampleComponent implements OnInit {

  users: User[] = []
  constructor(
    private demoService: DemoService
  ) { }

  ngOnInit() {
    this.demoService.getUser().subscribe(users => {
      this.users = users;
    })
  }

}

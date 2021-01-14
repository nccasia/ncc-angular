import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DemoService, User } from '../demo.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = []

  constructor
    (
    private demoService: DemoService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this.demoService.getUser().subscribe(users => {
      this.users = users;
    })
  }

  updateUser(id: number) {
    this.router.navigate(['edit', id], {
      relativeTo: this.route.parent
    })
  }

  deleteUser(id: number) {
    this.demoService.deleteUser(id).subscribe(res => {
      this.loadData();
    });
  }
}

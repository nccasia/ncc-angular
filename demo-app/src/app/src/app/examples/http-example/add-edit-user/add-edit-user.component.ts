import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DemoService, User } from '../demo.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {

  id: number;
  user: User;
  userForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: DemoService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      name: this.fb.control(''),
      email: this.fb.control(''),
      website: this.fb.control(''),
    })
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.service.getUserById(this.id).subscribe(user => {
        this.user = user;
        this.userForm.patchValue(this.user);
      })
    }
  }

  addNew() {
    const formValues = this.userForm.value;
    const body = {
      name: formValues.name,
      email: formValues.email,
      website: formValues.website
    }

    this.service.addUser(body).subscribe(
      res => {
        alert('add success');
        this.router.navigate(['http-example'])
      },
      err => {
        alert(err);
      });
  }

  updateUser() {
    const formValues = this.userForm.value;
    const body = {
      name: formValues.name,
      email: formValues.email,
      website: formValues.website
    }

    this.service.updateUser(this.id, body).subscribe(
      res => {
        alert('update success');
        this.router.navigate(['http-example'])
      },
      err => {
        alert(err);
      });
  }
}

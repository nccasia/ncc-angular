import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  constructor() { }

  email: string;
  rfContact: FormGroup;

  ngOnInit(): void {
    this.rfContact = new FormGroup({
      email: new FormControl("",[
        Validators.required,
        Validators.email
      ]),
    });
  }

  onSubmit() {
    if (this.rfContact.valid)
      this.email = this.rfContact.controls["email"].value;
  }

}

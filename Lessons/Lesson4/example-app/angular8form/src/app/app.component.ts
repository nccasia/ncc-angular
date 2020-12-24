import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
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

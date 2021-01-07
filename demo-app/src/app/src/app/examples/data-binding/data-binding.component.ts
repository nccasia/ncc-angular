import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-data-binding",
  templateUrl: "./data-binding.component.html",
  styleUrls: ["./data-binding.component.css"],
})
export class DataBindingComponent implements OnInit {
  title = "Data binding using Property Binding";
  imgUrl = "../../../../../favicon.ico";

  titleInput = "Two-way Binding";

  constructor() {}

  ngOnInit() {}

  onSave($event: any) {
    console.log("Save button is clicked!", $event);
  }

  onDivClick() {
    console.log("DIV is clicked!");
  }
}

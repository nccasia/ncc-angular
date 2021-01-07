import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DataBindingComponent } from "./src/app/examples/data-binding/data-binding.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent, DataBindingComponent],
  imports: [FormsModule, BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

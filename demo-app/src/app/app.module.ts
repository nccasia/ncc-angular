import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DataBindingComponent } from "./src/app/examples/data-binding/data-binding.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TempConverterPipe } from "./src/app/examples/pipes/temp-converter.pipe";
import { PipeComponent } from './src/app/examples/pipes/pipe.component';
import { FormsComponent } from './src/app/examples/forms/forms.component';
import { EmojiDirective } from "./src/app/examples/directives/emoji.directive";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, DataBindingComponent, TempConverterPipe, PipeComponent, FormsComponent, EmojiDirective],
  imports: [FormsModule, ReactiveFormsModule, BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

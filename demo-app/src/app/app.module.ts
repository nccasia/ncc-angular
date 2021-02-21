import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DataBindingComponent } from "./src/app/examples/data-binding/data-binding.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TempConverterPipe } from "./src/app/examples/pipes/temp-converter.pipe";
import { PipeComponent } from "./src/app/examples/pipes/pipe.component";
import { FormsComponent } from "./src/app/examples/forms/forms.component";
import { EmojiDirective } from "./src/app/examples/directives/emoji.directive";
import { HttpClientModule } from "@angular/common/http";
import { RxjsComponent } from "./src/app/examples/rxjs/rxjs.component";
import { ApiSyncComponent } from "./src/app/examples/rxjs/api-sync/api-sync.component";
import { SubjectComponent } from "./src/app/examples/rxjs/subject/subject.component";
import { SubjectIncreaseFistComponent } from "./src/app/examples/rxjs/subject/subject-increase-fist/subject-increase-fist.component";
import { SubjectIncreaseSecondComponent } from "./src/app/examples/rxjs/subject/subject-increase-second/subject-increase-second.component";
import { ProductComponent } from "./src/app/examples/dependency-injection/product.component";
import { ModuleGuardModule } from "./src/app/examples/route-guard/module-guard.module";

@NgModule({
  declarations: [
    ProductComponent,
    AppComponent,
    DataBindingComponent,
    TempConverterPipe,
    PipeComponent,
    FormsComponent,
    EmojiDirective,
    RxjsComponent,
    ApiSyncComponent,
    SubjectComponent,
    SubjectIncreaseFistComponent,
    SubjectIncreaseSecondComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModuleGuardModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { SubjectComponent } from "./src/app/examples/rxjs/subject/subject.component";
import { ApiSyncComponent } from "./src/app/examples/rxjs/api-sync/api-sync.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DataBindingComponent } from "./src/app/examples/data-binding/data-binding.component";
import { FormsComponent } from "./src/app/examples/forms/forms.component";
import { PipeComponent } from "./src/app/examples/pipes/pipe.component";
import { RxjsComponent } from "./src/app/examples/rxjs/rxjs.component";
import { ProductComponent } from "./src/app/examples/dependency-injection/product.component";

const routes: Routes = [
  { path: "di", component: ProductComponent },
  { path: "data-binding", component: DataBindingComponent },
  { path: "angular-forms", component: FormsComponent },
  { path: "pipes", component: PipeComponent },
  {
    path: "routing-example",
    loadChildren: () =>
      import("./src/app/examples/routing/routing-module.module").then(
        (m) => m.RoutingModuleModule
      ),
  },
  {
    path: "http-example",
    loadChildren: () =>
      import("./src/app/examples/http-example/http-example.module").then(
        (m) => m.HttpExampleModule
      ),
  },
  {
    path: "rxjs",
    component: RxjsComponent,
    children: [
      { path: "", redirectTo: "api-sync", pathMatch: "full" },
      { path: "api-sync", component: ApiSyncComponent },
      { path: "subject", component: SubjectComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

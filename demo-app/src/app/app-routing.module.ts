import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DataBindingComponent } from "./src/app/examples/data-binding/data-binding.component";
import { FormsComponent } from "./src/app/examples/forms/forms.component";
import { PipeComponent } from "./src/app/examples/pipes/pipe.component";

const routes: Routes = [
  { path: "data-binding", component: DataBindingComponent },
  { path: "angular-forms", component: FormsComponent},
  { path: "pipes", component: PipeComponent},
  // using lazy loading
  { path: "routing-example", loadChildren: () => import('./src/app/examples/routing/routing-module.module').then(m => m.RoutingModuleModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

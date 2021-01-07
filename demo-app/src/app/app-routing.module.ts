import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DataBindingComponent } from "./src/app/examples/data-binding/data-binding.component";

const routes: Routes = [
  { path: "data-binding", component: DataBindingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

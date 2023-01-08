import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FloorComponent} from "./displays/floor/floor.component";
import {MenuComponent} from "./displays/menu/menu.component";

const routes: Routes = [
  {path: '', component: MenuComponent},
  {path: 'floor/:lvl', component: FloorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

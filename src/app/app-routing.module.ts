import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FloorComponent} from './displays/floor/floor.component';
import {MenuComponent} from './displays/menu/menu.component';
import {AchievementsComponent} from './displays/achievements/achievements.component';
import {InventoryComponent} from './displays/inventory/inventory.component';

const routes: Routes = [
  {path: '', component: MenuComponent},
  {path: 'floor/:lvl', component: FloorComponent},
  {path: 'achievements', component: AchievementsComponent},
  {path: 'inventory', component: InventoryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {KeyComponent} from './components/ui/keys/key.component';
import {KeysGroupComponent} from './components/ui/keys-group/keys-group.component';
import {FloorComponent} from './displays/floor/floor.component';
import {PlayerBarComponent} from './components/ui/player-bar/player-bar.component';
import {EntitiesComponent} from './components/entities/entities.component';
import {MenuComponent} from './displays/menu/menu.component';
import {HintsComponent} from './components/ui/hints/hints.component';
import {FormsModule} from '@angular/forms';
import {AchievementsComponent} from './displays/achievements/achievements.component';
import {PageBarComponent} from './components/ui/page-bar/page-bar.component';
import {EnemyComponent} from './components/enemy/enemy.component';
import {InventoryComponent} from './displays/inventory/inventory.component';

@NgModule({
  declarations: [
    AppComponent,
    KeyComponent,
    KeysGroupComponent,
    FloorComponent,
    PlayerBarComponent,
    EntitiesComponent,
    MenuComponent,
    HintsComponent,
    AchievementsComponent,
    PageBarComponent,
    EnemyComponent,
    InventoryComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

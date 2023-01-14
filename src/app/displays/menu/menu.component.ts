import {Component, OnDestroy, OnInit} from '@angular/core';
import {KeyboardKey, KeyboardService} from '../../services/keyboard.service';
import {Router} from '@angular/router';
import {ControlsPosition, MenuService} from '../../services/menu.service';
import {Subject} from "rxjs";

export enum MenuButton {
  Play = 'play',
  Settings = 'settings',
  Exit = 'exit',
  Achievements = 'achievements',
  Inventory = 'inventory',
  Stats = 'stats',
}

@Component({
  selector: 'game-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {
  public buttons = MenuButton;
  public activeButton: MenuButton = MenuButton.Play;
  public positions: {[key in MenuButton]?: ControlsPosition<MenuButton>};
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly keyboardService: KeyboardService,
    private readonly router: Router,
    private readonly menuService: MenuService,
  ) {
    this.positions = {
      [MenuButton.Play]: {
        bottom: MenuButton.Settings,
        right: MenuButton.Inventory,
        left: MenuButton.Achievements,
      },
      [MenuButton.Settings]: {
        top: MenuButton.Play,
        bottom: MenuButton.Stats,
        right: MenuButton.Inventory,
        left: MenuButton.Achievements,
      },
      [MenuButton.Stats]: {
        top: MenuButton.Settings,
        bottom: MenuButton.Exit,
        left: MenuButton.Achievements,
        right: MenuButton.Inventory,
      },
      [MenuButton.Exit]: {
        top: MenuButton.Stats,
        right: MenuButton.Inventory,
        left: MenuButton.Achievements,
      },
      [MenuButton.Achievements]: {
        right: MenuButton.Stats,
      },
      [MenuButton.Inventory]: {
        left: MenuButton.Stats,
      },
    };
  }

  ngOnInit() {
    this.menuService
      .make<MenuButton>(this.positions, this.activeButton, () => {
        switch (this.activeButton) {
          case MenuButton.Play:
            this.onPlay();
            break;
          case MenuButton.Achievements:
            this.onAchievements();
            break;
          case MenuButton.Inventory:
            this.onInventory();
            break;
        }
      })
      .subscribe(data => {
        this.activeButton = data;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onPlay() {
    this.router.navigate(['/floor/1'], {replaceUrl: true});
  }

  onAchievements() {
    this.router.navigate(['/achievements'], {replaceUrl: true});
  }

  onInventory() {
    this.router.navigate(['/inventory'], {replaceUrl: true});
  }
}

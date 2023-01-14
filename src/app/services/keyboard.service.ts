import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

export enum KeyboardKey {
  W = 'KeyW',
  S = 'KeyS',
  A = 'KeyA',
  D = 'KeyD',
  Up = 'ArrowUp',
  Down = 'ArrowDown',
  Left = 'ArrowLeft',
  Right = 'ArrowRight',
  Escape = 'Escape',
  Enter = 'Enter'
}

export enum FightDirection {
  Left,
  Right,
  Down,
  Up,
}

@Injectable({
  providedIn: 'root',
})
export class KeyboardService {
  fightKey = new Subject<FightDirection>();
  key = new Subject<any>();

  constructor() {}

  public handleClick(keyCode: any): void {
    let direction: FightDirection | null = null;

    switch (keyCode) {
      case KeyboardKey.W:
      case KeyboardKey.Up:
        direction = FightDirection.Up;
        break;
      case KeyboardKey.S:
      case KeyboardKey.Down:
        direction = FightDirection.Down;
        break;
      case KeyboardKey.A:
      case KeyboardKey.Left:
        direction = FightDirection.Left;
        break;
      case KeyboardKey.D:
      case KeyboardKey.Right:
        direction = FightDirection.Right;
        break;
    }

    this.key.next(keyCode);

    if (direction !== null) this.fightKey.next(direction);
  }
}

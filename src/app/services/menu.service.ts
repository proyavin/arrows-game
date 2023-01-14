import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {KeyboardKey, KeyboardService} from './keyboard.service';

export type ControlsPosition<T> = {
  left?: T;
  right?: T;
  bottom?: T;
  top?: T;
};

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private readonly keyboardService: KeyboardService) {}

  make<T>(
    positions: {[key in T as string]: ControlsPosition<T>},
    active: T,
    onEnter: any,
  ): Observable<T> {
    return new Observable(subscriber => {
      let action: any;
      this.keyboardService.key.subscribe(key => {
        switch (key) {
          case KeyboardKey.Left:
            action = 'left';
            break;
          case KeyboardKey.Right:
            action = 'right';
            break;
          case KeyboardKey.Down:
            action = 'bottom';
            break;
          case KeyboardKey.Up:
            action = 'top';
            break;
          case KeyboardKey.Enter:
            action = null;
            onEnter();
            return;
          default:
            action = null;
            break;
        }

        if (action) {
          // @ts-ignore
          if (Object.prototype.hasOwnProperty.call(positions, active)) {
            // @ts-ignore
            if (positions[active][action]) {
              // @ts-ignore
              subscriber.next(positions[active][action]);
              // @ts-ignore
              active = positions[active][action];
            }
          }
        }
      });
    });
  }
}

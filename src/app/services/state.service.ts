import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';

export enum State {
  Play,
  Pause,
}

@Injectable({
  providedIn: 'root',
})
export class StateService {
  public state: State = State.Play;
  public state$ = new ReplaySubject<State>(this.state);

  public toggleState() {
    if (this.state === State.Play) {
      this.pause();
    } else if (this.state === State.Pause) {
      this.play();
    }
  }

  public pause() {
    this.state = State.Pause;
    this.state$.next(this.state);
  }

  public play() {
    this.state = State.Play;
    this.state$.next(this.state);
  }
}

import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private assets: string[];
  hintSound: HTMLAudioElement | null = null;
  constructor() {
    this.assets = ['assets/sounds/hit.wav', 'assets/sounds/miss.wav'];
  }

  playHint() {
    const elem = document.createElement('audio');
    elem.style.display = 'none';
    elem.src = this.assets[0];
    elem.autoplay = true;
    elem.onended = function () {
      // @ts-ignore
      this.remove();
    };
    document.body.appendChild(elem);
  }

  playMiss() {
    const elem = document.createElement('audio');
    elem.style.display = 'none';
    elem.src = this.assets[1];
    elem.autoplay = true;
    elem.onended = function () {
      // @ts-ignore
      this.remove();
    };
    document.body.appendChild(elem);
  }
}

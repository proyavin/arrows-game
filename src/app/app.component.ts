import {Component, HostListener, OnInit} from '@angular/core';
import {KeyboardService} from "./keyboard.service";
import {PlayerService} from "./services/player.service";
import {Router} from "@angular/router";

@Component({
  selector: 'game-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(
    private readonly keyboardService: KeyboardService,
    private readonly playerService: PlayerService,
    private readonly router: Router
  ) {
  }

  ngOnInit() {
    this.playerService.died.subscribe(() => {
      // this.router.navigate(['/'])
    })
  }

  @HostListener('document:keydown', ['$event'])
  private onKeyPressed(event: any) {
    this.keyboardService.handleClick(event.code);
  }
}

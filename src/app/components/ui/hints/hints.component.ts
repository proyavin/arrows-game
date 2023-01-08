import {Component, OnInit} from '@angular/core';
import {PlayerService} from "../../../services/player.service";

@Component({
  selector: 'game-hints',
  templateUrl: './hints.component.html',
  styleUrls: ['./hints.component.scss']
})
export class HintsComponent implements OnInit {
  public hints: number[] = [];

  constructor(private readonly playerService: PlayerService) {
  }

  ngOnInit() {
  }

  addHint(value: number) {
    this.hints.push(value)
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {FightDirection} from "../../../keyboard.service";
import {CombinationItem} from "../../../fight.service";

@Component({
  selector: 'game-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss']
})
export class KeyComponent implements OnInit {
  @Input() item!: CombinationItem;

  public arrow: string = '';

  ngOnInit() {
    switch (this.item.direction) {
      case FightDirection.Up:
        this.arrow = '↑';
        break;
      case FightDirection.Down:
        this.arrow = '↓';
        break;
      case FightDirection.Left:
        this.arrow = '←';
        break;
      case FightDirection.Right:
        this.arrow = '→';
        break;
    }
  }
}

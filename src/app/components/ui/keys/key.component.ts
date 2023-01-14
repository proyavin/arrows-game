import {Component, Input, OnInit} from '@angular/core';
import {FightDirection} from "../../../services/keyboard.service";
import {CombinationItem} from "../../../services/fight.service";

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
        this.arrow = 'is--up';
        break;
      case FightDirection.Down:
        this.arrow = 'is--down';
        break;
      case FightDirection.Left:
        this.arrow = 'is--left';
        break;
      case FightDirection.Right:
        this.arrow = 'is--right';
        break;
    }
  }
}

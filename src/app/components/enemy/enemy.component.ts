import {Component, Input} from '@angular/core';
import {RoomEntity} from '../../services/dungeon.service';

@Component({
  selector: 'game-enemy',
  templateUrl: './enemy.component.html',
  styleUrls: ['./enemy.component.scss'],
})
export class EnemyComponent {
  @Input() enemy!: RoomEntity;
  constructor() {}
}

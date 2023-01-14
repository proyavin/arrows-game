import {Component, Input, OnInit} from '@angular/core';
import {Room, RoomEntity} from '../../services/dungeon.service';

@Component({
  selector: 'game-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.scss'],
})
export class EntitiesComponent implements OnInit {
  @Input() room!: Room;

  ngOnInit() {}
}

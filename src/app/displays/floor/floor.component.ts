import {Component, OnInit, ViewChild} from '@angular/core';
import {Combination, CombinationItem, FightService} from "../../fight.service";
import {PlayerService} from "../../services/player.service";
import {DungeonService, Room, RoomType} from "../../services/dungeon.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {HintsComponent} from "../../components/ui/hints/hints.component";

@Component({
  selector: 'game-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.scss']
})
export class FloorComponent implements OnInit {
  @ViewChild(HintsComponent) hints!: HintsComponent;

  public combination!: Combination;
  public LVL: number = 0;
  public rooms: Room[] = [];
  public currentRoom$ = new Subject<Room>();
  public currentRoom!: Room;
  public currentRoomIndex = 0;

  private readonly destroy$ = new Subject<void>();
  private readonly combinationDestroy$ = new Subject<void>();

  constructor(
    private readonly fightService: FightService,
    private readonly playerService: PlayerService,
    private readonly dungeonService: DungeonService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.resetAllState()
      this.LVL = parseInt(data["lvl"])
      this.rooms = this.dungeonService.generateFloor(this.LVL);
      this.playerService.initPlayer();

      this.currentRoom$.pipe(takeUntil(this.destroy$)).subscribe(
        this.onNewRoom.bind(this)
      )
      this.fightService.combination$.pipe(takeUntil(this.destroy$)).subscribe(
        this.onNewCombination.bind(this)
      )
      this.fightService.combinationComplete.pipe(takeUntil(this.destroy$)).subscribe(
        this.onCombinationComplete.bind(this)
      )
      this.fightService.combinationMiss.pipe(takeUntil(this.destroy$)).subscribe(
        this.onCombinationMiss.bind(this)
      )
      this.fightService.combinationTimerMiss.pipe(takeUntil(this.destroy$)).subscribe(
        this.onTimerMiss.bind(this)
      )

      this.loadNextRoom();
    })
  }

  private resetAllState(): void {
    this.destroy$.next();
    this.currentRoomIndex = 0;
    this.rooms = [];
  }

  private loadNextRoom() {
    this.combinationDestroy$.next();
    this.currentRoom$.next(this.rooms[this.currentRoomIndex]);
  }

  private loadNextFloor() {
    this.router.navigate([`floor/${this.LVL + 1}`])
  }

  private nextStep() {
    if (this.currentRoom.entities.length) {
      this.handleEnemyDestroy();
      this.currentRoom.entities.shift()

      if (this.currentRoom.entities.length) {
        this.fightService.newCombination(5)
      } else {
        this.move()
      }
    } else {
      this.move()
    }
  }

  private move() {
    // this.combination = [];
    if (this.rooms[this.currentRoomIndex + 1]) {
      this.currentRoomIndex++
      this.loadNextRoom()
    } else {
      this.loadNextFloor()
    }
  }

  private onNewRoom(data: Room): void {
    this.currentRoom = data;

    if (this.currentRoom.type === RoomType.Enemy && this.currentRoom.entities.length) {
      this.fightService.newCombination(5);
    } else if (this.currentRoom.type === RoomType.Chest) {
      this.fightService.newCombination(5, true, 4500);
    }
  }

  private onNewCombination(data: Combination): void {
    this.combination = data;
  }

  private onCombinationComplete(): void {
    setTimeout(() => {
      this.nextStep()
    }, 400)
  }

  private onCombinationMiss(): void {
    const currentEntity = this.currentRoom.entities[0]
    this.playerService.minusHP(currentEntity.obj.damage)
  }

  private onTimerMiss(): void {
    switch (this.currentRoom.type) {
      case RoomType.Chest:
        this.move();
        break;
    }
  }

  private handleEnemyDestroy(): void {
    switch (this.currentRoom.type) {
      case RoomType.Enemy:
        // @ts-ignore
        this.currentRoom.entities[0].hp -= 10

        // @ts-ignore
        if (this.currentRoom.entities[0].hp <= 0) {
          this.playerService.addExp(30);
        }
        break;
      case RoomType.Chest:
        console.log('killed chest')
        break;
    }
  }
}

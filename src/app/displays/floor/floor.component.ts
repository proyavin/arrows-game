// import {Component, OnInit, ViewChild} from '@angular/core';
// import {Combination, CombinationItem, FightService} from "../../fight.service";
// import {PlayerService} from "../../services/player.service";
// import {DungeonService, Room, RoomType} from "../../services/dungeon.service";
// import {ActivatedRoute, Router} from "@angular/router";
// import {Subject, takeUntil} from "rxjs";
// import {HintsComponent} from "../../components/ui/hints/hints.component";
// import {UtilsService} from "../../services/utils.service";
//
// @Component({
//   selector: 'game-floor',
//   templateUrl: './floor.component.html',
//   styleUrls: ['./floor.component.scss']
// })
// export class FloorComponent implements OnInit {
//   @ViewChild(HintsComponent) hints!: HintsComponent;
//
//   public combination!: Combination;
//   public LVL: number = 0;
//   public rooms: Room[] = [];
//   public currentRoom$ = new Subject<Room>();
//   public currentRoom!: Room;
//   public currentRoomIndex = 0;
//
//   private readonly destroy$ = new Subject<void>();
//   private readonly combinationDestroy$ = new Subject<void>();
//
//   constructor(
//     private readonly fightService: FightService,
//     private readonly playerService: PlayerService,
//     private readonly dungeonService: DungeonService,
//     private readonly route: ActivatedRoute,
//     private readonly router: Router,
//     private readonly utilsService: UtilsService
//   ) {}
//
//   ngOnInit() {
//     this.route.params.subscribe(data => {
//       this.resetAllState()
//       this.LVL = parseInt(data["lvl"])
//       this.rooms = this.dungeonService.generateFloor(this.LVL);
//       this.playerService.initPlayer();
//
//       this.currentRoom$.pipe(takeUntil(this.destroy$)).subscribe(
//         this.onNewRoom.bind(this)
//       )
//       // this.fightService.combination$.pipe(takeUntil(this.destroy$)).subscribe(
//       //   this.onNewCombination.bind(this)
//       // )
//       // this.fightService.combinationComplete.pipe(takeUntil(this.destroy$)).subscribe(
//       //   this.onCombinationComplete.bind(this)
//       // )
//       // this.fightService.combinationMiss.pipe(takeUntil(this.destroy$)).subscribe(
//       //   this.onCombinationMiss.bind(this)
//       // )
//       // this.fightService.combinationTimerMiss.pipe(takeUntil(this.destroy$)).subscribe(
//       //   this.onTimerMiss.bind(this)
//       // )
//
//       this.fightService.combination$.pipe(takeUntil(this.destroy$)).subscribe(data => {
//         this.combination = data;
//         this.utilsService.log('COMBINATION', data.new ? 'NEW' : 'OLD')
//       })
//       this.fightService.combinationComplete.pipe(takeUntil(this.destroy$)).subscribe(data => {
//         this.utilsService.log('COMBINATION', 'COMPLETE')
//       })
//       this.fightService.combinationMiss.pipe(takeUntil(this.destroy$)).subscribe(data => {
//         this.utilsService.log('COMBINATION', 'COMBINATION MISS')
//       })
//       this.fightService.combinationTimerMiss.pipe(takeUntil(this.destroy$)).subscribe(data => {
//         this.utilsService.log('COMBINATION', 'TIMER MISS')
//       })
//
//       this.loadNextRoom();
//     })
//   }
//
//   private resetAllState(): void {
//     this.destroy$.next();
//     this.currentRoomIndex = 0;
//     this.rooms = [];
//   }
//
//   private loadNextRoom() {
//     this.combinationDestroy$.next();
//     this.currentRoom$.next(this.rooms[this.currentRoomIndex]);
//   }
//
//   private loadNextFloor() {
//     this.router.navigate([`floor/${this.LVL + 1}`])
//   }
//
//   private nextStep() {
//     if (this.currentRoom.entities.length) {
//       this.handleEnemyDestroy();
//       this.currentRoom.entities.shift()
//
//       if (this.currentRoom.entities.length) {
//         this.fightService.newCombination(5)
//       } else {
//         this.move()
//       }
//     } else {
//       this.move()
//     }
//   }
//
//   private move() {
//     // this.combination = [];
//     if (this.rooms[this.currentRoomIndex + 1]) {
//       this.currentRoomIndex++
//       this.loadNextRoom()
//     } else {
//       this.loadNextFloor()
//     }
//   }
//
//   private onNewRoom(data: Room): void {
//     this.currentRoom = data;
//
//     if (this.currentRoom.type === RoomType.Enemy && this.currentRoom.entities.length) {
//       this.fightService.newCombination(5);
//     } else if (this.currentRoom.type === RoomType.Chest) {
//       this.fightService.newCombination(5, true, 4500);
//     }
//   }
//
//   private onNewCombination(data: Combination): void {
//     this.combination = data;
//   }
//
//   private onCombinationComplete(): void {
//     setTimeout(() => {
//       this.nextStep()
//     }, 400)
//   }
//
//   private onCombinationMiss(): void {
//     const currentEntity = this.currentRoom.entities[0]
//     this.playerService.minusHP(currentEntity.obj.damage)
//   }
//
//   private onTimerMiss(): void {
//     switch (this.currentRoom.type) {
//       case RoomType.Chest:
//         this.move();
//         break;
//     }
//   }
//
//   private handleEnemyDestroy(): void {
//     switch (this.currentRoom.type) {
//       case RoomType.Enemy:
//         // @ts-ignore
//         this.currentRoom.entities[0].hp -= 10
//
//         // @ts-ignore
//         if (this.currentRoom.entities[0].hp <= 0) {
//           this.playerService.addExp(30);
//         }
//         break;
//       case RoomType.Chest:
//         console.log('killed chest')
//         break;
//     }
//   }
// }

import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FightService} from "../../fight.service";
import {PlayerService} from "../../services/player.service";
import {DungeonService, Room, RoomType} from "../../services/dungeon.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {HintsComponent} from "../../components/ui/hints/hints.component";
import {UtilsService} from "../../services/utils.service";

@Component({
  selector: 'game-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloorComponent implements OnInit {
  @ViewChild(HintsComponent) hints!: HintsComponent;

  public floorClasses: string[] = [];
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
    private readonly router: Router,
    private readonly utilsService: UtilsService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.resetAllState();
      this.LVL = parseInt(data["lvl"])
      this.rooms = this.dungeonService.generateFloor(this.LVL);
      this.playerService.initPlayer();

      this.currentRoom$.pipe(takeUntil(this.destroy$)).subscribe(
        this.onNewRoom.bind(this)
      )
      this.fightService.combination$.pipe(takeUntil(this.destroy$)).subscribe(data => {
        this.utilsService.log('COMBINATION', data.new ? 'NEW' : 'OLD')
      })
      this.fightService.combinationComplete.pipe(takeUntil(this.destroy$)).subscribe(data => {
        if (data) {
          this.handleHint();
        } else {
          this.utilsService.log('COMBINATION', 'COMPLETE FAIL')
          this.takeDamage();
        }
      })
      this.fightService.combinationMiss.pipe(takeUntil(this.destroy$)).subscribe(data => {
        this.utilsService.log('COMBINATION', 'COMBINATION MISS')
        this.handleMiss();
      })
      this.fightService.combinationTimerMiss.pipe(takeUntil(this.destroy$)).subscribe(data => {
        this.utilsService.log('COMBINATION', 'TIMER MISS')
      })

      this.loadRoom();
      this.makeFloorClasses();
    })
  }

  private resetAllState() {
    this.destroy$.next();
    this.currentRoomIndex = 0;
    this.rooms = [];
  }

  private onNewRoom(data: Room): void {
    console.log('on new room ===========')
    console.log(data)
    console.log('=======================')
    this.currentRoom = data;
    this.nextCombination(5, 0)
    this.cdr.detectChanges()
  }

  private loadNextRoom() {
    this.currentRoomIndex++;
    this.loadRoom();
    this.cdr.detectChanges()
  }

  private loadNextFloor() {
    this.router.navigate([`floor/${this.LVL + 1}`])
  }

  private loadRoom() {
    this.currentRoom$.next(this.rooms[this.currentRoomIndex]);
  }

  /**
   * Что делать если не успел ввести комбинацию
   * @private
   */
  private handleTimerMiss() {
    switch (this.currentRoom.type) {
      case RoomType.Enemy:
        this.takeDamage();
        break;
      case RoomType.Chest:
        //
        break;
    }
  }

  /**
   * Что делать если промахнулся в комбинации
   * @private
   */
  private handleMiss() {
    switch (this.currentRoom.type) {
      case RoomType.Enemy:
        this.playerService.handleDamage(this.currentRoom.entities[0], null, null)
        break;
      case RoomType.Chest:
        //
        break;
    }
  }

  /**
   * Что делать если успешная комбинация
   * @private
   */
  private handleHint() {
    switch (this.currentRoom.type) {
      case RoomType.Enemy:
        this.hitEnemy();
        break;
      case RoomType.Chest:
        //
        break;
    }
  }

  /**
   * Ударить по врагу
   * @private
   */
  private hitEnemy() {
    this.playerService.handleHit(
      this.currentRoom.entities[0],
      () => {

      },
      () => {
        this.currentRoom.entities.shift()
      }
    );

    if (this.currentRoom.entities.length) {
      this.nextCombination(5);
    } else {
      this.fightService.removeCombination();
      this.move();
    }
  }

  /**
   * Получить урон от врага
   * @private
   */
  private takeDamage() {
    this.playerService.handleDamage(this.currentRoom.entities[0], null, null)
    if (this.currentRoom.entities.length) {
      this.nextCombination(5);
    } else {
      this.fightService.removeCombination();
    }
  }

  /**
   * Идти дальше(этаж или комната)
   * @private
   */
  private move() {
    if (this.rooms[this.currentRoomIndex + 1]) {
      this.loadNextRoom();
    } else {
      this.loadNextFloor()
    }
  }

  private nextCombination(length: number, delay: number = 1400) {
    console.log('NEW COMBINATION START', delay)
    // const to = setTimeout(() => {
    //   clearTimeout(to)
    //   this.fightService.newCombination(length)
    //   console.log('NEW COMBINATION COMPLETE')
    // }, delay)
    this.fightService.newCombination(length)
  }

  private makeFloorClasses() {
    let cl = 'is--lvl1';
    if (this.LVL >= 15) {
      cl = 'is--lvl2';
    }
    if (this.LVL >= 30) {
      cl = 'is--lvl3';
    }

    this.floorClasses.push(cl)
  }
}

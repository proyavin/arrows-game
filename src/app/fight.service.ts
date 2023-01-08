import { Injectable } from '@angular/core';
import {FightDirection, KeyboardService} from "./keyboard.service";
import {UtilsService} from "./services/utils.service";
import {Subject, takeUntil} from "rxjs";
import {gsap} from "gsap";

export type CombinationItem = {
  direction: FightDirection;
  hinted: boolean;
}

export type Combination = {
  items: CombinationItem[];
  time: number;
  new: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FightService {
  combination!: Combination;
  combination$ = new Subject<Combination>()
  combinationMiss = new Subject<void>()
  combinationComplete = new Subject<void>()
  combinationTimer = new Subject<number>()
  combinationTimerMiss = new Subject<void>()

  index = 0;

  private animation: any;

  constructor(
    private readonly utilsService: UtilsService,
    private readonly keyboardService: KeyboardService,
  ) {}

  newCombination(length: number, oneAttemptMode: boolean = false, time: number = 3000) {
    this.index = 0;
    this.combination = this.generateCombination(length, time);
    const destroy$ = new Subject();
    const value = {width: 100}

    if (this.animation) {
      this.animation.kill();
    }

    this.animation = gsap.to(value, {
      ease: 'linear',
      width: 0,
      duration: time / 1000,
      onUpdate: () => {
        this.combinationTimer.next(value.width)
      },
      onComplete: () => {
        this.combinationTimerMiss.next();
      }
    })
    this.animation.play()

    this.keyboardService.fightKey.pipe(takeUntil(destroy$)).subscribe(data => {
      if (this.combination.items[this.index].direction === data) {
        this.combination.items[this.index].hinted = true
        this.index++
      } else {
        this.missCombination();
      }

      if (oneAttemptMode) {
        if (this.index === length) {
          destroy$.next(true)
          destroy$.complete()
          this.combinationComplete.next();
        }
      } else {
        this.combination$.next(this.combination)
        if (this.index === length) {
          destroy$.next(true)
          destroy$.complete()
          this.combinationComplete.next();
        }
      }
    })
    this.combination$.next(this.combination)
  }

  private generateCombination(length: number, time: number): Combination {
    let combination: Combination = {
      items: [],
      time,
      new: true
    };

    for(let i = 0; i < length; i++) {
      const number = this.utilsService.randomInt(0, 3);
      combination.items.push({
        direction: number,
        hinted: false
      })
    }

    return combination
  }

  private clearCombination(): Combination {
    return this.combination = {
      ...this.combination,
      new: false,
      items: this.combination.items.map(item => {
        return {
          ...item,
          hinted: false
        }
      })
    }
  }

  public missCombination() {
    this.combination = this.clearCombination()
    this.index = 0
    this.combinationMiss.next();
  }
}

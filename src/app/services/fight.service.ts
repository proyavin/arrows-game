import {Injectable} from '@angular/core';
import {FightDirection, KeyboardService} from './keyboard.service';
import {UtilsService} from './utils.service';
import {Observable, ReplaySubject, Subject, takeUntil} from 'rxjs';
import {gsap} from 'gsap';
import {State, StateService} from './state.service';

export enum CombinationItemType {
  Default,
}

export type CombinationItem = {
  direction: FightDirection;
  hinted: boolean;
  type: CombinationItemType;
};

export type Combination = {
  items: CombinationItem[];
  time: number;
  new: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class FightService {
  combination!: Combination;
  combination$ = new ReplaySubject<Combination>();
  combinationUpdate = new Subject<Combination>();
  combinationMiss = new Subject<void>();
  combinationComplete = new Subject<boolean>();
  combinationTimer = new Subject<number>();
  combinationTimerMiss = new Subject<void>();
  combinationRemoved = new Subject<void>();

  index = 0;

  private animation: any;

  constructor(
    private readonly utilsService: UtilsService,
    private readonly keyboardService: KeyboardService,
    private readonly stateService: StateService,
  ) {}

  newCombination(length: number, time: number = 3000) {
    this.index = 0;
    this.combination = this.generateCombination(length, time);
    const destroy$ = new Subject<void>();

    this.playAnimation(time)
      .pipe(takeUntil(destroy$))
      .subscribe(() => {
        this.combinationTimerMiss.next();
        this.completeCombination(false, destroy$);
      });

    this.keyboardService.fightKey.pipe(takeUntil(destroy$)).subscribe(data => {
      if (this.index + 1 > this.combination.items.length) return;
      if (this.stateService.state === State.Pause) return;

      this.combination.new = false;
      if (this.combination.items[this.index].direction === data) {
        this.hint();
      } else {
        this.missHint();
      }

      this.combination$.next(this.combination);
      if (this.index >= length) this.completeCombination(true, destroy$);
    });

    this.combination$.next(this.combination);
  }

  private generateCombination(length: number, time: number): Combination {
    let combination: Combination = {
      items: [],
      time,
      new: true,
    };

    for (let i = 0; i < length; i++) {
      const number = this.utilsService.randomInt(0, 3);
      combination.items.push({
        direction: number,
        hinted: false,
        type: CombinationItemType.Default,
      });
    }

    return combination;
  }

  private clearCombination(): Combination {
    return (this.combination = {
      ...this.combination,
      new: false,
      items: this.combination.items.map(item => {
        return {
          ...item,
          hinted: false,
        };
      }),
    });
  }

  public removeCombination() {
    this.combinationRemoved.next();
  }

  private playAnimation(time: number) {
    const value = {width: 100};

    return new Observable(subscriber => {
      this.checkAndRemoveAnimation();
      const to = setTimeout(() => {
        clearTimeout(to);
        this.animation = gsap.to(value, {
          ease: 'linear',
          width: 0,
          duration: time / 1000,
          onUpdate: () => {
            this.combinationTimer.next(value.width);
          },
          onComplete: () => {
            subscriber.next();
            subscriber.complete();
          },
        });
        this.animation.play();
      }, 0);
    });
  }

  private checkAndRemoveAnimation() {
    if (!this.animation) return;

    this.animation.pause();
    this.animation.kill();
    this.animation = null;
  }

  private missHint() {
    this.combination = this.clearCombination();
    this.index = 0;
    this.combinationMiss.next();
  }

  private hint() {
    this.combination.items[this.index].hinted = true;
    this.index++;
  }

  private completeCombination(value: boolean, destroyer$: Subject<void>) {
    this.combinationComplete.next(value);
    this.checkAndRemoveAnimation();
    destroyer$.next();
    destroyer$.complete();
  }

  public resume() {
    if (this.animation) {
      this.animation.play();
    }
  }

  public pause() {
    console.log('pause', this.animation)
    if (this.animation) {
      this.animation.pause();
    }
  }
}

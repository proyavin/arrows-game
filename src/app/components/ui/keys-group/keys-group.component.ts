import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Combination, FightService} from "../../../fight.service";

@Component({
  selector: 'game-keys-group',
  templateUrl: './keys-group.component.html',
  styleUrls: ['./keys-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeysGroupComponent implements OnInit {
  combination: Combination | null = null;

  public anime: any;
  public width = 100;

  constructor(private readonly fightService: FightService, private readonly cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.fightService.combination$.subscribe(data => {
      this.combination = data;
      console.log(77, this.combination)
      this.cdr.detectChanges()
    })
    this.fightService.combinationTimer.subscribe(
      this.onCombinationTimer.bind(this)
    )
    this.fightService.combinationRemoved.subscribe(() => {
      this.combination = null;
      this.cdr.detectChanges();
    })
  }

  onCombinationTimer(width: number) {
    this.width = width;
    this.cdr.detectChanges()
  }
}

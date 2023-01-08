import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Combination, FightService} from "../../../fight.service";
import {gsap} from "gsap";

@Component({
  selector: 'game-keys-group',
  templateUrl: './keys-group.component.html',
  styleUrls: ['./keys-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeysGroupComponent implements OnInit {
  @Input() combination!: Combination;

  public anime: any;
  public width = 100;

  constructor(private readonly fightService: FightService, private readonly cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.fightService.combinationTimer.subscribe(
      this.onCombinationTimer.bind(this)
    )
  }

  onCombinationTimer(width: number) {
    this.width = width;
    this.cdr.detectChanges()
  }
}

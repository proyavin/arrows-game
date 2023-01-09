import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {PlayerService, PlayerStats} from "../../../services/player.service";

@Component({
  selector: 'game-player-bar',
  templateUrl: './player-bar.component.html',
  styleUrls: ['./player-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerBarComponent implements OnInit {
  public percentHP = 0;
  public percentExp = 0;
  public stats: PlayerStats | null = null;
  constructor(private readonly playerService: PlayerService, private readonly cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.playerService.playerStats.subscribe(data => {
      this.stats = data;
      this.percentHP = this.stats.currentHP / this.stats.maxHP * 100
      this.percentExp = this.stats?.currentExp / this.stats?.nextLevelExp * 100
      console.log(this.stats)
      this.cdr.detectChanges()
    })
  }
}

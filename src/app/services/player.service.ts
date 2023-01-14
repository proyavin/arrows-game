import {Injectable} from '@angular/core';
import {ReplaySubject, Subject} from 'rxjs';
import {RoomEntity} from './dungeon.service';
import {Enemy} from '../db/enemies';
import {UtilsService} from './utils.service';

export type PlayerStats = {
  maxHP: number;
  currentHP: number;
  nextLevelExp: number;
  currentExp: number;
  lvl: number;
  damage: number;
};

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private playerStat: PlayerStats = {
    maxHP: 100,
    currentHP: 100,
    nextLevelExp: 50,
    currentExp: 0,
    lvl: 1,
    damage: 10,
  };
  public playerStats = new ReplaySubject<PlayerStats>();
  public died = new Subject<void>();

  constructor(private readonly utilsService: UtilsService) {}

  public initPlayer() {
    this.updatePlayerStats();
  }

  public minusHP(enemy: Enemy): void {
    const percent =
      this.playerStat.currentHP -
      this.utilsService.mathPlayerDamage(this.playerStat, enemy);
    this.playerStat.currentHP = percent <= 0 ? 0 : percent;

    if (this.playerStat.currentHP <= 0) {
      this.died.next();
    }

    this.updatePlayerStats();
  }

  public addExp(exp: number): void {
    this.playerStat.currentExp += exp;

    if (this.playerStat.currentExp >= this.playerStat.nextLevelExp) {
      this.playerStat.lvl++;
      this.playerStat.currentExp =
        this.playerStat.currentExp - this.playerStat.nextLevelExp;
      this.playerStat.nextLevelExp = this.playerStat.lvl * 50;
    }

    this.updatePlayerStats();
  }

  private updatePlayerStats() {
    this.playerStats.next(this.playerStat);
  }

  public handleHit(enemy: RoomEntity, onAlive: any, onDied: any) {
    // @ts-ignore
    enemy.hp -= this.utilsService.mathHintDamage(this.playerStat, enemy);

    // @ts-ignore
    if (enemy.hp <= 0) {
      this.addExp(this.utilsService.mathPlayerExp(this.playerStat, enemy.obj));

      if (typeof onDied === 'function') {
        onDied();
      }
    } else {
      if (typeof onAlive === 'function') {
        onAlive();
      }
    }
  }

  public handleDamage(enemy: RoomEntity, onAlive: any, onDied: any) {
    this.minusHP(enemy.obj);
  }
}

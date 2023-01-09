import {Injectable} from "@angular/core";
import {ReplaySubject, Subject} from "rxjs";
import {RoomEntity} from "./dungeon.service";

export type PlayerStats = {
  maxHP: number;
  currentHP: number;
  nextLevelExp: number;
  currentExp: number;
  lvl: number;
  damage: number;
}

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private maxHP = 100;
  private currentHP = this.maxHP;
  private nextLevelExp = 50;
  private currentExp = 0;
  private lvl = 1;
  public playerStats = new ReplaySubject<PlayerStats>()
  public died = new Subject<void>()

  public initPlayer() {
    this.updatePlayerStats();
  }

  public minusHP(hp: number): void {
    const percent = this.currentHP - hp
    this.currentHP = percent <= 0 ? 0 : percent;

    if (this.currentHP <= 0) {
      this.died.next();
    }

    this.updatePlayerStats();
  }

  public addExp(exp: number): void {
    this.currentExp += exp;

    if (this.currentExp >= this.nextLevelExp) {
      this.lvl++;
      this.currentExp = this.currentExp - this.nextLevelExp;
      this.nextLevelExp = this.lvl * 50
    }

    this.updatePlayerStats();
  }

  private updatePlayerStats() {
    this.playerStats.next({
      maxHP: this.maxHP,
      currentHP: this.currentHP,
      lvl: this.lvl,
      nextLevelExp: this.nextLevelExp,
      currentExp: this.currentExp,
      damage: 10,
    })
  }

  public handleHit(enemy: RoomEntity, onAlive: any, onDied: any) {
    // TODO FIX
    // @ts-ignore
    enemy.hp -= 10

    // @ts-ignore
    if (enemy.hp <= 0) {
      this.addExp(30);

      if (typeof onDied === "function") {
        onDied()
      }
    } else {
      if (typeof onAlive === "function") {
        onAlive()
      }
    }
  }

  public handleDamage(enemy: RoomEntity, onAlive: any, onDied: any) {
    this.minusHP(enemy.obj.damage)
  }
}

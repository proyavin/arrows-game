import {Injectable} from '@angular/core';
import {PlayerStats} from './player.service';
import enemies, {Enemy} from '../db/enemies';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  randomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  log(level: string, msg: string) {
    // console.log(level, msg)
  }

  mathPlayerDamage(player: PlayerStats, enemy: Enemy) {
    return Math.round(enemy.damage);
  }

  mathHintDamage(player: PlayerStats, enemy: Enemy) {
    return player.damage;
  }

  mathPlayerExp(player: PlayerStats, enemy: Enemy) {
    return enemy.exp;
  }
}

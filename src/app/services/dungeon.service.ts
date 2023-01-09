import {Injectable} from "@angular/core";
import {UtilsService} from "./utils.service";
import DB from "../db";

export const DEFAULT_MIN_ROOMS = 3;
export const DEFAULT_MAX_ROOMS = 6;
export const CHEST_CHANCE = 10;
export const ENEMY_CHANCE = 90;

export enum RoomType {
  Enemy,
  Chest
}

export type RoomEntity = {
  obj: any;
  hp?: number;
}

export type Room = {
  type: RoomType;
  entities: RoomEntity[];
}

@Injectable({
  providedIn: 'root'
})
export class DungeonService {

  constructor(private readonly utilsService: UtilsService) {
  }

  public generateFloor(floor: number): Room[] {
    console.log(floor)
    const rooms: Room[] = [];
    const minRooms = DEFAULT_MIN_ROOMS + floor;
    const maxRooms = DEFAULT_MAX_ROOMS + floor;
    const finalRoomsCount = this.utilsService.randomInt(minRooms, maxRooms);

    for(let i = 0; i < finalRoomsCount; i++) {
      rooms.push({
        type: RoomType.Enemy,
        entities: this.generateEnemyRoom(floor)
      })
    }

    // rooms.push({
    //   type: RoomType.Chest,
    //   entities: this.generateChestRoom()
    // })
    // rooms.push({
    //   type: RoomType.Enemy,
    //   entities: this.generateEnemyRoom(1)
    // })

    return rooms;
  }

  private generateChestRoom(): RoomEntity[] {
    const enemies: RoomEntity[] = [{
      obj: [DB.Rings[0], DB.Rings[1]]
    }];

    return enemies;
  }

  private generateEnemyRoom(floor: number): RoomEntity[] {
    const enemies: RoomEntity[] = [];
    const enemiesCount = this.utilsService.randomInt(1, 3);
    const availableEnemies = DB.Enemies.filter(enemy => {
      return floor >= enemy.minFloor && floor <= enemy.maxFloor
    })

    for(let i = 0; i < enemiesCount; i++) {
      const enemyIndex = this.utilsService.randomInt(0, availableEnemies.length - 1)
      const entity = availableEnemies[enemyIndex]

      enemies.push({
        obj: entity,
        hp: entity.hp
      })
    }

    return enemies;
  }
}

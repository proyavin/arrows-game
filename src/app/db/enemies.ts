export enum EnemyCode {
  SLIME,
  SKELETON,
  DRAGON,
}

export type Enemy = {
  code: EnemyCode;
  title: string;
  hp: number;
  damage: number;
  minFloor: number;
  maxFloor: number;
  exp: number;
  chanse?: number; // шанс появления
};

const items: Enemy[] = [
  {
    code: EnemyCode.SLIME,
    title: 'Slime',
    hp: 5,
    damage: 1,
    minFloor: 1,
    maxFloor: 3,
    exp: 10,
  },
  {
    code: EnemyCode.SKELETON,
    title: 'Skeleton',
    hp: 10,
    damage: 5,
    minFloor: 3,
    maxFloor: 10,
    exp: 20,
  },
  {
    code: EnemyCode.DRAGON,
    title: 'Dragon',
    hp: 15,
    damage: 30,
    minFloor: 10,
    maxFloor: 350,
    exp: 30,
  },
];

export default items;

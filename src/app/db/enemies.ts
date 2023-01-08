export type Enemy = {
  title: string;
  hp: number;
  damage: number;
  minFloor: number;
  maxFloor: number;
}

const items: Enemy[] = [
  {
    title: 'Slime',
    hp: 5,
    damage: 1,
    minFloor: 1,
    maxFloor: 3
  },
  {
    title: 'Skeleton',
    hp: 10,
    damage: 5,
    minFloor: 3,
    maxFloor: 10
  },
  {
    title: 'Dragon',
    hp: 15,
    damage: 30,
    minFloor: 10,
    maxFloor: 30
  }
]

export default items;

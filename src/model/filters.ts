// not a component

class AxieFilters {
  //constructor
  id: string;
  name: string;
  classes: [];
  parts: [];
  breed: [number, number];
  health: [number, number];
  speed: [number, number];
  skill: [number, number];
  morale: [number, number];

  constructor(
    name: string,
    classes: [],
    parts: [],
    breed: [number, number],
    health: [number, number],
    speed: [number, number],
    skill: [number, number],
    morale: [number, number]
  ) {
    this.id = new Date().toISOString();
    this.name = name;
    this.classes = classes;
    this.parts = parts;
    this.breed = breed;
    this.health = health;
    this.speed = speed;
    this.skill = skill;
    this.morale = morale;
  }
}

export default AxieFilters;

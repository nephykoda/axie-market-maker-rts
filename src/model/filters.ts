import { AxieParts } from "../components/FilterSetup";

class AxieFilters {
  //constructor
  id?: string;
  name?: string;
  classes?: [];
  parts: AxieParts[] | undefined;
  breed?: [number, number] | [];
  health?: [number, number] | [];
  speed?: [number, number] | [];
  skill?: [number, number] | [];
  morale?: [number, number] | [];

  constructor(
    name: string | undefined,
    classes: [] | undefined,
    parts: AxieParts[] | undefined,
    breed: [number, number] | undefined | [],
    health: [number, number] | undefined | [],
    speed: [number, number] | undefined | [],
    skill: [number, number] | undefined | [],
    morale: [number, number] | undefined | []
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

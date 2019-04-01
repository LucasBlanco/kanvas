import { Builder } from "./Builder";

export class PersonM {
  constructor(public name: string, public id: number) {}
}

export class PersonBuilder extends Builder {
  new = (id: number) => new PersonM("", id);
  addNewItem(persons: PersonM[]): PersonM[] {
    return super.addNewItem(persons);
  }
}

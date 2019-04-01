import { getNextId } from "../helpers/finder";

type WithId = {
  id: number;
};

export abstract class Builder {
  abstract new(id: number, args?: any): any;

  addNewItem(elems: WithId[]) {
    return [...elems, this.new(getNextId(elems))];
  }
}

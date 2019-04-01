import { BoardM, BoardBuilder } from "./board-model";
import { PersonM } from "./person-model";
import { Builder } from "./Builder";

export class ProjectM {
  constructor(
    public name: string,
    public board: BoardM,
    public participants: PersonM[],
    public id: number
  ) {}
}

export class ProjectBuilder extends Builder {
  constructor() {
    super();
  }
  new = (id: number) => new ProjectM("", new BoardBuilder().new(id), [], id);
  addNewItem(projects: ProjectM[]): ProjectM[] {
    return super.addNewItem(projects);
  }
}

import { ProjectM, ProjectBuilder } from "./project-model";
import { PersonM } from "./person-model";
import { Builder } from "./Builder";
import { getNextId, changeElem } from "../helpers/finder";
import { ColumnBuilder } from "./column-model";
export class OrganisationM {
  columnBuilder = new ColumnBuilder();
  constructor(
    public name: string,
    public employees: PersonM[],
    public projects: ProjectM[],
    public id: number
  ) {}

  addNewProject = () => {
    this.projects = new ProjectBuilder().addNewItem(this.projects);
    const newProject = this.projects.pop();
    let columnFront = this.columnBuilder.new(1);
    columnFront.title = "Front";
    let columnBack = this.columnBuilder.new(2);
    columnBack.title = "Back";
    let columnDone = this.columnBuilder.new(3);
    columnDone.title = "Done";
    if (newProject) {
      newProject.board.columns = [columnFront, columnBack, columnDone];
      this.projects = [...this.projects, newProject];
    }
    return this;
  };

  editProject(project: ProjectM): OrganisationM {
    this.projects = changeElem(this.projects, project);
    return this;
  }

  deleteProject(project: ProjectM): OrganisationM {
    this.projects = this.projects.filter(p => p.id !== project.id);
    return this;
  }
}

export class OrganisationBuilder extends Builder {
  new = (id: number) => new OrganisationM("", [], [], id);
  addNewItem(organisations: OrganisationM[]): OrganisationM[] {
    return super.addNewItem(organisations);
  }
}

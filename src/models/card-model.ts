import { Builder } from "./Builder";
import { ColumnM } from "./column-model";
import { BoardM } from "./board-model";
import { boardReducer } from "../board/board-reducer";

export type IDependency = {
  column: ColumnM;
  card: CardM;
};

export class CardM {
  public get dependencies(): IDependency[] {
    return this._dependencies;
  }
  public set dependencies(value: IDependency[]) {
    this._dependencies = value;
  }
  public get id(): number {
    return this._id;
  }
  public set id(value: number) {
    this._id = value;
  }
  public get text(): string {
    return this._text;
  }
  public set text(value: string) {
    this._text = value;
  }
  public get title(): string {
    return this._title;
  }
  public set title(value: string) {
    this._title = value;
  }

  constructor(
    private _title: string,
    private _text: string,
    private _dependencies: IDependency[],
    private _id: number
  ) {}

  isBlocked(): boolean {
    return this.dependencies.some(dep => !dep.column.isDone());
  }
  isBlockedBy(): IDependency[] {
    return this.dependencies.filter(dep => !dep.column.isDone());
  }
  isBlockedByCard(card: CardM): boolean {
    return this.isBlockedBy().some(dep => dep.card.id === card.id);
  }
}

export class CardBuilder extends Builder {
  new = (id: number, board: BoardM) => new CardM("", "", [], id);

  addNewItem(cards: (CardM)[]): CardM[] {
    return super.addNewItem(cards);
  }
}

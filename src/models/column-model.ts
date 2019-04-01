import { CardM, CardBuilder } from "./card-model";
import { Builder } from "./Builder";
import { changeElem, removeById } from "../helpers/finder";
import { BoardM } from "./board-model";

export class ColumnM {
  public get id(): number {
    return this._id;
  }
  public set id(value: number) {
    this._id = value;
  }
  public get cards(): CardM[] {
    return this._cards;
  }
  public set cards(value: CardM[]) {
    this._cards = value;
  }
  public get title(): string {
    return this._title;
  }
  public set title(value: string) {
    this._title = value;
  }
  constructor(
    private _title: string,
    private _cards: CardM[],
    private _id: number
  ) {}

  addNewCard(id: number, board: BoardM): ColumnM {
    this.cards = [...this.cards, new CardBuilder().new(id, board)];
    return this;
  }

  addCard(card: CardM) {
    this.cards = [...this.cards, card];
    return this;
  }

  editCard(card: CardM): ColumnM {
    this.cards = changeElem(this.cards, card);
    return this;
  }

  deleteCard(card: CardM): ColumnM {
    this.cards = removeById(this.cards, card.id);
    return this;
  }

  isDone(): boolean {
    return this.title === "Done";
  }
}

export class ColumnBuilder extends Builder {
  new = (id: number) => new ColumnM("", [], id);
  addNewItem(columns: ColumnM[]): ColumnM[] {
    return super.addNewItem(columns);
  }
}

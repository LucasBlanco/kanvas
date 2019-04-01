import { ColumnM, ColumnBuilder } from "./column-model";
import { Builder } from "./Builder";
import { removeById, changeElem, getNextId } from "../helpers/finder";
import { CardM, IDependency } from "./card-model";
import { Card } from "antd";

export class BoardM {
  public get columns(): ColumnM[] {
    return this._columns;
  }
  public set columns(value: ColumnM[]) {
    this._columns = value;
  }
  public get id(): number {
    return this._id;
  }
  public set id(value: number) {
    this._id = value;
  }
  constructor(
    private _columns: ColumnM[],
    private _id: number,
    private boardBuilder = new BoardBuilder()
  ) {}

  addNewColumn(): BoardM {
    this.columns = new ColumnBuilder().addNewItem(this.columns);
    return this.boardBuilder.copy(this);
  }

  deleteColumn(column: ColumnM): BoardM {
    column.cards.forEach(card => this.deleteCard(column, card));
    this.columns = removeById(this.columns, column.id);
    return this.boardBuilder.copy(this);
  }

  deleteCard(column: ColumnM, card: CardM) {
    const board = this.editColumn(column.deleteCard(card));
    board.columns.forEach(column => {
      column.cards.forEach(_card => {
        _card.dependencies = _card.dependencies.filter(dep => {
          return dep.card.id !== card.id;
        });
      });
    });
    return this.boardBuilder.copy(board);
  }

  editCard(column: ColumnM, card: CardM) {
    const board = this.editColumn(column.editCard(card));
    board.columns.forEach(column => {
      column.cards.forEach(_card => {
        _card.dependencies = _card.dependencies.map(dep => {
          return dep.card.id === card.id ? { column, card } : dep;
        });
      });
    });
    return this.boardBuilder.copy(board);
  }

  editColumn(modifiedColumn: ColumnM): BoardM {
    this.columns = changeElem(this.columns, modifiedColumn);
    this.columns.forEach(column => {
      column.cards.forEach(_card => {
        _card.dependencies = _card.dependencies.map(dep => {
          return dep.column.id === modifiedColumn.id
            ? { column: modifiedColumn, card: dep.card }
            : dep;
        });
      });
    });
    return this.boardBuilder.copy(this);
  }

  addNewCard(column: ColumnM): BoardM {
    const cards = this.columns.flatMap(c => c.cards);
    column.addNewCard(getNextId(cards), this);
    return this.boardBuilder.copy(this);
  }

  moveCard(columnFrom: ColumnM, columnTo: ColumnM, card: CardM) {
    const board = this.editColumn(columnFrom.deleteCard(card)).editColumn(
      columnTo.addCard(card)
    );
    board.columns.forEach(column => {
      column.cards.forEach(_card => {
        _card.dependencies.forEach(dep => {
          if (dep.card.id === card.id && dep.column.id === columnFrom.id) {
            dep.column = columnTo;
          }
        });
      });
    });
    return this.boardBuilder.copy(board);
  }

  isBlocking(card: CardM): IDependency[] {
    const doneColumn = this.columns.find(c => c.isDone());
    if (doneColumn && doneColumn.cards.includes(card)) {
      return [];
    }
    const algo = this.columns
      .flatMap(column => column.cards.map(card => ({ column, card })))
      .filter(dep => dep.card.isBlockedByCard(card));
    return algo;
  }
}

export class BoardBuilder extends Builder {
  new = (id: number) => new BoardM([], id);
  addNewItem(boards: BoardM[]): BoardM[] {
    return super.addNewItem(boards);
  }
  copy = (board: BoardM) => new BoardM(board.columns, board.id);
}

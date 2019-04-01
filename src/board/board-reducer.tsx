import { BoardM } from "../models/board-model";

type IAction = {
  type:
    | "addColumn"
    | "editColumn"
    | "removeColumn"
    | "addCard"
    | "editCard"
    | "removeCard"
    | "moveCardUp"
    | "moveCardDown"
    | "moveCardToColumn"
    | "moveCardBottom"
    | "movecardTop";
};
export function boardReducer(state: { board: BoardM }, action: IAction) {
  switch (action.type) {
    case "addCard":
      return state.board.addNewColumn();
  }
}

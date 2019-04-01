import React, {
  Component,
  useContext,
  useState,
  createContext,
  useEffect
} from "react";
import { Row, Col, Card, Button, message } from "antd";
import { ColumnBuilder, ColumnM } from "../models/column-model";
import { ColumnC } from "../column/column-component";
import { CardM, CardBuilder, IDependency } from "../models/card-model";
import { BoardM, BoardBuilder } from "../models/board-model";
import { CardC } from "../card/card-component";
import { findById, removeById, changeElem } from "../helpers/finder";
import { changeConfirmLocale } from "antd/lib/modal/locale";
import { CardDependencyCount } from "../card/card-dependency-count";

export const ProjectContext = createContext(new BoardBuilder().new(1));

export default function Board(props: { board: BoardM }) {
  const [board, setBoard] = useState(props.board);

  useEffect(() => {
    setBoard(props.board);
  });

  const addColumn = () => {
    setBoard(board.addNewColumn());
  };

  const editColumn = (modifiedColumn: ColumnM) => {
    setBoard(board.editColumn(modifiedColumn));
  };

  const deleteColumn = (column: ColumnM) => {
    setBoard(board.deleteColumn(column));
  };

  const addNewCard = (column: ColumnM) => {
    setBoard(board.addNewCard(column));
  };

  const alertBlockedCard = (dependencies: IDependency[]) => {
    message.info(
      `Esta tarjeta se encuentra bloqueada por:` +
        dependencies
          .map(
            ({ column, card }) => `column: ${column.title}, card: ${card.title}`
          )
          .join(", ")
    );
  };

  const moveCard = (columnFrom: ColumnM) => (card: CardM) => (
    columnTo: ColumnM
  ) => {
    if (card.isBlocked() && columnTo.title === "Done") {
      alertBlockedCard(card.isBlockedBy());
      return;
    }
    const modifiedBoard = board.moveCard(columnFrom, columnTo, card);
    setBoard(modifiedBoard);
  };

  const editCard = (column: ColumnM) => (card: CardM) => {
    const modifiedBoard = board.editColumn(column.editCard(card));
    setBoard(modifiedBoard);
  };

  const deleteCard = (column: ColumnM) => (card: CardM) => {
    const modifiedBoard = board.deleteCard(column, card);
    setBoard(modifiedBoard);
  };

  const moveCardUp = (column: ColumnM) => (card: CardM) => {
    const cardIndex = column.cards.findIndex(c => c.id === card.id);
    if (cardIndex !== 0) {
      column = column.deleteCard(card);
      column.cards.splice(cardIndex - 1, 0, card);
      setBoard(board.editColumn(column));
    }
  };
  const moveCardDown = (column: ColumnM) => (card: CardM) => {
    const cardIndex = column.cards.findIndex(c => c.id === card.id);
    if (cardIndex !== column.cards.length - 1) {
      column = column.deleteCard(card);
      column.cards.splice(cardIndex + 1, 0, card);
      setBoard(board.editColumn(column));
    }
  };
  const moveCardBottom = (column: ColumnM) => (card: CardM) => {
    column = column.deleteCard(card);
    column.cards = [...column.cards, card];
    setBoard(board.editColumn(column));
  };
  const moveCardTop = (column: ColumnM) => (card: CardM) => {
    column = column.deleteCard(card);
    column.cards = [card, ...column.cards];
    setBoard(board.editColumn(column));
  };

  const editDependencies = (column: ColumnM) => (card: CardM) => (
    dependencies: IDependency[]
  ) => {
    card.dependencies = dependencies;
    editCard(column)(card);
  };

  return (
    <Row
      style={{
        background: "rgba(24, 144, 255, 0.2)",
        padding: "30px",
        display: "flex",
        overflowX: "scroll",

        height: "100%"
      }}
      gutter={16}
    >
      <ProjectContext.Provider value={board}>
        {board.columns.map(column => (
          <ColumnC
            column={column}
            key={column.id}
            editColumn={() => editColumn(column)}
            deleteColumn={() => deleteColumn(column)}
            addCard={() => addNewCard(column)}
          >
            {column.cards.map(card => (
              <CardC
                card={card}
                deleteCard={() => deleteCard(column)(card)}
                editCard={editCard(column)}
                moveCard={moveCard(column)(card)}
                moveCardUp={() => moveCardUp(column)(card)}
                moveCardDown={() => moveCardDown(column)(card)}
                moveCardBottom={() => moveCardBottom(column)(card)}
                moveCardTop={() => moveCardTop(column)(card)}
                editDependencies={editDependencies(column)(card)}
              />
            ))}
          </ColumnC>
        ))}
      </ProjectContext.Provider>
      <Col span={6} style={{ minWidth: "300px" }}>
        <Button type="primary" block onClick={addColumn}>
          Add column
        </Button>
      </Col>
    </Row>
  );
}

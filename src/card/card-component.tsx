import React, { Component, Fragment, useState, useContext } from "react";
import { Card, Collapse, Input, Icon } from "antd";
import { CardM, IDependency } from "../models/card-model";
import ModalEdit from "../shared-components/modal-edit";
import { ProjectContext } from "../board/board-component";
import { ModalMove } from "../shared-components/modal-move";
import { ColumnM } from "../models/column-model";
import { CardAction } from "./card-actions";
import { ModalDependencies } from "../shared-components/modal-dependencies";
import { CardDependencyCount } from "./card-dependency-count";
const Panel = Collapse.Panel;

type ICardC = {
  card: CardM;
  editCard: (arg0: CardM) => void;
  deleteCard: () => void;
  moveCard: (column: ColumnM) => void;
  editDependencies: (dependencies: IDependency[]) => void;
  moveCardUp: () => void;
  moveCardDown: () => void;
  moveCardTop: () => void;
  moveCardBottom: () => void;
};

export function CardC(props: ICardC) {
  const [visibleEdit, setVisibleEdit] = useState(!props.card.title);
  const [visibleMove, setVisibleMove] = useState(false);
  const [visibleDependencies, setVisibleDependencies] = useState(false);

  const editValues = ({ title, text }: { title: string; text: string }) => {
    const newCard = props.card;
    newCard.title = title;
    newCard.text = text;
    props.editCard(newCard);
  };

  const onModalEditClose = () => setVisibleEdit(false);

  const openModalEdit = () => setVisibleEdit(true);

  const onModalDependenciesClose = () => setVisibleDependencies(false);

  const openModalDependencies = () => setVisibleDependencies(true);

  const onModalMoveClose = () => setVisibleMove(false);

  const openModalMove = () => setVisibleMove(true);

  const onColumnMoveSelect = (columnTo: ColumnM) => {
    onModalMoveClose();
    props.moveCard(columnTo);
  };
  const onDependenciesSelect = (dependencies: IDependency[]) => {
    onModalDependenciesClose();
    props.editDependencies(dependencies);
  };

  const deleteCard = () => {
    props.deleteCard();
  };

  const { title, text } = props.card;
  return (
    <React.Fragment>
      <Collapse style={{ width: "100%" }}>
        <Panel
          header={title}
          extra={
            <div>
              <CardDependencyCount card={props.card} />
              <CardAction
                edit={openModalEdit}
                move={openModalMove}
                down={props.moveCardDown}
                up={props.moveCardUp}
                bottom={props.moveCardBottom}
                top={props.moveCardTop}
                delete={deleteCard}
                dependencies={openModalDependencies}
              />
            </div>
          }
          key="1"
        >
          <p>{text}</p>
        </Panel>
      </Collapse>

      <ModalEdit
        title="Edicion"
        visible={visibleEdit}
        onClose={onModalEditClose}
        getValues={editValues}
      >
        <Input defaultValue={title} name="title" />
        <Input defaultValue={text} name="text" />
      </ModalEdit>
      <ModalMove
        title="Seleccionar columna"
        visible={visibleMove}
        onClose={onModalMoveClose}
        onColumnSelect={onColumnMoveSelect}
      />
      <ModalDependencies
        title="Seleccionar dependencias"
        dependencies={props.card.dependencies}
        visible={visibleDependencies}
        onClose={onModalDependenciesClose}
        onDependenciesSelect={onDependenciesSelect}
      />
    </React.Fragment>
  );
}

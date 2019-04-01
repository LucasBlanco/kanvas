import { Dropdown, Icon, Menu, Badge } from "antd";
import React, { useContext } from "react";
import { CardM } from "../models/card-model";
import { ProjectContext } from "../board/board-component";

type ICardAction = {
  card: CardM;
};
export function CardDependencyCount(props: ICardAction) {
  const board = useContext(ProjectContext);
  return (
    <Badge
      count={props.card.isBlockedBy().length}
      showZero={false}
      offset={[35, -18]}
      title={
        "Is blocked by: " +
        props.card
          .isBlockedBy()
          .map(dep => `(${dep.column.title}, ${dep.card.title})`)
          .join("; ")
      }
    >
      <Badge
        offset={[20, -35]}
        title={
          "Is blocking: " +
          board
            .isBlocking(props.card)
            .map(dep => `(${dep.column.title}, ${dep.card.title})`)
            .join("; ")
        }
        count={board.isBlocking(props.card).length}
        style={{
          backgroundColor: "#52c41a"
        }}
        showZero={false}
      />
    </Badge>
  );
}

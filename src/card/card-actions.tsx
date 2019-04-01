import { Dropdown, Icon, Menu } from "antd";
import React from "react";
import { CardM } from "../models/card-model";

type ICardAction = {
  top: () => void;
  down: () => void;
  edit: () => void;
  delete: () => void;
  dependencies: () => void;
  move: () => void;
  up: () => void;
  bottom: () => void;
};
export function CardAction(props: ICardAction) {
  const menu1 = (
    <Menu>
      <Menu.Item onClick={props.edit}>
        <a>Edit</a>
      </Menu.Item>
      <Menu.Item onClick={props.delete}>
        <a>Delete</a>
      </Menu.Item>
      <Menu.Item onClick={props.dependencies}>
        <a>Dependencies</a>
      </Menu.Item>
      <Menu.Item onClick={props.move}>
        <a>Move</a>
      </Menu.Item>
    </Menu>
  );

  const menu2 = (
    <Menu>
      <Menu.Item onClick={props.down}>
        <a>Down</a>
      </Menu.Item>
      <Menu.Item onClick={props.bottom}>
        <a>Bottom</a>
      </Menu.Item>
      <Menu.Item onClick={props.up}>
        <a>Up</a>
      </Menu.Item>
      <Menu.Item onClick={props.top}>
        <a>Top</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu1}>
        <a className="ant-dropdown-link" href="#">
          <Icon type="edit" theme="twoTone" />
        </a>
      </Dropdown>
      <Dropdown overlay={menu2}>
        <a className="ant-dropdown-link" href="#">
          <Icon type="arrow-right" />
        </a>
      </Dropdown>
    </>
  );
}

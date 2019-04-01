import React, { Component } from "react";
import {
  Col,
  Card,
  Row,
  Button,
  Input,
  Icon,
  Modal,
  Divider,
  Popconfirm
} from "antd";
import { CardM } from "../models/card-model";
import { ColumnM } from "../models/column-model";
import { CardC } from "../card/card-component";
import ModalEdit from "../shared-components/modal-edit";
import { changeElem } from "../helpers/finder";

type IColumnC = {
  column: ColumnM;
  editColumn: (arg0: ColumnM) => void;
  deleteColumn: () => void;
  addCard: () => void;
  children: React.ReactElement[];
};
export class ColumnC extends Component<IColumnC> {
  state: { visible: boolean };

  constructor(props: IColumnC) {
    super(props);
    this.state = { visible: !props.column.title };
  }

  editValues = ({ title }: { title: string }) => {
    let column = this.props.column;
    column.title = title;
    this.props.editColumn(column);
  };

  onModalClose = () => {
    this.setState({ visible: false });
  };

  render() {
    return (
      <React.Fragment>
        <Col span={6} style={{ minWidth: "300px" }}>
          <Card
            title={this.props.column.title}
            extra={
              <React.Fragment>
                <Icon
                  type="edit"
                  onClick={() =>
                    this.setState({ visible: !this.state.visible })
                  }
                />
                <Popconfirm
                  title="Esta seguro que desea borrar esta columna?"
                  onConfirm={e => this.props.deleteColumn()}
                  okText="Si"
                  cancelText="No"
                >
                  <Icon type="close" />
                </Popconfirm>
              </React.Fragment>
            }
            style={{ WebkitBoxShadow: "7px 6px 5px 0px rgba(0,0,0,0.09)" }}
            hoverable
          >
            <Row>
              {this.props.children.map(card => (
                <Col span={24} style={{ marginBottom: 5 }}>
                  {card}
                </Col>
              ))}
            </Row>
            <Button type="primary" block onClick={() => this.props.addCard()}>
              Add card
            </Button>
          </Card>
        </Col>
        <ModalEdit
          title="Titulo"
          visible={this.state.visible}
          onClose={this.onModalClose.bind(this)}
          getValues={this.editValues.bind(this)}
        >
          <Input defaultValue={this.props.column.title} name="title" />
        </ModalEdit>
      </React.Fragment>
    );
  }
}

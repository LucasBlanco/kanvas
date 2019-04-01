import { Modal, Select, Button, Row, Col } from "antd";
import { ColumnM, ColumnBuilder } from "../models/column-model";
import { useContext, useState } from "react";
import { ProjectContext } from "../board/board-component";
import React from "react";
import { findById } from "../helpers/finder";
import { CardM, CardBuilder, IDependency } from "../models/card-model";
const Option = Select.Option;

type IModalDependencies = {
  title: string;
  visible: boolean;
  dependencies: IDependency[];
  onClose: () => void;
  onDependenciesSelect: (
    dependencies: { column: ColumnM; card: CardM }[]
  ) => void;
};
export function ModalDependencies(props: IModalDependencies) {
  const { columns } = useContext(ProjectContext);

  const [dependencies, setDependencies]: [IDependency[], Function] = useState(
    props.dependencies
  );

  const selectColumn = (index: number) => (id: number) => {
    dependencies[index].column = findById(columns, id);
    setDependencies([...dependencies]);
  };
  const selectCard = (index: number) => (id: number) => {
    dependencies[index].card = findById(dependencies[index].column.cards, id);
    setDependencies([...dependencies]);
  };

  const addDependency = () => {
    setDependencies([...dependencies, { card: null, column: null }]);
  };

  const deleteDependency = (index: number) => {
    setDependencies(dependencies.filter((_, i) => i !== index));
  };

  return (
    <Modal
      title={props.title}
      visible={props.visible}
      onCancel={props.onClose}
      onOk={e => dependencies && props.onDependenciesSelect(dependencies)}
    >
      <Row gutter={16}>
        {dependencies.map((dep, i) => (
          <div>
            <Col span={10} style={{ marginBottom: "10px" }}>
              <Select style={{ width: "100%" }} onChange={selectColumn(i)}>
                {columns.map(column => (
                  <Option value={column.id} key={column.id}>
                    {column.title}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col span={10} style={{ marginBottom: "10px" }}>
              <Select
                style={{ width: "100%" }}
                onChange={selectCard(i)}
                disabled={!dep.column}
              >
                {dep.column &&
                  dep.column.cards.map(card => (
                    <Option value={card.id} key={card.id}>
                      {card.title}
                    </Option>
                  ))}
              </Select>
            </Col>
            <Col span={4} style={{ marginBottom: "10px" }}>
              <Button
                type="danger"
                shape="circle"
                icon="minus"
                onClick={() => deleteDependency(i)}
              />
            </Col>
          </div>
        ))}
      </Row>
      <Row>
        <Col>
          <Button
            type="primary"
            shape="circle"
            icon="plus"
            onClick={addDependency}
          />
        </Col>
      </Row>
    </Modal>
  );
}

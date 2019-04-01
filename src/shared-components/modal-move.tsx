import { Modal, Select } from "antd";
import { ColumnM } from "../models/column-model";
import { useContext, useState } from "react";
import { ProjectContext } from "../board/board-component";
import React from "react";
import { findById } from "../helpers/finder";
const Option = Select.Option;

type IModalMove = {
  title: string;
  visible: boolean;
  onClose: () => void;
  onColumnSelect: (column: ColumnM) => void;
};
export function ModalMove(props: IModalMove) {
  const { columns } = useContext(ProjectContext);
  const [selectedColumn, setSelectedColumn] = useState(
    columns.find(c => c.title === "Done")
  );

  const selectColumn = (id: number) => {
    setSelectedColumn(findById(columns, id));
  };

  const getSelectedColumn = () => {
    const column = columns.find(c => c.title === "Done");
    return column ? column.id : undefined;
  };

  return (
    <Modal
      title={props.title}
      visible={props.visible}
      onCancel={props.onClose}
      onOk={e => selectedColumn && props.onColumnSelect(selectedColumn)}
    >
      <Select
        style={{ width: 120 }}
        onChange={selectColumn}
        defaultValue={getSelectedColumn()}
      >
        {columns.map(c => (
          <Option value={c.id} key={c.id}>
            {c.title}
          </Option>
        ))}
      </Select>
    </Modal>
  );
}

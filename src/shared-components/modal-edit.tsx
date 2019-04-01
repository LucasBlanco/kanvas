import React, {
  Component,
  ReactChild,
  ReactChildren,
  SyntheticEvent,
  FormEvent
} from "react";
import { Modal, Form, Button } from "antd";
import { isArray } from "util";

interface IModalEdit {
  title: string;
  visible: boolean;
  children: React.ReactElement[] | React.ReactElement;
  getValues(response: Object): void;
  onClose(): void;
}

export default class ModalEdit extends Component<IModalEdit> {
  state: any;
  constructor(props: IModalEdit) {
    super(props);

    if (props.children instanceof Array) {
      if (props.children.some(c => !c.props.hasOwnProperty("name"))) {
        throw "Todos los Hijos deber tener un campo name";
        return;
      }
      this.state = props.children.reduce(
        (state, child) => {
          state[child.props.name] = child.props.defaultValue;
          return state;
        },
        {} as any
      );
    } else {
      if (!props.children.props.hasOwnProperty("name")) {
        throw "Todos los Hijos deber tener un campo name";
        return;
      }
      this.state = {
        [props.children.props.name]: props.children.props.defaultValue
      };
    }

    this.state = {
      ...this.state,
      children: props.children
    };
  }

  handleChange = (e: any) => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  handleOk = (e: any) => {
    e && e.preventDefault();
    const { children, ...response } = this.state;
    this.closeModal();
    this.props.getValues(response);
  };

  closeModal = () => {
    this.props.onClose();
  };

  render() {
    const children = React.Children.map(this.state.children, child =>
      React.cloneElement(child, { onChange: this.handleChange })
    );
    return (
      <Modal
        title={this.props.title}
        visible={this.props.visible}
        onCancel={this.props.onClose}
        footer={[
          <Button key="submit" type="primary" onClick={this.handleOk}>
            Submit
          </Button>
        ]}
      >
        <Form onSubmit={this.handleOk}>
          {children.map(c => (
            <Form.Item
              label={(c.props as any).name}
              key={(c.props as any).name}
            >
              {c}
            </Form.Item>
          ))}
        </Form>
      </Modal>
    );
  }
}

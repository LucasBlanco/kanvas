import React, { Component, useState } from "react";
import { Menu, Button, Input, Icon, Row, Col, Popconfirm } from "antd";
import { OrganisationM } from "../models/organisation-model";
import { ProjectM, ProjectBuilder } from "../models/project-model";
import ModalEdit from "../shared-components/modal-edit";

type IProjectMenuC = {
  organisation: OrganisationM;
  project: ProjectM | null;
  onSelectProject: (project: ProjectM) => void;
  onEditOrganisation: (organisation: OrganisationM) => void;
};

export function ProjectMenuC(props: IProjectMenuC) {
  const [visible, setVisible] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(
    new ProjectBuilder().new(0)
  );
  const [organisation, setOrganisation] = useState(props.organisation);

  const onModalClose = () => {
    setVisible(false);
  };

  const openModal = () => setVisible(true);

  const editProject = (project: ProjectM) => {
    setProjectToEdit(project);
    console.log(project);
    openModal();
  };

  const addProject = () => {
    const selectedOrganisation = props.organisation.addNewProject();
    setProjectToEdit(
      selectedOrganisation.projects[selectedOrganisation.projects.length - 1]
    );
    setOrganisation(selectedOrganisation);
    openModal();
  };

  const deleteProject = (project: ProjectM) => {
    const organisation = props.organisation.deleteProject(project);
    setOrganisation(organisation);
    props.onEditOrganisation(organisation);
  };

  const editValues = ({ name }: { name: string }) => {
    projectToEdit.name = name;
    const org = organisation.editProject(projectToEdit);
    props.onEditOrganisation(org);
  };

  return (
    <>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        {props.organisation &&
          props.organisation.projects.map((p, i) => (
            <Menu.Item key={i} onClick={() => props.onSelectProject(p)}>
              <Row>
                <Col span={16}>{p.name}</Col>
                <Col span={8}>
                  <Icon type="edit" onClick={() => editProject(p)} />
                  <Popconfirm
                    title="Esta seguro que desea borrar este projecto?"
                    onConfirm={e => deleteProject(p)}
                    okText="Si"
                    cancelText="No"
                  >
                    <Icon type="close" />
                  </Popconfirm>
                </Col>
              </Row>
            </Menu.Item>
          ))}
        <Menu.Item key={100} onClick={addProject}>
          <Button type="primary" block>
            Add project
          </Button>
        </Menu.Item>
      </Menu>
      <ModalEdit
        title="Edicion"
        visible={visible}
        onClose={onModalClose}
        getValues={editValues}
      >
        <Input
          defaultValue={projectToEdit ? projectToEdit.name : ""}
          name="name"
        />
      </ModalEdit>
    </>
  );
}

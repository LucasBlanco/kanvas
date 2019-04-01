import React, { Component } from "react";
import "./App.css";
import Board from "./board/board-component";
import { Layout, Menu, Button } from "antd";
import { OrganisationM } from "./models/organisation-model";
import { ProjectM } from "./models/project-model";
import { getOrganisations } from "./services/organisationService";
import { ProjectMenuC } from "./project/project-menu-component";
import { changeElem } from "./helpers/finder";
const { Header, Footer, Sider, Content } = Layout;

class App extends Component {
  state: {
    organisations: OrganisationM[];
    selectedOrganisation: OrganisationM | null;
    selectedProject: ProjectM | null;
  };
  constructor(props: any) {
    super(props);
    this.state = {
      organisations: [],
      selectedOrganisation: null,
      selectedProject: null
    };
    getOrganisations().then(organisations => {
      this.setState({
        organisations,
        selectedOrganisation: organisations[0],
        selectedProject: organisations[0].projects[0]
      });
    });
  }

  selectOrganisation = (id: number) => {
    const selectedOrganisation = this.state.organisations.find(
      o => o.id === id
    );
    this.setState({ selectedOrganisation });
  };

  selectProject = (project: ProjectM) => {
    if (this.state.selectedOrganisation) {
      const selectedProject = this.state.selectedOrganisation.projects.find(
        o => o.id === project.id
      );
      this.setState({ selectedProject });
    }
  };

  onEditOrganisation = (organisation: OrganisationM) => {
    this.setState({
      organisations: changeElem(this.state.organisations, organisation)
    });
  };

  render() {
    return (
      <div>
        <Layout>
          <Header className="header">
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" style={{ lineHeight: "64px" }}>
              {this.state.organisations.map((o, i) => (
                <Menu.Item
                  key={i}
                  onClick={() => this.selectOrganisation(o.id)}
                >
                  {o.name}
                </Menu.Item>
              ))}
            </Menu>
          </Header>
          <Layout style={{ minHeight: "-webkit-fill-available" }}>
            <Sider width={200} style={{ background: "#fff" }}>
              {this.state.selectedOrganisation && (
                <ProjectMenuC
                  organisation={this.state.selectedOrganisation}
                  onSelectProject={this.selectProject}
                  onEditOrganisation={this.onEditOrganisation}
                  project={this.state.selectedProject}
                />
              )}
            </Sider>
            <Content style={{ padding: "0 50px" }}>
              <Layout
                style={{
                  padding: "24px 0",
                  background: "#fff",
                  height: "100%"
                }}
              >
                <Content style={{ padding: "0 24px", minHeight: 280 }}>
                  {this.state.selectedProject && (
                    <Board board={this.state.selectedProject.board} />
                  )}
                </Content>
              </Layout>
            </Content>
          </Layout>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </div>
    );
  }
}

export default App;

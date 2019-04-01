import { OrganisationM } from "../models/organisation-model";
import { ProjectM } from "../models/project-model";
import { BoardM } from "../models/board-model";
import { ColumnM } from "../models/column-model";
import { CardM } from "../models/card-model";
import { findById } from "../helpers/finder";
import { Component } from "react";
import React from "react";

export async function getOrganisations() {
  const board1 = new BoardM([], 1);
  const board2 = new BoardM([], 2);
  const card = new CardM("1", "1", [], 1);

  const card2 = new CardM("2", "2", [], 2);
  const card3 = new CardM("3", "3", [], 3);
  const card4 = new CardM("4", "4", [], 4);
  const column = new ColumnM("Front", [card, card3, card4], 1);
  const column2 = new ColumnM("Done", [card2], 2);
  board1.columns = [column, column2];
  board2.columns = [column2];
  const project = new ProjectM("Gimnasio", board1, [], 1);
  const project2 = new ProjectM("Ventas", board2, [], 2);
  const organisation = new OrganisationM("Vadium", [], [project, project2], 1);
  return new Promise((resolve, reject) => {
    resolve([organisation]);
  }) as Promise<OrganisationM[]>;
}

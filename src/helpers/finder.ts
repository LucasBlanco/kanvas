type WithId = {
  id: number;
};

export function findById<T extends WithId>(array: T[], id: number): T {
  const elem = array.find(elem => elem.id === id);
  if (!elem) {
    throw `findById: No se encontro un elemento con id: ${id} en el array: ${array}`;
  }
  return elem;
}

export function removeById<T extends WithId>(array: T[], id: number): T[] {
  if (!array.some(elem => elem.id === id)) {
    throw `removeById: No se encontro un elemento con id: ${id} en el array: ${array}`;
  }
  return array.filter(elem => elem.id !== id);
}

export function changeElem<T extends WithId>(array: T[], elem: T): T[] {
  return array.map(e => (e.id === elem.id ? elem : e));
}

export function getNextId(elems: WithId[]): number {
  return elems.map(e => e.id).reduce((a, b) => (a > b ? a : b), 1) + 1;
}

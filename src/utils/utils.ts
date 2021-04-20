export const FLOORS_AMOUNT = 11;
export const LIFTS = 2;

export const createCellsMatrix = (): any[][] => {
  const mat = [];
  for (let floorLevel = 0; floorLevel < FLOORS_AMOUNT; floorLevel++) {
    const floor = [];
    for (let lifts = 0; lifts < LIFTS; lifts++) {
      floor.push({
        floorLevel,
        fromTheLeft: lifts,
        text: "",
        time: 0
      });
    }
    mat.push(floor);
  }
  return mat;
};


export const liftsArrayCreator = (): any[] => {
  const mat: any = [];
  for (let index = 0; index < LIFTS; index++) {
    const lift = {
      id: index,
      floor: 0,
      from: 0,
      to: 0,
      called: false,
      transitionTime: 1,
      color: "",
    }
    mat.push(lift);

  }
  return mat;
}


export const floorsArrayCreator = (): any[] => {
  const mat: any = [];
  for (let index = 0; index < FLOORS_AMOUNT; index++) {
    const floor = { level: FLOORS_AMOUNT - index, status: "call" }
     
    mat.push(floor);

  }
  console.log("mat",mat);
  
  return mat;
}


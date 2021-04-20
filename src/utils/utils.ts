export const FLOORS_AMOUNT = 10;
export const LIFTS = 5;

export const createCellsMatrix = (rows:number=FLOORS_AMOUNT,cols:number=LIFTS): any[][] => {
  const mat = [];
  for (let floorLevel = 0; floorLevel < rows; floorLevel++) {
    const floor = [];
    for (let lifts = 0; lifts < cols; lifts++) {
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


export const liftsArrayCreator = (cols:number=LIFTS): any[] => {
  const mat: any = [];
  for (let index = 0; index < cols; index++) {
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


export const floorsArrayCreator = (rows:number=FLOORS_AMOUNT): any[] => {
  const mat: any = [];
  for (let index = 0; index < rows; index++) {
    const floor = { level: rows - index, status: "call" }
     
    mat.push(floor);

  }
  console.log("mat",mat);
  
  return mat;
}


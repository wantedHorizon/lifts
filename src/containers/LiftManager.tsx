import React, { Component } from "react";
import FloorCell from "../components/FloorCell";
import Lift from "../components/Lift/Lift";
import OrderLiftBtn from "../components/OrderLiftBtn";
import classes from "./LiftManager.module.css";
import Modal from "react-modal";
const createCellsMatrix = (): any[][] => {
  const mat = [];
  for (let floorLevel = 0; floorLevel < 10; floorLevel++) {
    const floor = [];
    for (let lifts = 0; lifts < 5; lifts++) {
      floor.push({
        floorLevel,
        fromTheLeft: lifts,
        text: "",
        time:0
      });
    }
    mat.push(floor);
  }
  return mat;
};
interface State {
  lifts: any[];
  floors: any[];
  calls: number[];
  mat: any[][];
  currentlyMoving: number;
  err: string;
  intervals:any[];
}

const customStyles = {
  content: {
    top: "10%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "20%",
    transform: "translate(-50%, -50%)",
  },
};
interface Props {}
export default class LiftManager extends Component<Props, State> {
  state = {
    lifts: [
      {
        id: 0,
        floor: 0,
        from: 0,
        to: 0,
        called: false,
        transitionTime: 1,
        color: "",
      },
      {
        id: 1,
        floor: 0,
        from: 0,
        to: 0,
        called: false,
        transitionTime: 1,
        color: "",
      },
      {
        id: 2,
        floor: 0,
        from: 0,
        to: 0,
        called: false,
        transitionTime: 1,
        color: "",
      },
      {
        id: 3,
        floor: 0,
        from: 0,
        to: 0,
        called: false,
        transitionTime: 1,
        color: "",
      },
      {
        id: 4,
        floor: 0,
        from: 0,
        to: 0,
        called: false,
        transitionTime: 1,
        color: "",
      },
    ],
    floors: [
      { level: 9, status: "call" },
      { level: 8, status: "call" },
      { level: 7, status: "call" },
      { level: 6, status: "call" },
      { level: 5, status: "call" },
      { level: 4, status: "call" },
      { level: 3, status: "call" },
      { level: 2, status: "call" },
      { level: 1, status: "call" },
      { level: 0, status: "call" },
    ],
    calls: Array<number>(),
    currentlyMoving: 0,
    err: "",
    intervals: [],
    mat: createCellsMatrix(),
  };
  componentDidUpdate(prevProps: any, prevState: State) {
    if (//
      prevState.currentlyMoving === 5 &&
      this.state.currentlyMoving === 4 &&
      this.state.calls.length > 0
    ) {
      const calls = this.state.calls.slice(1);
      this.setState({ calls });
      this.orderLift(this.state.calls[0]);
      console.log(prevState);
    }
  }

  checkIfLiftAlreadyHere = (floor: number) => {
    const liftsHere = this.state.lifts.reduce(
      (acc, lift) => (lift.floor === floor ? acc + 1 : acc),
      0
    );
    if (liftsHere) {
      this.setState({ err: `There are already ${liftsHere} lifts here` });
      setTimeout(() => {
        this.setState({ err: "" });
      }, 3000);
      return true;
    }
    return false;
  };
  freeLiftAndFloor = (liftId: number, floorLevel: number) => {
    const lifts = this.state.lifts.slice();
    lifts[liftId] = {
      ...lifts[liftId],
      color: "",
      called: false,
      from: floorLevel,
      to: floorLevel,
      floor: floorLevel,
    };

    const btns = this.state.floors.slice();
    btns[floorLevel].status = "call";
    this.setState((prev) => {
      return { lifts, floors: btns, currentlyMoving: prev.currentlyMoving - 1 };
    });
  };

  changeLiftToArrived = (liftId: number, floorLevel: number) => {
    const lifts = this.state.lifts.slice();
    lifts[liftId].color = "green";

    const btns = this.state.floors.slice();
    btns[floorLevel].status = "arrived";
    this.setState({ lifts, floors: btns });
    setTimeout(() => {
      this.freeLiftAndFloor(liftId, floorLevel);
    }, 2000);
  };


  startChange = (to: number, from: number, liftId: number) => {
    if (to === from) return;
    //number of lifts currently moving
    this.setState((prev) => {
      return { currentlyMoving: prev.currentlyMoving + 1 };
    });
    this.setTime(to,liftId,Math.abs(to - from));
    //lift moving
    const lift = this.state.lifts[liftId];
    const newLift = {
      ...lift,
      from,
      to,
      floor: to,
      transitionTime: Math.abs(to - from),
      called: true,
      color: "red",
    };
    const liftsArr = this.state.lifts.slice();
    liftsArr[newLift.id] = newLift;
    //button block
    const btns = this.state.floors.slice();
    const newBtn = { ...btns[to], status: "waiting" };
    btns[to] = newBtn;
    this.setState({ lifts: liftsArr });
    setTimeout(() => {
      this.changeLiftToArrived(liftId, to);
    }, Math.abs(to - from + 1) * 1000);
  };

  orderLift = (floor: number) => {
    console.log(floor, "floor");

    if (this.checkIfLiftAlreadyHere(floor)){
      return ;
    }
    //button block
    const btns = this.state.floors.slice();
    const newBtn = { ...btns[floor], status: "waiting" };
    btns[floor] = newBtn;
    this.setState({ floors: btns });
   
  
      const availableLifts = this.state.lifts.filter((l) => !l.called);
    if (availableLifts.length === 0) {
      this.state.calls.push(floor);
    } else if (availableLifts.length === 1) {
      this.startChange(floor, availableLifts[0].floor, availableLifts[0].id);
    } else {
      const closestLifts = availableLifts.sort((l) => Math.abs(floor - l.from));
      if (closestLifts[0].floor === floor) {
        console.log("lift already here");
        return;
      }
      this.startChange(floor, closestLifts[0].from, closestLifts[0].id);
    }
  };
  setTime=(floor:number,lift_id:number,time:number)=> {
    console.log(`setTime, floor:[${floor}],lift[${lift_id}],time:${time}`);
    const newMat = JSON.parse(JSON.stringify(this.state.mat));
    newMat[9-floor][lift_id].time=time;
    this.setState({mat:newMat});
  }

  render() {
    return (
      <div className={classes.board} style={{}}>
        {this.state.mat.map((row, floorLevel) => (
          <div
            className={classes.floor}
            key={floorLevel}
            style={{ backgroundColor: "transparent", height: `${10}%` }}
          >
            {row.map((cell) => (
              <FloorCell
                {...cell}
                setTime={this.setTime}
                key={`${cell.floorLevel}-${cell.fromTheLeft}`}
              />
            ))}
            <OrderLiftBtn
              data={this.state.floors[9 - floorLevel]}
              orderLift={() => this.orderLift(9 - floorLevel)}
            />
          </div>
        ))}
        {this.state.lifts.map((lift) => (
          <Lift key={lift.id} {...lift} />
        ))}
        {this.state.err && (
          <Modal
            isOpen={this.state.err.length > 0}
            // onAfterOpen={}
            // onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            {this.state.err}
          </Modal>
        )}
      </div>
    );
  }
}

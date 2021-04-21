import React, { Component } from "react";
import FloorCell from "../components/FloorCell";
import Lift from "../components/Lift/Lift";
import OrderLiftBtn from "../components/OrderLiftBtn";
import classes from "./LiftManager.module.css";
import Modal from "react-modal";
import {

  createCellsMatrix,
  floorsArrayCreator,
  liftsArrayCreator,
} from "../utils/utils";

interface State {
  lifts: any[];
  floors: any[];
  calls: number[];
  mat: any[][];
  currentlyMoving: number;
  err: string;
}

interface Props {
  floorsAmount: number;
  Lifts: number;
  setFloorsAmount: any;
  setLifts: any;
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

export default class LiftManager extends Component<Props, State> {
 
  state = {
    lifts: liftsArrayCreator(),
    floors: floorsArrayCreator(),
    calls: Array<number>(),
    currentlyMoving: 0,
    err: "",
    mat: createCellsMatrix(),
  };
  componentDidUpdate(prevProps: Props, prevState: State) {
    //order waiting lifts

    if (
      prevState.currentlyMoving === this.props.Lifts &&
      this.state.currentlyMoving === this.props.Lifts - 1 &&
      this.state.calls.length > 0
    ) {
      const calls = this.state.calls.slice(1);
      this.setState({ calls });
      this.orderLift(this.state.calls[0]);
      console.log(prevState);
    }
    //change lifts and floors
    if (
      prevProps.Lifts !== this.props.Lifts ||
      prevProps.floorsAmount !== this.props.floorsAmount
    ) {
      this.setState({
        lifts: liftsArrayCreator(this.props.Lifts),
        floors: floorsArrayCreator(this.props.floorsAmount),
        calls: Array<number>(),
        currentlyMoving: 0,
        mat: createCellsMatrix(this.props.floorsAmount, this.props.Lifts),
      });
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
    this.setTime(to, liftId, Math.abs(to - from));
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

    if (this.checkIfLiftAlreadyHere(floor)) {
      return;
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
      const closestLifts = availableLifts.sort((l) => Math.abs(floor - l.floor));
      if (closestLifts[0].floor === floor) {
        console.log("lift already here");
        return;
      }
      console.log("closestLifts",closestLifts);
      
      this.startChange(floor, closestLifts[0].from, closestLifts[0].id);
    }
  };
  setTime = (floor: number, lift_id: number, time: number) => {
    console.log(`setTime, floor:[${floor}],lift[${lift_id}],time:${time}`);
    const newMat = JSON.parse(JSON.stringify(this.state.mat));
    newMat[this.props.floorsAmount - 1 - floor][lift_id].time = time;
    this.setState({ mat: newMat });
  };

  render() {
    return (
      <div className={classes.board} style={{}}>
        {this.state.mat.map((row, floorLevel) => (
          <div
            className={classes.floor}
            key={floorLevel}
            style={{
              backgroundColor: "transparent",
              height: `${100 / this.props.floorsAmount}%`,
            }}
          >
            {row.map((cell) => (
              <FloorCell
                width={Math.floor(100 / (this.props.Lifts + 1))}
                height={Math.floor(100 / this.props.floorsAmount)}
                {...cell}
                setTime={this.setTime}
                key={`${cell.floorLevel}-${cell.fromTheLeft}`}
              />
            ))}
            <OrderLiftBtn
              width={Math.floor(100 / (this.props.Lifts + 1))}
              height={Math.floor(100 / this.props.floorsAmount)}
              data={this.state.floors[this.props.floorsAmount - 1 - floorLevel]}
              orderLift={() =>
                this.orderLift(this.props.floorsAmount - 1 - floorLevel)
              }
            />
          </div>
        ))}
        {this.state.lifts.map((lift) => (
          <Lift
            key={lift.id}
            floorsAmount={this.props.floorsAmount}
            liftsAmount={this.props.Lifts}
            {...lift}
            width={Math.floor(100 / (this.props.Lifts + 1))}
            height={(100 / this.props.floorsAmount)}
          />
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

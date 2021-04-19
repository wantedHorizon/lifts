import React, { Component } from "react";
import FloorCell from "../components/FloorCell";
import Lift from "../components/Lift/Lift";
import OrderLiftBtn from "../components/OrderLiftBtn";
import classes from './LiftManager.module.css';
const createCellsMatrix = (): any[][] => {
  const mat = [];
  for (let floorLevel = 0; floorLevel < 10; floorLevel++) {
    const floor = [];
    for (let lifts = 0; lifts < 5; lifts++) {
      floor.push({
        floorLevel,
        fromTheLeft: lifts,
        text: "",
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
  currentlyMoving:number;
}
interface Props {}
export default class LiftManager extends Component<Props, State> {
  state = {
    lifts: [
      { id: 0, floor: 0,from:0,to:0, called: false,transitionTime:1,color:'' },
      { id: 1, floor: 0,from:0,to:0, called: false,transitionTime:1,color:''},
      { id: 2, floor: 0,from:0,to:0, called: false,transitionTime:1,color:'' },
      { id: 3, floor: 0,from:0,to:0, called: false,transitionTime:1,color:'' },
      { id: 4, floor: 0,from:0,to:0, called: false,transitionTime:1,color:'' },
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
    calls:  Array<number>(),
    currentlyMoving:0,
    mat: createCellsMatrix(),
  };

  componentDidMount(){
    // setTimeout(()=> {
    //   const lifts =this.state.lifts.slice();
    //   lifts[4]= {...lifts[4],floor:5,from:0,to:5,transitionTime:5,color:'green',called:true} 
    //   this.setState({
    //     lifts
    //   })
    // },2000)
  }

  startChange = (to:number,from:number,liftId:number,) => {
    if(to===from) return ;

    this.setState((prev)=>{
      return {currentlyMoving:prev.currentlyMoving+1}
    });
    //lift moving
    const lift = this.state.lifts[liftId];
    const newLift = {...lift,from,to,floor:to,transitionTime:Math.abs(to-from),called:true,color:'red'}
    const liftsArr = this.state.lifts.slice();
    liftsArr[newLift.id]=newLift;
    //button block
    const btns = this.state.floors.slice();
    const newBtn={...btns[to],status:'waiting'}
    btns[to]=newBtn;
    this.setState({lifts:liftsArr,floors:btns});

  }

  orderLift = (floor:number) => {
    console.log(floor,"floor");
    
    const availableLifts = this.state.lifts.filter(l=> !l.called);
    if(availableLifts.length===0){
      this.state.calls.push(floor);
    }else if (availableLifts.length===1){
      this.startChange(floor,availableLifts[0].floor,availableLifts[0].id)
    }else {
      const closestLifts = availableLifts.sort(l => Math.abs(floor-l.from)); 
      if(closestLifts[0].floor===floor){
        console.log("lift already here");
        return ;
      }
      this.startChange(floor,closestLifts[0].from,closestLifts[0].id)
    }
  }

  render() {
    return (
      <div className={classes.board} style={{}}>
        {this.state.mat.map((row,floorLevel) => (
          <div className={classes.floor} key={floorLevel} style={{backgroundColor:'red',height:`${10}%`}}>
            {row.map((cell) => (
              <FloorCell {...cell} key={`${cell.floorLevel}-${cell.fromTheLeft}`}/>
            ))}
            <OrderLiftBtn data={this.state.floors[9-floorLevel]} onClick={()=>this.orderLift(9-floorLevel)}/>
          </div>
        ))}
        {this.state.lifts.map(lift=> (
            <Lift key={lift.id} {...lift}  />
        ))}
      </div>
    );
  }
}

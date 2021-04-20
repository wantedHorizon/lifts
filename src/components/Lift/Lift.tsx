import React from "react";
import { lift, liftGreen, liftRed } from "../../icons";
import "./Lift.css";
interface Props {
  id: number;
  floor: number;
  from: number;
  to: number;
  called: boolean;
  transitionTime: number;
  color?: string;
  liftsAmount: number;
  floorsAmount: number;
  width:number;
  height:number;
}

export default function Lift({ id,
  floor,
  from,
  to,
  called,
  transitionTime,
  color,
  liftsAmount,
  height,
  width,
  floorsAmount}: Props) {
  let icon = lift;
  if (color === "green") {
    icon = liftGreen;
  } else if (color === "red") {
    icon = liftRed;
  }


  
  return (
    <div
      className="lift"
      style={{
        height:`${height}%`,
        width:`${width}%`,
        bottom: `${height *floor}%`,
        left: `${
          width*id
        }%`,
        transition: `bottom ${Math.abs(from - to)}s`,
        // backgroundColor:'red'
        // transform:'translate(-50%)'
      }}
    >
      <img src={icon} alt="lift" />
    </div>
  );
}

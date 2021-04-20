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
}

export default function Lift(props: Props) {
  let icon = lift;
  if (props.color === "green") {
    icon = liftGreen;
  } else if (props.color === "red") {
    icon = liftRed;
  }
  return (
    <div
      className="lift"
      style={{ bottom: `${10 * props.floor}%`, left: `${5 + props.id * 16.5}%`,transition:`bottom ${Math.abs(props.from-props.to)}s` }}
    >
      <img src={icon} alt="lift" />
    </div>
  );
}

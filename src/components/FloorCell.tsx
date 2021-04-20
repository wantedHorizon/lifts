import React, { useEffect, useState } from "react";

interface Props {
  floorLevel: number;
  fromTheLeft: number;
  text: string;
  time: number;
  width:number;
  height:number;
  setTime: (floor: number, lift_id: number, time: number) => void;
}
export default function FloorCell(props: Props) {
  const [timeVisible, setTimeVisible] = useState(-1);
  useEffect(() => {
    if (props.time > 0) {
      setTimeVisible(props.time);
     
    }
  }, [props.time]);

  useEffect(() => {
    if (timeVisible > 0) {
    
      setTimeout(()=> {
        setTimeVisible(timeVisible - 1);

      },1000);
    } else if (timeVisible === 0) {
      setTimeVisible(-1);
      props.setTime(props.floorLevel, props.fromTheLeft, 0);
    }
    // eslint-disable-next-line
  }, [timeVisible]);

  console.log(timeVisible);
  
  return (
    <div
      style={{
        width: `${props.width}%`,
        height: "100%",
        backgroundColor: "white",
        fontSize:'14px',
        border: "0.05px solid rgba(0,0,0,0.2)",
        color:'black',
        justifyContent:'center',
        alignItems:'center',
        display:'flex',
      }}
    >
      {props.text}
      {timeVisible > 0 && `${timeVisible}s`}
    </div>
  );
}

import React from "react";
import { Button } from "@material-ui/core";

interface Props {
  data: any;
  orderLift: () => void;
  width:number;
  height:number;
}


export default function OrderLiftBtn({ data, orderLift,width }: Props) {
  const onClickHandler = () => {
    if (data.status !== "call") {
      return;
    }
    orderLift();
  };

  

  const style = {
    width: `${width}%`,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    border: "0.05px solid rgba(0,0,0,0.2)",
  };
  let backgroundColor = "green";
  let borderColor = "transparent";
  let color = "white";
  if(data){

    if (data.status === "waiting") {
      backgroundColor = "red";
      borderColor = "transparent";
      color = "white";
    } else if (data.status === "arrived") {
      backgroundColor = "white";
      borderColor = "green";
      color = "green";
    }
  }

  return (
    <div style={style}>
      <Button
        onClick={onClickHandler}
        variant="contained"
        color="primary"
        style={{ backgroundColor, color, border:`1px solid ${borderColor}`,width:'50% !important'}}
      >
        {data && data.status.charAt(0).toUpperCase() + data.status.slice(1)}
      </Button>
    </div>
  );
}

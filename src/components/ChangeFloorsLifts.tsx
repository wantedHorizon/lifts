import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import React from "react";
interface Props {
  floorsAmount: number;
  Lifts: number;
  setFloorsAmount: any;
  setLifts: any;
}

export default function ChangeFloorsLifts({
  floorsAmount,
  Lifts,
  setFloorsAmount,
  setLifts,
}: Props) {
  const options = (num: number) => {
    const mat = [];
    for (let index = 1; index < num; index++) {
      mat.push(<MenuItem value={index} key={index}>{index}</MenuItem>);
    }
    return mat;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        margin: "20px",
      }}
    >
      <FormControl variant="filled" className={""} style={{ width: "20%" }}>
        <InputLabel id="demo-simple-select-filled-label">Lifts</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={Lifts}
          onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
            setLifts(Number(e.target.value));
          }}
        >
          {options(15)}
        </Select>
      </FormControl>
      <FormControl variant="filled" className={""} style={{ width: "20%" }}>
        <InputLabel id="demo-simple-select-filled-label">Floors</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={floorsAmount}
          onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
            setFloorsAmount(Number(e.target.value));
          }}
        >
          {options(15)}
        </Select>
      </FormControl>
    </div>
  );
}

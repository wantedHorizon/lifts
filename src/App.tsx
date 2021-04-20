import React, { useState } from "react";
import "./App.css";
import ChangeFloorsLifts from "./components/ChangeFloorsLifts";
import LiftManager from "./containers/LiftManager";
import { FLOORS_AMOUNT, LIFTS } from "./utils/utils";

function App() {
  const [floorsAmount, setFloorsAmount] = useState(FLOORS_AMOUNT);
  const [Lifts, setLifts] = useState(LIFTS);
  console.log(floorsAmount);

  return (
    <div className="App">
      <div className="App-header">
        <div className="header">
          <h2 style={{ color: "rgba(0,0,0,0.75)" }}>Lifts Manager</h2>
          <ChangeFloorsLifts
            floorsAmount={floorsAmount}
            setFloorsAmount={setFloorsAmount}
            Lifts={Lifts}
            setLifts={setLifts}
          />
        </div>
        <LiftManager
          floorsAmount={floorsAmount}
          setFloorsAmount={setFloorsAmount}
          Lifts={Lifts}
          setLifts={setLifts}
        />
      </div>
    </div>
  );
}

export default App;

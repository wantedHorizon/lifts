import React from 'react';
import './App.css';
import ChangeFloorsLifts from './components/ChangeFloorsLifts';
import LiftManager from './containers/LiftManager';

function App() {
  return (
    <div className="App">
      <div className="App-header">
      <h2 style={{color:'rgba(0,0,0,0.75)'}}>Lifts Manager</h2>
        <ChangeFloorsLifts />
        <LiftManager />
      </div>
    </div>
  );
}

export default App;

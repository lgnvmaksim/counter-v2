import React from 'react';
import './App.css';
import {CounterWithoutLocalStorage} from "./CounterWithLocalStorage/CounterWithoutLocalStorage";
import {Site} from "./Site";

function App() {
  return (
    <div>
  <CounterWithoutLocalStorage/>
    </div>
  );
}

export default App;

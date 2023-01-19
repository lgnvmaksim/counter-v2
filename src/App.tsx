import React from 'react';
import logo from './logo.svg';
import './App.css';
import {CounterWithLocalStorage} from "./CounterWithLocalStorage/CounterWithLocalStorage";

function App() {
  return (
    <div className={'App'}>
  <CounterWithLocalStorage/>
    </div>
  );
}

export default App;

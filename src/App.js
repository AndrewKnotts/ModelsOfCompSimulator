import './App.css';
import { Routes, Route, BrowserRouter, Router } from "react-router-dom";
import Turing from './pages/Turing';
import DFA from './pages/DFA';
import NFA from './pages/NFA';
import PDA from './pages/PDA';
import InputArea from './components/input/InputArea';
//import Graph from './components/graph/Graph';
import { Component } from 'react';
import { page } from './components/navbar/Navbar';
import { DFAModel, Transition } from './components/input/DFAModel.js';
import { NFAModel } from './components/input/NFAModel.js';
import State from './components/state/State';
import Arrow from './components/arrow/arrow';
import Navbar from './components/navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class App extends Component {

  render() {
    return (
      <>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<DFA />} />
            <Route path="/nfa" element={<NFA />} />
            <Route path="/pda" element={<PDA />} />
            <Route path="/turing" element={<Turing />} />
          </Routes>
        </div>
      </>
    );
  }
}

function Home() {
  return <h1>Home page</h1>;
}
//          



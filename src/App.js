import './App.css';
import { Routes, Route, BrowserRouter, HashRouter } from "react-router-dom";
import Turing from './pages/Turing';
import DFA from './pages/DFA';
import NFA from './pages/NFA';
import PDA from './pages/PDA';
import InputArea from './components/input/InputArea';
import { Component } from 'react';
import Navbar from './components/navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class App extends Component {

  render() {
    return (
      <>
        <div className="container">
          <HashRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<DFA />} />
              <Route path="/nfa" element={<NFA />} />
              <Route path="/pda" element={<PDA />} />
              <Route path="/turing" element={<Turing />} />
            </Routes>
          </HashRouter>
        </div>
      </>
    );
  }
}

function Home() {
  return <h1>Home page</h1>;
}
//          



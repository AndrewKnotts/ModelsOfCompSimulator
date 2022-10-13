import './App.css';
import { Routes, Route } from "react-router-dom";
import Turing from './pages/Turing';
import DFA from './pages/DFA';
import NFA from './pages/NFA';
import PDA from './pages/PDA';
import InputArea from './components/input/InputArea';
import Graph from './components/graph/Graph';


function App() {
  return (
    <>
      <div className='container'>
        <Routes>
          <Route path="/" element={<DFA />} />
          <Route path="/DFA" element={<DFA />} />
          <Route path="/NFA" element={<NFA />} />
          <Route path="/PDA" element={<PDA />} />
          <Route path="/TuringMachine" element={<Turing />} />
        </Routes>
        <InputArea />
      </div>
      <div className='visualization'>
        <Graph />
      </div>

    </>

  );
}

export default App;
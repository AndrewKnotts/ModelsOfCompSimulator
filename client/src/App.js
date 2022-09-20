import './App.css';
import { Routes, Route } from "react-router-dom";
import Turing from './pages/Turing';
import DFA from './pages/DFA';
import NFA from './pages/NFA';
import PDA from './pages/PDA';
import InputArea from './components/input/InputArea';

function App() {
  return (
    <>
      <div className='container'>
        <Routes>
          <Route path="/" element={<DFA />} />
          <Route path="/DFA" element={<DFA />} />
          <Route path="/NFA" element={<NFA />} />
          <Route path="/PDA" element={<PDA />} />
          <Route path="/Turing" element={<Turing />} />
        </Routes>
        <InputArea />

      </div>

    </>

  );
}

export default App;
import React from 'react';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css';
import Diary from './pages/Diary';
import Edit from './pages/Edit';
import Home from './pages/Home';
import New from './pages/New';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home></Home>}/>
          <Route path='/new' element={<New></New>}/>
          <Route path='/edit' element={<Edit></Edit>}/>
          <Route path='/diary' element={<Diary></Diary>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

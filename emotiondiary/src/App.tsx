import { Routes,BrowserRouter,Route } from 'react-router-dom';
import './App.css';
import Diary from './pages/Diary';
import Edit from './pages/Edit';
import Home from './pages/Home';
import New from './pages/New';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/new' element={<New/>}/>
        <Route path='/edit' element={<Edit/>}/>
        <Route path='/diary' element={<Diary/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

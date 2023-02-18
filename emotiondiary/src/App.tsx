import React, { useReducer, useRef } from 'react';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css';
import Diary from './pages/Diary';
import Edit from './pages/Edit';
import Home from './pages/Home';
import New from './pages/New';
import styled from 'styled-components'
interface dataProps{
  id:number,
  date:number,
  content:string,
  emotion:number,
}
const dummyData:dataProps[] | any = [
  {
    id:1,
    emotion:1,
    content:"오늘의일기 1번",
    date:1638969241915
  },
  {
    id:2,
    emotion:2,
    content:"오늘의일기 2번",
    date:1638969241916
  },
  {
    id:3,
    emotion:3,
    content:"오늘의일기 3번",
    date:1638969241917
  },
  {
    id:4,
    emotion:4,
    content:"오늘의일기 4번",
    date:1638969241918
  },
  {
    id:5,
    emotion:5,
    content:"오늘의일기 5번",
    date:1638969241919
  }
];

type Action = 
  | {type:'INIT';
  data:dataProps}
  | {type:"CREATE";
  data:dataProps}
  | {type:"REMOVE";
    targetId:number;}
  | {type:"EDIT";
    data:dataProps};

const Background = styled.div`
    background-color: #f6f6f6;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0px;
`
const Container = styled.div`
    width: 70vw;
    height: 100vh;
    background-color: white;
    box-shadow: rgba(100,100,111,0.2) 0px 7px 29px 0px;
    padding-left: 20px;
    padding-right: 20px;
`
const reducer = (state:dataProps[],action:Action): dataProps[]=>{
  let newState = [];
  switch(action.type){
    case 'INIT':{
      return [action.data];
    }
    case 'CREATE':{
      const newItem ={
        ...action.data
      };
      newState = [newItem,...state];
      break
    }
    case 'REMOVE':{
      newState = state.filter(it=> it.id!== action.targetId);
      break
    }
    case 'EDIT':{
      newState = state.map(it=> it.id === action.data.id ? {...action.data}:it)
      break
    };
    default:
      return state;
  }
  return newState;
}

export const DiaryStateContext = React.createContext(dummyData);
export const DiaryDispatchContext = React.createContext(dummyData);
function App() {
  const [data,dispatch] = useReducer(reducer,dummyData);
  
  const dataId = useRef(0);
  const onCreate = (date:number,content:string,emotion:number)=>{
    dispatch({type:'CREATE',data:{
      id:dataId.current,
      date: new Date(date).getTime(),
      content,
      emotion,
    }})
    dataId.current += 1;
  }
  const onRemove = (targetId:number)=>{
    dispatch({type:"REMOVE",targetId});
  }
  
  const onEdit = (targetId:number,date:number,content:string,emotion:number)=>{
    dispatch({
      type:"EDIT",
      data:{
        id:targetId,
        date:new Date(date).getTime(),
        content,
        emotion,
      }
    })
  }
  return (
  <DiaryStateContext.Provider value={data}>
    <DiaryDispatchContext.Provider 
      value={{
        onCreate,
        onEdit,
        onRemove,
      }
      }>
      <BrowserRouter>
      <Background>
        <Container>
          <Routes>
            <Route path='/' element={<Home></Home>}/>
            <Route path='/new' element={<New></New>}/>
            <Route path='/edit/:id' element={<Edit></Edit>}/>
            <Route path='/diary/:id' element={<Diary></Diary>}/>
          </Routes>
        </Container>
      </Background>
      </BrowserRouter>
    </DiaryDispatchContext.Provider>
  </DiaryStateContext.Provider>
  );
}

export default App;

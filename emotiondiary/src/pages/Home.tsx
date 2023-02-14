import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import { DiaryStateContext } from "../App";
import DiaryList from "../components/DiaryList";
interface dataProps{
    id:number,
    date:number,
    content:string,
    emotion:number,
  }

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

function Home (){
    const diaryList:dataProps[] = useContext(DiaryStateContext);
    const [data,setData] = useState<dataProps[]>([{
        id:1,
        date:1,
        content:"",
        emotion:1,}]);
    const [curDate,setCurDate] = useState(new Date());
    
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth()+1}월`
    
    useEffect(()=>{
        if(diaryList.length >= 1){
            const firstDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth(),
                1
            ).getTime();
            
            const lastDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth()+1,
                0
            ).getTime();
            
            setData(diaryList.filter((it)=>firstDay <= it.date && it.date<= lastDay));
        }
    },[diaryList,curDate]);
    const increaseMonth = ()=>{
        setCurDate(new Date(curDate.getFullYear(),curDate.getMonth()+1,curDate.getDate()))
    }
    const decreaseMonth = ()=>{
        setCurDate(new Date(curDate.getFullYear(),curDate.getMonth()-1,curDate.getDate()))
    }
    return(
        <Background>
            <Container>
                <MyHeader 
                    headText={headText}
                    leftChild={<MyButton text={"<"} onClick={decreaseMonth}></MyButton>}
                    rightChild={<MyButton text={">"} onClick={increaseMonth}></MyButton>}
                ></MyHeader>
                <DiaryList diaryList={data}></DiaryList>
            </Container>
        </Background>
    );
}

export default Home;
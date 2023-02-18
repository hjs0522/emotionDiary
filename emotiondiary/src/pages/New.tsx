import { useEffect } from "react";
import DiaryEditor from "../components/DiaryEditor";
import styled from "styled-components";
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
function New (){
    useEffect(()=>{
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = `감정 일기장 - 새 일기`;
    },[]);
    return(
        <DiaryEditor></DiaryEditor>
    );
}

export default New;
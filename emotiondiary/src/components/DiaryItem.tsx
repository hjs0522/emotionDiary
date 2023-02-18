import React from 'react';
import { useNavigate } from 'react-router-dom';
import MyButton from './MyButton';
import styled from 'styled-components'
interface dataProps{
    id:number,
    date:number,
    content:string,
    emotion:number,
  }
  
const DiaryItemContainer = styled.div`
    padding-top: 15px;
    padding-bottom: 15px;
    width: 100%;
    border-bottom: 1px solid #e2e2e2;
    
    display: flex;
    justify-content: space-between;
    
`
const ImgContainer = styled.div`
    cursor: pointer;
    min-width: 120px;
    height: 80px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
`
const InfoContainer = styled.div`
    flex-grow: 1;
    margin-left: 20px;
    cursor: pointer;
`
const DiaryItem = ({id,emotion,content,date}:dataProps) =>{
    const navigate = useNavigate();
    const strDate = new Date(date).toLocaleDateString();
    
    const goDetail = ()=>{
        navigate(`/diary/${id}`);
    };
    const goEdit = ()=>{
        navigate(`/edit/${id}`);
    };
    
    return(
        <DiaryItemContainer>
            <ImgContainer onClick={goDetail}>
                <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} alt="emotion"/>
            </ImgContainer>
            <InfoContainer onClick={goDetail}>
                <div>{strDate}</div>
                <div>{content.slice(0,25)}</div>
            </InfoContainer>
            <div>
                <MyButton onClick={goEdit} text={"수정하기"}></MyButton>
            </div>
        </DiaryItemContainer>
    );
}

export default React.memo(DiaryItem);
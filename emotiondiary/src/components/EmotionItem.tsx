import React from "react";
import styled from 'styled-components'
interface EmotionItemProps{
    emotion_id:number,
    emotion_img:string,
    emotion_descript:string,
    onClick:(emotion_id:number)=>void,
    isSelected:boolean,
}
const EmotionItemSelected = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ececec;
  cursor: pointer;
  border-radius: 5px;
  padding-top: 20px;
  padding-bottom: 20px;
  & > span{
    font-size: 18px;
  }
  & > img{
    width: 50%;
    margin-bottom: 10px;
  }
  border: blue solid 1px;
  
`
const EmotionItemNotSelected = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ececec;
  cursor: pointer;
  border-radius: 5px;
  padding-top: 20px;
  padding-bottom: 20px;
  & > span{
    font-size: 18px;
  }
  & > img{
    width: 50%;
    margin-bottom: 10px;
  }
  
`

const EmotionItem = ({
  emotion_id,
  emotion_img,
  emotion_descript,
  onClick,
  isSelected,
}:EmotionItemProps) => {
  return (
    <>
      {isSelected?
        <EmotionItemSelected
        onClick={() => onClick(emotion_id)}
        >
          <img src={emotion_img} alt="emotion img"/>
          <span>{emotion_descript}</span>
        </EmotionItemSelected>
        :
        <EmotionItemNotSelected
        onClick={() => onClick(emotion_id)}
        >
          <img src={emotion_img} alt="emotion img"/>
          <span>{emotion_descript}</span>
        </EmotionItemNotSelected>

      }
    </>
  );
};

export default React.memo(EmotionItem);
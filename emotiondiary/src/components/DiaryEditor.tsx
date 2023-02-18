import {useCallback, useContext, useEffect, useRef,useState} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { DiaryDispatchContext } from '../App';
import {getStringDate} from '../util/date'
import { emotionList } from '../util/emotion';
import EmotionItem from './EmotionItem';
import MyButton from './MyButton';
import MyHeader from './MyHeader';
import styled from 'styled-components'
interface dataProps{
    id:number,
    date:number,
    content:string,
    emotion:number,
  }
interface DiaryEditorProps{
    isEdit?:boolean,
    originData?:dataProps,
}

const DateInput = styled.input`
    border: none;
    border-radius: 5px;
    background-color: #ececec;
    
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 20px;
    padding-right: 20px;
    
    cursor: pointer;
    font-size: 20px;
`
const EmotionContainer = styled.div`
    display: flex;
    justify-content: space-around;
`

const TextAreaContainer = styled.div`
    width: 100%;
    & > *{
        font-size: 20px;

        box-sizing: border-box;
        width: 100%;
        min-height: 200px;
        resize: vertical;
        
        border: none;
        border-radius: 5px;
        background-color: #ececec;
        
        padding: 20px;
    }
`

const SubmitContainer = styled.div`
    display: flex;
    margin-top: 30px;
    justify-content: space-between;
`
const DiaryEditor = ({isEdit,originData}:DiaryEditorProps) => {
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const [content,setContent] = useState("");
    const [emotion,setEmotion] = useState(3);
    const [date,setDate] = useState(getStringDate(new Date()));
    
    const {onCreate,onEdit,onRemove} = useContext(DiaryDispatchContext);
    const handleClickEmote = useCallback((emotion:number)=>{
        setEmotion(emotion);
    },[]);
    const navigate = useNavigate();
    
    const handleSubmit = ()=>{
        if(content.length < 1 && contentRef.current){
            contentRef.current.focus();
            return;
        }
        if(window.confirm(isEdit?"일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?"))
        {
            if(!isEdit){
                onCreate(date,content,emotion);
            }else{
                onEdit(originData?.id,date,content,emotion);
            }
        }
        
        navigate("/",{replace: true});
    };
    
    const handleRemove = ()=>{
        if(window.confirm("정말 삭제하시겠습니까?")){
            onRemove(originData?.id);
            navigate("/",{replace:true});
        }
    };
    
    useEffect(()=>{
        if(isEdit && originData){
            setDate(getStringDate(new Date(originData.date)))
            setEmotion(originData.emotion);
            setContent(originData.content);
        }
    },[isEdit,originData]);
    
    return(
        <div>
            <MyHeader
                headText={isEdit?"일기 수정하기": "새 일기 쓰기"}
                leftChild={
                    <MyButton text='< 뒤로가기' onClick={()=> navigate(-1)}></MyButton>}
                rightChild={
                    isEdit ?(<MyButton text='삭제하기' type='negative' onClick={handleRemove}></MyButton>):(<div></div>)
                }
            ></MyHeader>
            <div>
                <section>
                    <h4>오늘은 언제인가요?</h4>
                    <div>
                        <DateInput
                            value={date}
                            onChange={(e)=>setDate(e.target.value)}
                            type="date">
                        </DateInput>
                    </div>
                </section>
                <section>
                    <h4>오늘의 감정</h4>
                    <EmotionContainer>
                        {emotionList.map((it)=>(
                            <EmotionItem
                                key={it.emotion_id}
                                {...it}
                                onClick={handleClickEmote}
                                isSelected ={it.emotion_id === emotion}
                            ></EmotionItem>
                        ))}
                    </EmotionContainer>
                </section>
                <section>
                    <h4>오늘의 일기</h4>
                    <TextAreaContainer>
                        <textarea
                            placeholder='오늘은 어땠나요'
                            ref={contentRef}
                            value={content}
                            onChange={(e)=>setContent(e.target.value)}
                        ></textarea>
                    </TextAreaContainer>
                </section>
                <section>
                    <SubmitContainer>
                        <MyButton text='취소하기' onClick={()=> navigate(-1)}></MyButton>
                        <MyButton
                            text='작성완료'
                            type='positive'
                            onClick={handleSubmit}
                        ></MyButton>
                    </SubmitContainer>
                </section>
            </div>
        </div>
    )
}

export default DiaryEditor;
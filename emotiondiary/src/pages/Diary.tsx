import { useContext,useEffect,useState } from 'react';
import {useParams} from 'react-router-dom';
import { DiaryStateContext } from '../App';
import {useNavigate} from 'react-router-dom';
import {emotionList} from '../util/emotion';
import { getStringDate } from '../util/date';

import MyHeader from '../components/MyHeader';
import MyButton from '../components/MyButton';
import styled from 'styled-components';

interface dataProps{
    id:number,
    date:number,
    content:string,
    emotion:number,
  }
  
const DiaryContainer = styled.div`
    & > section{
        width: 100%;
        margin-bottom: 100px;
    
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
    
    &> h4{
        font-size: 22px;
        font-weight: bold;
    }
    
`

const DiaryImgContainer = styled.div`
    background-color: #ececec;
  width: 250px;
  height: 250px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`

const DiaryContentContainer  = styled.div`
     width: 100%;
  background-color: #ececec;
  border-radius: 5px;
  word-break: keep-all;
  overflow-wrap: break-word;
  &>p{
    padding: 20px;
    text-align: left;
    font-size: 20px;
    font-family: "Yeon Sung";
    font-weight: 400;
    line-height: 2.5;
  }
`
  
function Diary (){
    const {id} = useParams();
    const diaryList:dataProps[] = useContext(DiaryStateContext);
    const navigate = useNavigate();
    const [data,setData] = useState<dataProps>();
    
    useEffect(()=>{
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = `감정 일기장 - ${id}번 일기`;
    },[])
    
    useEffect(()=>{
        if(diaryList.length >= 1){
            const targetDiary = diaryList.find(
                (it) => {
                    if(id){
                        return it.id === parseInt(id)
                    }
                    else{
                        return false;
                    }
                }
            )
            
            if (targetDiary){
                setData(targetDiary);
            }else{
                alert("없는 일기입니다.");
                navigate("/",{replace: true});
            }
        }
    },[id,diaryList]);
    
    if(!data){
        return <div>로딩중입니다...</div>
    }else{
        const curEmotionData = emotionList.find(
            (it)=> it.emotion_id === data.emotion
        );
        console.log(curEmotionData);
    
    
        return(
            <DiaryContainer>
                <MyHeader
                    headText={`${getStringDate(new Date(data.date))} 기록`}
                    leftChild={<MyButton text={"< 뒤로가기"} onClick={()=>navigate(-1)}></MyButton>}
                    rightChild={<MyButton text={"수정하기"} onClick={()=>navigate(`/edit/${data.id}`)}></MyButton>}
                ></MyHeader>
                <article>
                    <section>
                        <h4>오늘의 감정</h4>
                        <DiaryImgContainer>
                            <img src={curEmotionData?.emotion_img} alt="현재 emotion data" />
                            <div>
                                {curEmotionData?.emotion_descript}
                            </div>
                        </DiaryImgContainer>
                    </section>
                    <section>
                        <h4>오늘의 일기</h4>
                        <DiaryContentContainer>
                            <p>{data.content}</p>
                        </DiaryContentContainer>
                    </section>
                </article>
            </DiaryContainer>
        );
    }
}

export default Diary;
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";
interface dataProps{
    id:number,
    date:number,
    content:string,
    emotion:number,
  }
function Edit (){

    const [originData,setOriginData] = useState<dataProps>();
    const navigate = useNavigate();
    const {id} = useParams();
    
    const diaryList:dataProps[] = useContext(DiaryStateContext);
    
    useEffect(()=>{
        if(diaryList.length >=1){
            const targetDiary = diaryList.find(
                (it) => {
                    if(id){
                        return it.id === parseInt(id);
                    }
                    return false;
                }
            );
            
            if(targetDiary){
                setOriginData(targetDiary);
            } else{
                alert("없는 일기입니다.");
                navigate("/",{replace:true});
            }
        }
    },[id,diaryList]);
    return(
        <div>
            {originData && <DiaryEditor isEdit={true} originData={originData}></DiaryEditor>}
        </div>
    );
}

export default Edit;
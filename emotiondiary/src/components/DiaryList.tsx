import React, {useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import styled from 'styled-components';
import DiaryItem from "./DiaryItem";
interface dataProps{
    id:number,
    date:number,
    content:string,
    emotion:number,
  }
interface diaryListProps{
    diaryList:dataProps[];
};
interface sortOptionProps{
    value:string,
    name:string,
}
interface controlMenuProps{
    value:string,
    onChange: React.Dispatch<React.SetStateAction<string>>,
    optionList:sortOptionProps[],
}

const DiaryListContainer = styled.div`
    display: flex;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 30px;
`
const DiaryListSelect = styled.select`
    width: 50%;
    margin-right: 10px;
    border: none;
    border-radius: 5px;
    background-color: #ececec;
    
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 20px;
    padding-right: 20px;

    cursor: pointer;
    font-family: "Nanum Pen Script";
    font-size: 18px;
`
const Col = styled.div`
    width: 50%;
    display: flex;
    & button{
        width: 100%;
    }
`

const sortOptionList:sortOptionProps[] = [
    {value:"latest",name:"최신순"},
    {value:"oldest",name:"오래된 순"},
];

const filterOptionList = [
    {value:"all",name:"전부 다"},
    {value:"good", name:"좋은 감정만"},
    {value:"bad", name:"안 좋은 감정만"},
];

const ControlMenu  = ({value,onChange,optionList}:controlMenuProps)=>{
    return(
        <DiaryListSelect value={value} onChange={(e)=> onChange(e.target.value)}>
            {optionList.map((it,idx)=>(
                <option key={idx} value={it.value}>
                    {it.name}
                </option>
            ))}
        </DiaryListSelect>
    );
};


const DiaryList = ({diaryList}:diaryListProps) =>{
    const navigate = useNavigate();
    const [sortType,setSortType] = useState("latest");
    const [filter, setFilter] = useState("all");
    const getProcessedDiaryList = ()=>{
        
        const filterCallBack = (item:dataProps) =>{
            if(filter === "good"){
                return item.emotion<=3;
            }else{
                return item.emotion >3;
            }
        }
        const compare = (a:dataProps,b:dataProps)=>{
            if(sortType === "latest"){
                return b.date - a.date;
            } else{
                return a.date - b.date;
            }
        };
        const copyList:dataProps[] = JSON.parse(JSON.stringify(diaryList))
        const filteredList = filter === 'all' ? copyList: copyList.filter((it)=>filterCallBack(it));
    
        
        const sortedList = filteredList.sort(compare);
        
        return sortedList;
    }
    return(
        <>
            <DiaryListContainer>
                <Col>
                    <ControlMenu
                        value={sortType}
                        onChange={setSortType}
                        optionList = {sortOptionList}
                    ></ControlMenu>
                    <ControlMenu
                        value={filter}
                        onChange={setFilter}
                        optionList = {filterOptionList}
                    ></ControlMenu>
                </Col>
                <Col>
                    <MyButton type={'positive'} text={'새 일기 쓰기'} onClick={()=>navigate("/new")}></MyButton>
                </Col>
            </DiaryListContainer>
            {getProcessedDiaryList().map((it)=>(
                <DiaryListContainer>
                    <DiaryItem key = {it.id} {...it}></DiaryItem>
                </DiaryListContainer>
            ))}
        </>
    );
};

export default DiaryList;


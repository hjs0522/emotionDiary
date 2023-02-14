import React, { SetStateAction, useState } from "react";

interface dataProps{
    id:number,
    date:number,
    content:string,
    emotion:number,
  }

interface sortOptionProps{
    value:string,
    name:string,
}
interface controlMenuProps{
    value:string,
    onChange: React.Dispatch<React.SetStateAction<string>>,
    optionList:sortOptionProps[],
}

const sortOptionList:sortOptionProps[] = [
    {value:"latest",name:"최신순"},
    {value:"oldest",name:"오래된 순"},
];

const ControlMenu  = ({value,onChange,optionList}:controlMenuProps)=>{
    return(
        <select value={value} onChange={(e)=> onChange(e.target.value)}>
            {optionList.map((it,idx)=>(
                <option key={idx} value={it.value}>
                    {it.name}
                </option>
            ))}
        </select>
    );
};


const DiaryList = (diaryList:dataProps[]) =>{
    const [sortType,setSortType] = useState("latest");
    
    const getProcessedDiaryList = ()=>{
        const compare = (a:dataProps,b:dataProps)=>{
            if(sortType === "latest"){
                return b.date - a.date;
            } else{
                return a.date - b.date;
            }
        };
        const copyList:dataProps[] = JSON.parse(JSON.stringify(diaryList))
        const sortedList = copyList.sort(compare);
        
        return sortedList;
    }
    return(
        <div>
            <ControlMenu
                value={sortType}
                onChange={setSortType}
                optionList = {sortOptionList}
            ></ControlMenu>
            {getProcessedDiaryList().map((it)=>(
                <div key = {it.id}>{it.content}</div>
            ))}
        </div>
    );
};

export default DiaryList;


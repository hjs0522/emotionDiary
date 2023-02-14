import styled from "styled-components";

interface ButtonProps{
    text:string;
    type?:string;
    onClick: ()=>void;
}

const Button = styled.button`
    cursor: pointer;
    border: none;
    border-radius: 5px;
    padding-top:10px;
    padding-bottom:10px;
    padding-left: 20px;
    padding-right: 20px;
    font-size:18px;
    white-space: nowrap;
`
const DefaultButton = styled(Button)`
    background-color: #ececec;
    color: black;
`
const PositiveButton = styled(Button)`
    background-color: #64c964;
    color: white;
`
const NegativeButton = styled(Button)`
    background-color: #fd565f;
    color: white;
`


const MyButton = ({text,type='default',onClick}:ButtonProps)=>{
    if(type === 'positive'){
        return <PositiveButton onClick={onClick}>{text}</PositiveButton>
    }
    
    if(type === 'negative'){
        return <NegativeButton onClick={onClick}>{text}</NegativeButton>
    }
    
    return <DefaultButton onClick={onClick}>{text}</DefaultButton>
    
}

export default MyButton;
import styled from "styled-components";

interface HeaderProps{
    headText: string;
    leftChild: React.ReactElement;
    rightChild: React.ReactElement;
};

const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e2e2e2;
    padding-top: 20px;
    padding-bottom: 20px;
    & >div{
        display: flex;
    }
`

const HeadBtnLeft = styled.div`
    width: 25%;
    justify-content: start;
`
const HeadText = styled.div`
    width: 50%;
    font-size: 25px;
    justify-content: center;
`
const HeadBtnRight = styled.div`
    width: 25%;
    justify-content: end;
`

const MyHeader = ({headText,leftChild,rightChild}:HeaderProps)=>{
    return (
        <HeaderContainer>
            <HeadBtnLeft>{leftChild}</HeadBtnLeft>
            <HeadText>{headText}</HeadText>
            <HeadBtnRight>{rightChild}</HeadBtnRight>
        </HeaderContainer>
    )
}

export default MyHeader;
import React from 'react'
import styled from 'styled-components';

const MeetingRight = (prop) => {
    
    const date = prop.prop.meetingDate;
    let k;
    let a;
    k = date.split("-")
    a= k.slice(1)
    a=a.join('.');
    
  return (
    <StBox>
        <StInfo>
            <StTime>
                <Stdate>{a}</Stdate>
                <StLong>{prop.prop.meetingTime} - {prop.prop.meetingOverTime}</StLong>
            </StTime>
            <StLine/>
            <StContent>
                <StTitle>{prop.prop.meetingTitle}</StTitle>
                <StOwner>주최자 : {prop.prop.meetingCreator}</StOwner>
            </StContent>
        </StInfo>
    </StBox>
  )
}

const StOwner = styled.div`
    width: 180px;
    height: 20px;
    margin : 0.5rem 0 0 0;
    font-weight: 500;
    font-size: 12px;
`;

const StTitle = styled.div`
    width: 180px;
    height: 20px;
    font-weight: 500;
    font-size: 14px;
`;


const StContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 180px;
    height:44px;
    margin : 0 0 0 1.5rem;
`;

const StLine = styled.div`
    height : 54px;
    width: 3px;
    background-color: black;
`;

const StLong = styled.div`
    width : 80px;
    height : 20px;
    font-weight: 500;
    font-size: 12px;
`;

const Stdate = styled.div`
    width : 80px;
    height : 54px;
    font-weight: 700;
    font-size: 24px;
`;

const StTime = styled.div`
    display: flex;
    flex-direction: column;
    width :103px;
`;


const StInfo = styled.div`
    display: flex;
    width : 300px;
    height:54px;

`;

const StBox = styled.div`
    display: flex;
    align-items: center;
    padding: 24px;
    width : 342px;
    height : 50.4px;
    margin : 0.7rem 0 0 0;
    background-color: white;
    border-radius : 6px;
`;
export default MeetingRight
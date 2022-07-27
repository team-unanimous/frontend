import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useGetPassed } from '../Hooks/useGetPassed';
import { useGetOnAir } from '../Hooks/useGetOnAir'
import { useGetReserve } from '../Hooks/useGetReserve'
import { useMutation } from 'react-query';
import DetailModalReserve from './DetailModalReserve';
import DetailModalOnAir from './DetailModalOnAir';
import DetailModalPassed from './DetailModalPassed';
import doorIcon from '../img/outdoor.png'
import apis from '../api/main';

const MeetingManage = () => {

  const [openOnAir, setOpenOnAir] = useState(false);
  const [openReserve, setOpenReserve] = useState(false);
  const [openPassed, setOpenPassed] = useState(false);
  const [state, setState] = useState(0);
  const [meetingId,setMeetingId] = useState("");
  const [meetingTitle,setMeetingTitle] = useState();
  const [meetingDate,setMeetingDate] = useState();
  const [meetingTime,setMeetingTime] = useState();
  const [meetingCreator,setMeetingCreator] = useState();
  const [issues,setIssues] = useState();
  const teamId = useParams().teamid;

  const {data:passed} = useGetPassed({teamId});
  const {data:onAir} = useGetOnAir({teamId});
  const {data:reserve} = useGetReserve({teamId});

  const navigate = useNavigate();

  const closeModal1 = () => {
    setOpenOnAir(false);
  }
  const closeModal2 = () => {
    setOpenPassed(false);
  }
  const closeModal3 = () => {
    setOpenReserve(false);
  }

  //미팅 삭제 부분
  const deleteMeet = async(data)=>{
    const datas = await apis.deleteMeet(data);
    return datas;
  }

  const {mutate} = useMutation(deleteMeet,{
      onSuccess:()=>{
          alert("미팅삭제완료");
      },
      onError:()=>{
          alert("미팅삭제실패");
      }
  })

  const delet = (meetingId) => {
      mutate({
          meetingId : meetingId
      })
  }

  return (
    <>
      <DetailModalOnAir
        meetingTitle={meetingTitle}
        meetingDate={meetingDate}
        meetingTime={meetingTime} 
        meetingCreator={meetingCreator}
        issues={issues}
        open={openOnAir} 
        meetingId={meetingId} 
        close={closeModal1}/>
      <DetailModalPassed
        meetingTitle={meetingTitle}
        meetingDate={meetingDate}
        meetingTime={meetingTime} 
        meetingCreator={meetingCreator}
        issues={issues}
        open={openPassed} 
        meetingId={meetingId} 
        close={closeModal2}/>
      <DetailModalReserve 
        teamId = {teamId}
        meetingTitle={meetingTitle}
        meetingDate={meetingDate}
        meetingTime={meetingTime} 
        meetingCreator={meetingCreator}
        issues={issues}
        open={openReserve} 
        meetingId={meetingId} 
        close={closeModal3}/>
      <StRight>
        <StBlackBox>
          <StBlack0 state={state} onClick={()=>{setState(0)}}>진행중 미팅</StBlack0>
          <StBlack1 state={state} onClick={()=>{setState(1)}}>이전 미팅</StBlack1>
          <StBlack2 state={state} onClick={()=>{setState(2)}}>예약된 미팅</StBlack2>
        </StBlackBox>
        
        <StfListBox>  
          <StfInListBox>
          <StListTop>
            <StDateTop>날짜</StDateTop>
            <StHostTop>주최자</StHostTop>
            <StTitleTop>회의명</StTitleTop>
          </StListTop>
          {state==0?
          <>{onAir?.map((value,index)=>
            <div key={index}>
              <StInfoBox>
                <StList onClick={
                  ()=>{
                    setMeetingId(value.meetingId); 
                    setOpenOnAir(true);
                    setMeetingTitle(value.meetingTitle);
                    setMeetingDate(value.meetingDate);
                    setMeetingTime(value.meetingTime);
                    setMeetingCreator(value.meetingCreator);
                    setIssues(value.issues);
                    }} key={index}>
                  <StDateBox>
                    <StDate>{value.meetingDate}</StDate>
                    <StTime>{value.meetingTime}~</StTime>
                  </StDateBox>
                  <StHost>{value.meetingCreator}</StHost>
                  <StTitle>{value.meetingTitle}</StTitle>
                </StList>
                <StButton>
                  <StIcon src={doorIcon}/>참여
                </StButton>
              </StInfoBox>
              
            </div>)}
          </>:<></>}
          {state==1?
          <>{passed?.map((value,index)=>
            <div key={index}><StInfoBox>
            <StList onClick={
              ()=>{
                setMeetingId(value.meetingId); 
                setOpenPassed(true);
                setMeetingTitle(value.meetingTitle);
                setMeetingDate(value.meetingDate);
                setMeetingTime(value.meetingTime);
                setMeetingCreator(value.meetingCreator);
                setIssues(value.issues);
                }} key={index}>
              <StDateBox>
                <StDate>{value.meetingDate}</StDate>
                <StTime>{value.meetingTime}~</StTime>
              </StDateBox>
              <StHost>{value.meetingCreator}</StHost>
              <StTitle>{value.meetingTitle}</StTitle>
            </StList>
            </StInfoBox></div>)}
          </>:<></>}
          {state==2?
          <>{reserve?.map((value,index)=>
            <div key={index}><StInfoBox key={index}>
              <StList onClick={
                ()=>{
                  setMeetingId(value.meetingId); 
                  setOpenReserve(true);
                  setMeetingTitle(value.meetingTitle);
                  setMeetingDate(value.meetingDate);
                  setMeetingTime(value.meetingTime);
                  setMeetingCreator(value.meetingCreator);
                  setIssues(value.issues);
                  }} key={index}>
                <StDateBox>
                  <StDate>{value.meetingDate}</StDate>
                  <StTime>{value.meetingTime}-{value.meetingOverTime}</StTime>
                </StDateBox>
                <StHost>{value.meetingCreator}</StHost>
                <StTitle>{value.meetingTitle}</StTitle>
              </StList>
              <StButtonBox>
                <StButton>
                  <StIcon src={doorIcon}/>참여
                </StButton>
                <StSmallButton onClick={()=>{navigate(`/teamboard/${teamId}/${value.meetingId}/meetingeditone`)}}>수정</StSmallButton>
                <StSmallButton onClick={()=>{delet(value.meetingId)}}>삭제</StSmallButton>
              </StButtonBox>
            </StInfoBox></div>)}
          </>:<></>}
          </StfInListBox>
        </StfListBox>
      </StRight>
    </>
  )
}

const StButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  width : 290px;
  margin : 0 3px 0 0 ;
`;

const StLine2 = styled.div`
  width : 900px;
  height : 2px;
  background-color: #EAEAEA;
`;

const StInfoBox = styled.div`
  display: flex;
  align-items: center;
  width: 1184px;
  height: 94px;
  background-color: white;
  margin : 8px 0 8px 0;
`;

const StIcon = styled.img`
  width : 18px;
  height : 18px;
  margin : 0 0 0 0;
`;

const StSmallButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width : 64px;
  height : 35px;
  margin : 0 0 0 0;
  border-radius: 6px;
  border : 1px solid black;
  color : black;
`;

const StButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width : 58px;
  height : 18px;
  padding : 10px 20px 10px 20px;
  margin : 0 0 0 0;
  border-radius: 6px;
  color : black;
`;

const StDateBox = styled.div`
  display: flex;
  flex-direction: column;
  height : 46px;
`;

const StTime = styled.div`
  display: flex;
  justify-content: center;
  width : 120px;
  height : 20px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #818181;
`;

const StTitle = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width : 340px;
  height : 46px;
  padding : 0 0px 0 20px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
`;

const StHost = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width : 120px;
  height : 46px;
  padding : 0 0px 0 20px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
`;

const StTitleTop = styled.div`
  display: flex;
  justify-content: start;
  width : 320px;
  height : 20px;
  padding : 0 0 0 20px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #5C5C5C;
`;

const StHostTop = styled.div`
  display: flex;
  justify-content: start;
  width : 120px;
  height : 20px;
  padding : 0 0 0 20px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #5C5C5C;
`;

const StDateTop = styled.div`
  display: flex;
  justify-content: start;
  width : 120px;
  height : 20px;
  padding : 0 0 0 20px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #5C5C5C;
`;

const StDate = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width : 120px;
  height : 46px;
  padding : 0 0px 0 20px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;

`;

const StListTop = styled.div`
  display: flex;
  align-items: center;
  width: 1160px;
  height: 20px;
  padding : 18px 0 18px 24px;
  margin : 5px 0 5px 0;
  border-radius: 6px;
  background: rgba(153, 213, 255, 0.3);
`;

const StList = styled.div`
  display: flex;
  align-items: center;
  width: 1184px;
  height: 94px;
  margin : 0 0 0 0;
  border-radius: 6px;
  transition: 0.1s ease-in-out;
  &:hover{
    background-color:#E2E2E2 ;
  }
  cursor: pointer;
`;

const StfInListBox = styled.div`
  display: flex;
  flex-direction: column;
  width : 1184px;
  height : 50vh;
  margin: 36px 0 0 38px;
`;

const StfListBox = styled.div`
  display: flex;
  flex-direction: column;
  width : 1184px;
  height : 50vh;
  margin: 20px auto 0 0px;
  background-color: #F2F6F9;
  border-top-left-radius: 20px;
`;

const StBlackBox = styled.div`
  display: flex;
  width : 320px;
  height : 20px;
  margin : 80px auto 0 40px;
  z-index: 1; 
`;

const StBlack2 = styled.div`
    display: flex;
    justify-content: center;
    width : 150px;
    height : 20px;
    border-bottom: ${props=>props.state==2?"4px solid #2396F0;":"4px solid #D7D7D7"};
    color : ${props=>props.state==2?" #2396F0;":"#D7D7D7;"};
    padding : 0 0 20px 0;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;
`;

const StBlack1 = styled.div`
    display: flex;
    justify-content: center;
    width : 150px;
    height : 20px;
    border-bottom: ${props=>props.state==1?"4px solid #2396F0;":"4px solid #D7D7D7"};
    color : ${props=>props.state==1?" #2396F0;":"#D7D7D7;"};
    padding : 0 0 20px 0;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;
`;

const StBlack0 = styled.div`
    display: flex;
    justify-content: center;
    width : 150px;
    height : 20px;
    border-bottom: ${props=>props.state==0?"4px solid #2396F0;":"4px solid #D7D7D7"};
    color : ${props=>props.state==0?" #2396F0;":"#D7D7D7;"};
    padding : 0 0 20px 0;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;
`;

const StLine = styled.div`
  width : 100%;
  height : 3px;
  background-color: #EAEAEA;
`;

const StRight = styled.div`
  width : 1184px;
  height : 86.5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 38px 36px 38px;
  overflow-x: hidden;
  
  ::-webkit-scrollbar{
    width:10px;
  }
  ::-webkit-scrollbar-thumb{
    background-color: #2f3542;
    border-radius: 100px;
  }
  ::-webkit-scrollbar-track{
    
    border-radius: 1rem;
  }
`;

export default MeetingManage
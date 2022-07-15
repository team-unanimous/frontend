import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import apis from "../api/main";
import { useRef } from "react";
import styled from "styled-components";

const TeamMake = () => {
  const navigate = useNavigate();
  // const teamImageRef = useRef(null);
  const teamNameRef = useRef(null);

  const makeTeam = async (teamInfo) => {
    return apis.postTeam(teamInfo);
  }

  const { mutate } = useMutation(makeTeam, {
    onSuccess: (data) => {
      console.log(data.data);
      navigate('/teammakesuccess')
    },
    onError: (error) => {
      console.log(error)
    }
  });

  const teamMakeHandler = () => {
    const data = {
      teamImage: "randomImageURL",
      teamname: teamNameRef.current.value
    }
    console.log(data);
    mutate(data)
  }

  return (
    <>
      <StBox>
        <StContainer>
          {/* // 이미지 업로드 기능 추가 */}
          <StTitle>새로운 팀 정보를 입력해주세요</StTitle>
          {/* <img src="" ref={teamImageRef}></img> */}
          <StInputWrapper>
            <StEmailBox>
              <StEmailTitle>팀명</StEmailTitle>
              <StEmailInputBox>
                <StPwInput type='text' placeholder='팀명 입력' ref={teamNameRef} maxLength="10" />
              </StEmailInputBox>
              <StEmailWarnning>
                최대 10자
              </StEmailWarnning>
            </StEmailBox>
            <StEmailBox>
              <StEmailTitle>팀원 추가하기</StEmailTitle>
              <StEmailInputBox>
                <StPwInput type='text' placeholder='이메일 입력' />
                <StEmailButton>
                  추가
                </StEmailButton>
              </StEmailInputBox>
              <StEmailWarnning>
              </StEmailWarnning>
            </StEmailBox>
          </StInputWrapper>
          <StBtBox>
            <StCancel onClick={() => navigate('/teamselect')}>
              취소
            </StCancel>
            <StAgree onClick={teamMakeHandler}>
              완료
            </StAgree>
          </StBtBox>
        </StContainer>
      </StBox>
    </>
  )
}
const StBox = styled.div`
    width : 100%;
    height : 100vh;
    display: flex;
    flex-direction: row;
    margin: 0;
    padding : 0;
    justify-content: center;
    align-items: center;
    order: 1;
    `

const StContainer = styled.div`
    /* Frame 270 */
    /* Auto layout */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0px;
    /* gap: 60px; */
    
    /* position: absolute; */
    width: 610px;
    height: 537px;
    `
const StTitle = styled.div`
    /* 새로운 팀 정보를 입력해주세요 */
    width: 610px;
    height: 58px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 43px;
    line-height: 58px;
    /* identical to box height */
    text-align: center;
    color: #000000;
    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 0;
    `
const StInputWrapper = styled.div`
    /* Frame 268 */
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px;
    gap: 25px;
    
    width: 540px;
    height: 302px;
    margin-top: 60px;
    
    /* Inside auto layout */
    
    flex: none;
    order: 0;
    flex-grow: 0;
`
const StTeamNameInputBox = styled.div`
        
`
const StEmailWarnning = styled.div`
  height : 19px;
  font-weight: 500;
  font-size: 16px;
`;

const StEmailButton = styled.button`
  width : 132px;
  height : 49px;
  margin : 0 0 0 9px;
  background-color: black;
  color : white;
  border-radius: 6px;
`;

const StPwInput = styled.input`
  width : 541px;
  height : 44px;
  border-radius: 6px;
  border: 1px solid #000000;
  
`;

const StEmailInput = styled.input`
  width : 390px;
  height : 44px;
  border-radius: 6px;
  border: 1px solid #000000;
`;

const StEmailInputBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width : 541px;
  height : 49px;
`;

const StEmailTitle = styled.div`
  width : 200px;
  height : 19px;
  font-weight: 700;
  font-size: 15px;
  
`;

const StEmailBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width : 541px;
  height: 100px;
  margin : 0 0 0 0;
`;
const StAgree = styled.button`
  width : 200px;
  height : 54px;
  background-color: black;
  font-weight: 700;
  font-size: 20px;
  color : white;
  border-radius: 0.375rem;
  border: 1px solid #000000;
  cursor: pointer;
`;

const StCancel = styled.button`
  width : 200px;
  height : 54px;
  font-weight: 700;
  font-size: 20px;
  border-radius: 0.375rem;
  cursor: pointer;
`;

const StBtBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 418px;
  height: 54px;
  margin : 3.75rem 0 0 0;
`;



export default TeamMake;
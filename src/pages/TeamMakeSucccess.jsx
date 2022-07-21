import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const TeamMakeSuccess = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        setTimeout(()=>{navigate(`/teamboard/`)}, 3000 // teamId 받아와야함
        )
    })

    return (
        <>
            <StBox>
                <StContainer>
                    <h1 style={{fontSize:"100px"}}>팀 생성 성공!</h1>
                    3초 후에 팀 게시판으로 이동합니다.
                    {/* <img src={hyunjatime}/> */}
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

export default TeamMakeSuccess;
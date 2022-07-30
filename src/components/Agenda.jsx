import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from 'react-router';
import { useSelector } from "react-redux/es/exports";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { getCookie } from "../Cookie";
import apis from "../api/main";
import axis from "../api/sub"
import { useQuery, useMutation } from "react-query";
import useGetIssueList from "../Hooks/useGetIssueList"
import { useGetMeetSpecific } from "../Hooks/useGetMeetSpecific"
import leftbtn from "../img/icon_arrow_left.svg"
import rightbtn from "../img/Icon_arrow_right.svg"
import stampbtn from "../img/stamp.svg"
import useGetMeetList from "../Hooks/useGetMeetList"
import jwt_decode from "jwt-decode";


const Agenda = ({ main }) => {

    const idarray = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 },
        { id: 10 }
    ]

    const meetID = useParams().sessionid;
    const token = getCookie('token');
    const decoded = jwt_decode(getCookie('token'));

    const sock = new SockJS("https://sparta-ysh.shop/ws-stomp");
    const ws = Stomp.over(sock);

    // get으로 받은 안건 내용 저장
    const [agendalist, setAgendalist] = useState(null);
    // 내가 보여줄 안건내용 저장
    const [msg, setMsg] = useState(null);
    const [numberagenda, setNumberagenda] = useState(0);
    const [stampvalue, setStampvalue] = useState(null);
    const [number, setNumber] = useState(1);

    const datas = {
        token: token,
        roomId: meetID
    }

    // 웹소켓 연결, 구독 // 구독주소 채팅방이랑 달라야됨
    const wsConnect = (data) => {
        try {
            ws.connect(
                { token: data.token }, () => {
                    ws.subscribe(`/sub/api/chat/rooms/${data.roomId}`,
                        (resp) => {
                            const newMessage = JSON.parse(resp.body);
                            if (newMessage.type == "ISSUE") {
                                // 문자열 해제
                                const getagenda = JSON.parse(newMessage.message);
                                setMsg(getagenda[0].issueContent)
                                setNumber(getagenda[1].id)
                                console.log("안건 받기 완료")
                                console.log(numberagenda)

                            }
                            if (newMessage.type == "STAMP") {
                                const getarray = JSON.parse(newMessage.message);
                                setNumber(getarray.id)
                            }
                        },
                        { token: token }
                    );
                });
        } catch (error) {
        }
    }



    useEffect(() => {
        wsConnect(datas); // 소켓연결
        useGetIssueLists({ meetID })
    }, [])


    // get 임시로
    const useGetIssueLists = async ({ meetID }) => {
        const { data } = await apis.getIssueList({ meetID });


        // 안건정보 state저장
        setAgendalist(data)
        return data;
    }


    // 안건 서버로 보내기
    const HandleSend = () => {
        try {
            const data = {
                type: "ISSUE",
                roomId: meetID,
                sender: "string",
                message: JSON.stringify([agendalist[numberagenda], idarray[numberagenda]]),
            }
            const token = getCookie("token")
            waitForConnection(ws, function () {
                ws.send("/pub/api/chat/message", { token: token }, JSON.stringify(data));
            })
        } catch (error) {

        }
    }

    // 웹소켓이 연결될 때 까지 실행하는 함수 
    function waitForConnection(ws, callback) {
        setTimeout(
            function () {
                // 연결되었을 때 콜백함수 실행
                if (ws.ws.readyState === 1) {
                    callback();
                    // 연결이 안 되었으면 재호출
                } else {
                    waitForConnection(ws, callback);
                }
            },
            1 // 밀리초 간격으로 실행
        );
    }

    const numberminus = () => {
        setNumberagenda(numberagenda => numberagenda - 1)
        HandleSend();
    }

    const numberplus = () => {
        setNumberagenda(numberagenda => numberagenda + 1)
        HandleSend();
    }

    // console.log(numberagenda)
    // console.log(msg)
    // console.log(agendalist)

    // // 방장아닌유저 버튼사라짐 확실하게 고침
    // console.log(main)
    // console.log(main?.meetingCreator)
    return (
        <>
            <Bigbox>
                <button onClick={HandleSend}>send</button>
                {1 <= numberagenda && main?.meetingCreator === decoded?.USER_NICKNAME ?
                    <StImgLeft src={leftbtn} onClick={numberminus} />
                    : <Stnumbtn />
                }
                <div>{main?.meetingTitle}의 {number}번째 안건<br />{msg}</div>
                {agendalist?.length - 2 >= numberagenda && main?.meetingCreator === decoded?.USER_NICKNAME ?
                    <StImgRight src={rightbtn} onClick={numberplus} />
                    : <Stnumbtn />
                }
                {stampvalue ?
                    <StstampBtn src={stampbtn} /> : <></>
                }
            </Bigbox>
        </>
    );
}

const StImgRight = styled.img`
    width: 48px;
    height: 48px;
    cursor: pointer;
`

const StImgLeft = styled.img`
    width: 48px;
    height: 48px;
    cursor: pointer;
`

const Stex = styled.div`
    width: 182px;
    height: 100px;
    background-color: gray;
`

const Stchangeex = styled.div`
    width: 182px;
    height: 100px;
    background-color: #F1F1F1;
`

const StstampBtn = styled.img`
display: flex;
justify-content: center;
align-items: center;
box-sizing: border-box;
width: 182px;
height: 182px;
position: absolute;
left: 507px;
top: 80px;
`

const Stnumbtn = styled.div`
width: 46px;
height: 46px;
border:solid 1px #F5E8CD;
`


const Bigbox = styled.div`
    display: flex;
    width: 1129px;
    height: 324px;
    left: 184px;
    top: 285px;
    position: absolute;
    z-index: 21;
    border-radius: 36px;
    justify-content: space-between;
    align-items: center;
`

export default Agenda;
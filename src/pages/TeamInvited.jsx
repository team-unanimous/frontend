import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import apis from "../api/main";
import { useRef } from "react";

const TeamInvited = () => {
    const uuidRef = useRef()

    const findUUID = (UUIDInfo)=> {
        return apis.postInviteTeam(UUIDInfo);
    }

    const { mutate } = useMutation(findUUID, {
        onSuccess: (data) => {
            console.log(data.data)
        },
        onError: (data)
    })

    const teamFindHandler = ()=>{
        const data = {
            uuid : uuidRef.current.value
        }
        console.log(data);
        mutate(data);
    }
    

    return (
        <>
            <input type={"text"} placeholder={"UUID"} ref={uuidRef}></input>
            <button onClick={teamFindHandler}>팀 찾아보기</button>

        </>
    )
}

export default TeamInvited;
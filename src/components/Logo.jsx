import React from 'react'
import {useNavigate} from "react-router-dom";

const Logo = () => {
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate("/")} className=" flex flex-row items-center justify-center">
            <img  className="size-15 cursor-pointer" src={"./dbdRandom.png"} alt="DBDRand Logo"></img>
            <p className="text-gray-500 cursor-pointer ">DBDRand</p>
        </div>
    )
}
export default Logo

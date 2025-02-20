import React, {useEffect, useState} from 'react'
import MakeYourBuildCard from "./MakeYourBuildCard.jsx";

const MakeYourBuildLayout = () => {
    const [role, setRole] = useState("killer");

    return (
        <section className=" mt-[80px] text-white flex flex-col gap-4 min-w-[412px]">
            <div className="pb-5 flex flex-row items-center justify-between ">
                <h2 className=" text-3xl">{role === "killer" ? "Killer" : "Survivor"} Builds</h2>
                <div className="flex gap-4" >
                    <img className='cursor-pointer size-20' onMouseOver={() => {}} onClick={() => {setRole(role === "killer" ? "survivor" : "killer")}} src={role === "killer" ? './killerIcon.png' : 'survivorIcon.png'} alt="Role Image" />
                </div>
            </div>
            <div className="w-full h-[5px] bg-gray-400 "/>
            <MakeYourBuildCard role={role} />
        </section>
    )
}
export default MakeYourBuildLayout

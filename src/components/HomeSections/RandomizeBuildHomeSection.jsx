import React from 'react'
import {useNavigate} from "react-router-dom";

const RandomizeBuildHomeSection = ({isVisible}) => {
    const navigate = useNavigate();
    return (
        <div className={`relative mt-[80px] w-full h-[600px] ${isVisible ? 'opacity-100 blur-0 translate-x-0 transition-all duration-1000' : 'opacity-0 blur-[5px] -translate-x-full transition-all duration-1000'}`}>
            <div className="absolute inset-0 bg-random-hand bg-cover bg-center opacity-50 "></div>
            <div className="relative text-center flex flex-col text-white ">
                <h1 className="text-6xl mt-[75px] font-bold tracking-tight leading-[48px]">Randomize your build</h1>
                <p className="w-[600px] mx-auto text-2xl mt-[30px] text-gray-300 tracking-tight leading-[28.8px]"> Create a fully random Dead by Daylight build with four random perks! This feature picks perks for either survivor or killer, making every match unpredictable. Test your skills with unexpected combinations and new strategies!</p>
                <button onClick={() => navigate("/randomizer")} className="mt-[45px] text-2xl bg-gray-600 rounded-3xl p-4 pl-8 pr-8  mx-auto cursor-pointer">Try Randomizing</button>
            </div>
        </div>
    )
}
export default RandomizeBuildHomeSection

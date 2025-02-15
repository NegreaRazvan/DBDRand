import React from 'react'
import CommunityCard from "./CommunityCard.jsx";

const CommunityBuildsHomeSection = () => {
    return (
        <div className=" bg-secondary flex flex-col pt-5 pl-5 w-full  gap-30 sm:h-[600px] h-[900px] ">
            <h2 className="sm:mt-[20px] mt-[80px] mx-auto font-extrabold text-center text-6xl w-[600px] tracking-tight leading-[48px]">Check out community made builds</h2>
            <div className="flex flex-col sm:flex-row gap-15 sm:gap-0 sm:justify-around w-full items-center">
                <CommunityCard text={"Explore unique Dead by Daylight builds created by the community! From fun meme setups to competitive strategies, find builds for both killers and survivors tailored to different playstyles."} />
                <CommunityCard text={"Rate, discuss, and share your own creations! See what works best, try new strategies, and get inspired by experienced players to refine your own loadouts."}/>
            </div>
        </div>
    )
}
export default CommunityBuildsHomeSection

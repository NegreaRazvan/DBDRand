import React from 'react'

const CommunityBuilds = () => {
    return (
        <div className="bg-secondary flex flex-col  pt-5 pl-5  w-full gap-30 sm:h-[500px] h-[700px]">
            <h2 className="sm:mt-[20px] mt-[80px] mx-auto font-bold text-center text-6xl w-[600px] tracking-tight leading-[48px]">Check out community made builds</h2>
            <div className="flex flex-col sm:flex-row gap-15 sm:gap-0 sm:justify-around w-full items-center">
                <p className="w-[400px] text-2xl tracking-tight leading-[28.8px] text-center">Explore unique Dead by Daylight builds created by the community! From fun meme setups to competitive strategies, find builds for both killers and survivors tailored to different playstyles.</p>
                <p className="w-[400px] text-2xl tracking-tight leading-[28.8px] text-center">Rate, discuss, and share your own creations! See what works best, try new strategies, and get inspired by experienced players to refine your own loadouts.</p>
            </div>
        </div>
    )
}
export default CommunityBuilds

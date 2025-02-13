import React from 'react'

const MakeYourBuild = () => {
    return (
        <div className=" mt-[80px] p-10  h-[600px]">
            <div className=" flex flex-row gap-15 ">
                <div className="relative flex flex-col text-white ">
                    <h1 className="text-6xl font-bold tracking-tight leading-[48px]">Make your own builds</h1>
                    <p className="w-[600px] text-2xl mt-[30px] tracking-tight leading-[28.8px] text-gray-300"> Create your own custom Dead by Daylight builds with ease! Choose your favorite perks, items, add-ons, and offerings to craft the perfect strategy for either survivor or killer</p>
                </div>
                <img className=" w-[450px] h-auto object-cover" src={"./builds.png"}/>
            </div>
        </div>
    )
}
export default MakeYourBuild

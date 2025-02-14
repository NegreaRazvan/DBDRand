import React from 'react'

const MakeYourBuild = () => {
    return (
            <div className=" items-center just flex flex-col sm:flex-row justify-around h-[700px] w-full">
                <div className=" ml-4 flex flex-col text-white text-center sm:text-left">
                    <h2 className="text-6xl sm:mt-0 mt-[80px] font-bold tracking-tight leading-[48px]">Bring your builds to life</h2>
                    <p className="w-[600px] text-2xl mt-[30px] tracking-tight leading-[28.8px] text-gray-300"> Create your own custom Dead by Daylight builds with ease! Choose your favorite perks, items, add-ons, and offerings to craft the perfect strategy for either survivor or killer</p>
                </div>
                <img className=" w-[450px] h-auto object-cover" src={"./builds.png"}/>
            </div>
    )
}
export default MakeYourBuild

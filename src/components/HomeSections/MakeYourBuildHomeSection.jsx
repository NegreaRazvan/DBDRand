import React from 'react'

const MakeYourBuildHomeSection = ({isVisible}) => {
    return (
            <div  className={`items-center flex flex-col sm:flex-row justify-around h-[700px] w-full ${isVisible ? 'opacity-100 blur-0 translate-x-0 transition-all duration-1000' : 'opacity-0 blur-[5px] translate-x-full transition-all duration-1000'}`}>
                <div className="pl-4 flex flex-col text-white sm:text-left sm:justify-around justify-center">
                    <h2 className="w-[400px] text-6xl sm:mt-0 font-bold tracking-tight leading-[60px] ">Bring your builds to life</h2>
                    <p className="sm:w-[600px] w-[500px] text-2xl mt-[30px] tracking-tight leading-[28.8px] text-gray-300"> Create your own custom Dead by Daylight builds with ease! Choose your favorite perks, items, add-ons, and offerings to craft the perfect strategy for either survivor or killer</p>
                </div>
                <img className=" w-[450px] h-auto object-cover" src={"./builds.png"}/>
            </div>
    )
}
export default MakeYourBuildHomeSection

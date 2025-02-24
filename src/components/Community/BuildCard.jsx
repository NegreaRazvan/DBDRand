import React from 'react'


const BuildCard = ({build : {add_on_1_rarity,add_on_2_rarity,add_on_1_picture,add_on_2_picture,offering_rarity,offering_picture, character_picture,power_picture, profile_picture, user_name, youtube_link, date_created,perk_1_picture,perk_2_picture,perk_3_picture,perk_4_picture}}) => {
    return (
        <div className='relative w-full bg-gray-400 flex flex-row border p-2 border-black items-center '>
            <div className='flex flex-row gap-2 justify-center'>
                <div>
                    <div className="relative z-0">
                        <img src={'./CharPortrait_bg.png'} className="absolute z-0 size-20" />
                    </div>
                    <img className='relative z-10 size-20' src={`./portraits/${character_picture.split("/").pop()}`} alt='Character Picture' />
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <img className='size-8' src={ './dbdRandom.png'} alt='Profile Picture' />
                    <p className='text-center'>{user_name}</p>
                </div>
                <div className=' flex justify-between'>
                    <p>{new Date(date_created).getDate() === (new Date()).getDate() ? 'today' : `${Math.ceil((new Date() - new Date(date_created)) / 86400000)} ${Math.ceil((new Date() - new Date(date_created)) / 86400000)===1 ? 'day' : 'days'} ago` } </p>
                    <div></div>
                    {youtube_link && (
                        <img className='size-6' src={'./youtubeLogo.png'} alt='YouTube Video' />
                    )}
                </div>
            </div>
            <div className='absolute left-[240px] flex gap-10 items-center' >
                <div className='  bg-primary h-[100px] w-1'></div>
                <div className='flex flex-row items-center '>
                    <div>
                        <div className="relative z-0">
                            <img src={'./powers/backgroundPower.png'} className="absolute z-0 size-20" />
                        </div>
                        <img className='relative z-10 size-20' src={`./powers/${power_picture.split("/").pop()}`}/>
                    </div>
                    <img className='size-10' src={'./plus.png'}/>
                    <div>
                        <div className="relative z-0">
                            <img src={`./addOns/${add_on_1_rarity}.png`} className="absolute z-0 size-15" />
                        </div>

                        <img className='relative z-10 size-15' src={`./addOns/${add_on_1_picture.split("/").pop()}`}/>
                    </div>
                    <div>
                        <div className="relative z-0">
                            <img src={`./addOns/${add_on_2_rarity}.png`} className="absolute z-0 size-15" />
                        </div>

                        <img className='relative z-10 size-15' src={`./addOns/${add_on_2_picture.split("/").pop()}`}/>
                    </div>
                </div>
                <div className='bg-primary h-[100px] w-1'></div>
                <div className='flex flex-row items-center '>
                    <div>
                        <div className="relative z-0">
                            <img src={'./perkPortrait.png'} className="absolute z-0 size-20" />
                        </div>
                        <img className='relative z-10 size-20' src={`/perksImages/${perk_1_picture.split("/").pop()}`}/>
                    </div>
                    <div>
                        <div className="relative z-0">
                            <img src={'./perkPortrait.png'} className="absolute z-0 size-20" />
                        </div>
                        <img className='relative z-10 size-20' src={`/perksImages/${perk_2_picture.split("/").pop()}`}/>
                    </div>
                    <div>
                        <div className="relative z-0">
                            <img src={'./perkPortrait.png'} className="absolute z-0 size-20" />
                        </div>
                        <img className='relative z-10 size-20' src={`/perksImages/${perk_3_picture.split("/").pop()}`}/>
                    </div>
                    <div>
                        <div className="relative z-0">
                            <img src={'./perkPortrait.png'} className="absolute z-0 size-20" />
                        </div>
                        <img className='relative z-10 size-20' src={`/perksImages/${perk_4_picture.split("/").pop()}`}/>
                    </div>
                </div>
                <div className='bg-primary h-[100px] w-1 flex justify-center'></div>
                <div>
                    <div className="relative">
                        <img src={`./offerings/${offering_rarity}.png`} className="absolute size-20 z-0" />
                    </div>
                    <img className='relative z-10 size-20' src={`./offerings/${offering_picture.split("/").pop()}`}/>
                </div>
            </div>
        </div>
    )
}
export default BuildCard

import React from 'react'

const BuildCard = ({build : {character_picture, profile_picture, user_name, youtube_link, date_created}}) => {
    return (
        <div className=' w-full bg-gray-400 flex flex-row gap-2 border border-black items-center justify-center'>
            <div className='flex flex-row p-5 gap-5 justify-center'>
                <img className='size-20'  src={ './default.png'} alt='Character Picture' />
                <div className='flex flex-col items-center justify-center'>
                    <img className='size-8' src={ './default.png'} alt='Profile Picture' />
                    <p>{user_name}</p>
                </div>
                <div className=' flex justify-between'>
                    <p>{new Date(date_created).getDate() === (new Date()).getDate() ? 'today' : `${(date_created-new Date())/86400000} days ago`}</p>
                    <div></div>
                    {youtube_link && (
                        <img className='size-6' src={'./youtubeLogo.png'} alt='YouTube Video' />
                    )}
                </div>
            </div>
            <div className=' bg-primary h-[100px] w-1'></div>
            <div className='flex flex-row items-center pr-5'>
                <img className='ml-4 size-25' src={'./default.png'}/>
                <img className='size-10' src={'./plus.png'}/>
                <img className='mr-2 size-15' src={'./default.png'}/>
                <img className=' size-15' src={'./default.png'}/>
            </div>
            <div className='bg-primary h-[100px] w-1'></div>
            <div className='flex flex-row items-center pr-5 gap-3'>
                <img className='ml-4 size-20' src={'./default.png'}/>
                <img className=' size-20' src={'./default.png'}/>
                <img className=' size-20' src={'./default.png'}/>
                <img className=' size-20' src={'./default.png'}/>
            </div>
            <div className='bg-primary h-[100px] w-1'></div>
            <img className='ml-4 size-20' src={'./default.png'}/>
        </div>
    )
}
export default BuildCard

import React from 'react'


const BuildCard = ({build : {character_picture, profile_picture, user_name, youtube_link, date_created}}) => {
    return (
        <div className=' w-full bg-gray-400 flex flex-row border p-2 border-black items-center justify-evenly'>
            <div className='flex flex-row gap-2 justify-center'>
                <img className='size-20'  src={ './dbdRandom.png'} alt='Character Picture' />
                <div className='flex flex-col items-center justify-center'>
                    <img className='size-8' src={ './dbdRandom.png'} alt='Profile Picture' />
                    <p>{user_name}</p>
                </div>
                <div className=' flex justify-between'>
                    <p>{new Date(date_created).getDate() === (new Date()).getDate() ? 'today' : `${Math.ceil((new Date() - new Date(date_created)) / 86400000)} ${Math.ceil((new Date() - new Date(date_created)) / 86400000)===1 ? 'day' : 'days'} ago` } </p>
                    <div></div>
                    {youtube_link && (
                        <img className='size-6' src={'./youtubeLogo.png'} alt='YouTube Video' />
                    )}
                </div>
            </div>
            <div className=' bg-primary h-[100px] w-1'></div>
            <div className='flex flex-row items-center '>
                <img className=' size-25' src={'./dbdRandom.png'}/>
                <img className='size-10' src={'./plus.png'}/>
                <img className=' size-15' src={'./dbdRandom.png'}/>
                <img className=' size-15' src={'./dbdRandom.png'}/>
            </div>
            <div className='bg-primary h-[100px] w-1'></div>
            <div className='flex flex-row items-center '>
                <img className=' size-20' src={'./dbdRandom.png'}/>
                <img className=' size-20' src={'./dbdRandom.png'}/>
                <img className=' size-20' src={'./dbdRandom.png'}/>
                <img className=' size-20' src={'./dbdRandom.png'}/>
            </div>
            <div className='bg-primary h-[100px] w-1'></div>
            <img className=' size-20' src={'./dbdRandom.png'}/>
        </div>
    )
}
export default BuildCard

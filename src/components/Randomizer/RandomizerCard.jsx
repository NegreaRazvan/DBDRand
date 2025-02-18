import React from 'react'

const RandomizerCard = ({item , addOn1 , addOn2, offering }) => {
    return (
        <div className='grid grid-cols-[2fr_1fr] text-white gap-4'>
            <div className='border-8 bg-gray-400 border-gray-700 flex flex-row items-center gap-4 justify-center '>
                <div className='flex flex-col items-center ' >
                    <img className='size-25' src={'./dbdRandom.png'} alt={item.name}/>
                    <p>{item.name}</p>

                </div>
                <img className='size-15 mb-6' src={'./plus.png'} alt={addOn1.name}/>
                <div className='flex flex-col justify-center items-center'>
                    <img className='size-20' src={'./dbdRandom.png'} alt={addOn1.name}/>
                    <p>{addOn1.name}</p>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <img className='size-20' src={'./dbdRandom.png'} alt={addOn2.name}/>
                    <p>{addOn2.name}</p>
                </div>
            </div>

            <div className='border-8 bg-gray-400 border-gray-700 flex flex-col items-center'>
                <img src={'./dbdRandom.png'} alt={offering.name}/>
                <p>{offering.name}</p>
            </div>

            <div className='p-4 bg-gray-400  justify-evenly border-8 border-gray-700 flex flex-row items-center col-span-full '>
                <img className=' size-30' src={'./dbdRandom.png'}/>
                <img className=' size-30' src={'./dbdRandom.png'}/>
                <img className=' size-30' src={'./dbdRandom.png'}/>
                <img className=' size-30' src={'./dbdRandom.png'}/>
            </div>

        </div>
    )
}
export default RandomizerCard

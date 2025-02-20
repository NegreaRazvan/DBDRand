import React from 'react'

const RandomizerCard = ({item , addOns, offering, perks, character }) => {
    return (
        <div className='grid grid-cols-[3fr_1fr_2fr] text-white gap-4 text-center'>
            <div className='border-8 bg-gray-400 border-gray-700 flex flex-row items-center gap-4 justify-center p-4'>
                <div className='flex flex-col items-center ' >
                    <img className='size-25' src={'./dbdRandom.png'} alt={item.name}/>
                    <p>{item.name}</p>

                </div>
                <img className='size-15 mb-6' src={'./plus.png'} />

                {addOns.map(addOn => (
                    <div key={addOn.name} className='flex flex-col justify-center items-center'>
                        <img className='size-20' src={'./dbdRandom.png'} alt={addOn.name}/>
                        <p>{addOn.name}</p>
                    </div>
                ))}

            </div>

            <div className='border-8 bg-gray-400 border-gray-700 flex flex-col items-center'>
                <img className='size-30' src={'./dbdRandom.png'} alt={offering.name}/>
                <p>{offering.name}</p>
            </div>

            <div className='border-8 bg-gray-400 border-gray-700 col-start-3 col-end-4 row-start-1 row-end-3 flex flex-col items-center justify-center'>
                <img className='size-50' src={'./dbdRandom.png'} alt={character[3]}/>
                <h2 className='text-2xl'>{character[3]}</h2>
            </div>

            <div className='p-4 bg-gray-400  justify-evenly border-8 border-gray-700 flex flex-row items-center col-start-1 col-end-3 '>
                {perks.map(perk => (
                    <div key={perk.name} className='flex flex-col items-center'>
                        <img className=' size-30' src={'./dbdRandom.png'} alt={perk.name}/>
                        <p>{perk.name}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}
export default RandomizerCard

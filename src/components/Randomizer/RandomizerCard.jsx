import React from 'react'

const RandomizerCard = ({item , addOns, offering, perks, character }) => {
    return (
        <div className='grid grid-cols-[3fr_1fr_2fr] text-white gap-4 text-center'>
            <div className='border-8 bg-gray-400 border-gray-700 flex flex-row items-center gap-4 justify-center p-4'>
                <div className='flex flex-col items-center ' >
                    <div>
                        <div className="relative">
                            <img src={'./powers/backgroundPower.png'} className="absolute size-25 z-0" />
                        </div>
                        <img className='relative size-25 z-1' src={`./powers/${item.image.split("/").pop()}`} />
                    </div>
                    <p>{item.name}</p>

                </div>
                <img className='size-15 mb-6' src={'./plus.png'} />

                {addOns.map(addOn => (
                    <div key={addOn.name} className='flex flex-col justify-center items-center'>
                        <div>
                            <div className="relative z-0">
                                <img src={`./addOns/${addOn.rarity}.png`} className="absolute z-0 size-20" />
                            </div>

                            <img className='relative z-10 size-20' src={`./addOns/${addOn.image.split("/").pop()}`}/>
                        </div>
                        <p>{addOn.name}</p>
                    </div>
                ))}

            </div>

            <div className='border-8 bg-gray-400 border-gray-700 flex flex-col items-center'>
                <div>
                    <div className="relative">
                        <img src={`./offerings/${offering.rarity}.png`} className="absolute size-30 z-0" />
                    </div>
                    <img className='size-30 relative z-10' src={`./offerings/${offering.image.split("/").pop()}`} alt={offering.name}/>
                </div>
                <p>{offering.name}</p>
            </div>

            <div className='border-8 bg-gray-400 border-gray-700 col-start-3 col-end-4 row-start-1 row-end-3 flex flex-col items-center justify-center'>
                <div>
                    <div className="relative z-0">
                        <img src={'./CharPortrait_bg.png'} className="absolute z-0 size-50" />
                    </div>
                    <img className='relative z-10 size-50' src={`./portraits/${character[14].split("/").pop()}`} alt={'Character Name'}/>
                </div>
                <h2 className='text-2xl'>{character[3]}</h2>
            </div>

            <div className='p-4 bg-gray-400  justify-evenly border-8 border-gray-700 flex flex-row items-center col-start-1 col-end-3 '>
                {perks.map(perk => (
                    <div key={perk.name} className='flex flex-col items-center'>
                        <div>
                            <div className="relative z-0">
                                <img src={'./perkPortrait.png'} className="absolute z-0 size-30" />
                            </div>
                            <img className='relative z-10 size-30' src={`/perksImages/ICONPERKS_${perk.name.toUpperCase().replace(/\s/g, "").replace(/&/g, "AND").replace(/’/g, "").replace(/:/g, "").replace(/'/g, "").replace(/‘/g, "")}.PNG`} alt={perk.name}/>
                        </div>
                        <p>{perk.name}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}
export default RandomizerCard

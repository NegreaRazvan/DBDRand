import React from 'react'

const AddOnInformationCard = ({addOn}) => {
    return (
        <div className='bg-gray-400 border-8 border-gray-700 items-center flex min-h-[200px] tracking-tight leading-[28.8px]'>
            <div className='flex flex-col justify-center items-center h-[200px] w-[250px]'>
                <div>
                    <div className="relative z-0">
                        <img src={`./addOns/${addOn.rarity}.png`} className="absolute z-0 size-20" />
                    </div>

                    <img className='relative z-10 size-20' src={`./addOns/${addOn.image.split("/").pop()}`}/>
                </div>
                <p className='text-center'>{addOn.name}</p>
            </div>
            <p className='items-center w-[500px]' dangerouslySetInnerHTML={{ __html: addOn.description }}></p>
        </div>
    )
}
export default AddOnInformationCard

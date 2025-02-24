import React from 'react'

const ItemInformationCard = ({item}) => {
    return (
        <div className='bg-gray-400 border-8 border-gray-700 items-center flex min-h-[200px] tracking-tight leading-[28.8px] '>
            <div className='flex flex-col justify-center items-center h-[200px] w-[250px]'>
                <div>
                    <div className="relative">
                        <img src={'./powers/backgroundPower.png'} className="absolute size-25 z-0" />
                    </div>
                    <img className='relative size-25 z-1' src={`./powers/${item.image.split("/").pop()}`} />
                </div>
                <p className='text-center'>{item.name}</p>
            </div>
            <p className='items-center w-[500px]' dangerouslySetInnerHTML={{ __html: item.description }}></p>
        </div>
    )
}
export default ItemInformationCard

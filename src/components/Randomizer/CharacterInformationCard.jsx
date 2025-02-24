import React from 'react'

const CharacterInformationCard = ({character}) => {
    return (
        <div className='bg-gray-400 border-8 border-gray-700 items-center flex min-h-[200px] tracking-tight leading-[28.8px] '>
            <div className='flex flex-col justify-center items-center h-[200px] w-[250px]'>
                <div>
                    <div className="relative z-0">
                        <img src={'./CharPortrait_bg.png'} className="absolute z-0 size-30" />
                    </div>
                    <img className='relative z-10 size-30' src={`./portraits/${character[14].split("/").pop()}`} alt={character.name}/>
                </div>
                <p className=''>{character[3]}</p>
            </div>
            <p className='items-center w-[500px]' dangerouslySetInnerHTML={{ __html: character[8] }}></p>
        </div>
    )
}
export default CharacterInformationCard

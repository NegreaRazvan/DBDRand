import React from 'react'

const CharacterInformationCard = ({character}) => {
    return (
        <div className='bg-gray-400 border-8 border-gray-700 items-center flex min-h-[200px] tracking-tight leading-[28.8px] '>
            <div className='flex flex-col justify-center items-center h-[200px] w-[250px]'>
                <img className='size-30' src={'./dbdRandom.png'} alt={character.name}/>
                <p className=''>{character[3]}</p>
            </div>
            <p className='items-center w-[500px]' dangerouslySetInnerHTML={{ __html: character[8] }}></p>
        </div>
    )
}
export default CharacterInformationCard

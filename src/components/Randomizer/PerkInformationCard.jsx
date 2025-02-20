import React, {useEffect} from 'react'

const PerkInformationCard = ({perk}) => {

    const [description, setDescription] = React.useState('')

    const assignNumbersToDescriptions = async (perk) => {
        let description=perk.description;
        perk.tunables.map((tunable, key) => {
            let tunableFormat=''
            tunable.forEach((t) => {tunableFormat=tunableFormat+ t + '/'})
            tunableFormat = tunableFormat.slice(0,-1);
            description = description.replace(`{${key}}`, tunableFormat);
        })
        setDescription(description)
    }
    //
    useEffect( () => {
        assignNumbersToDescriptions(perk)
    },[]);
    return (
        <div className='bg-gray-400 border-8 border-gray-700 items-center flex min-h-[200px] tracking-tight leading-[28.8px]'>
            <div className='flex flex-col justify-center items-center h-[200px] w-[250px]'>
                <img className='size-30' src={'./dbdRandom.png'} alt={perk.name}/>
                <p className=''>{perk.name}</p>
            </div>
            <p className='items-center w-[500px]' dangerouslySetInnerHTML={{ __html: description }}></p>
        </div>
    )
}
export default PerkInformationCard

import React, {useEffect, useState} from 'react'


const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json'
    }
};

const URL_RANDOM_CHARACTER = '/api/api/randomcharacter'
const URL_RANDOM_PERKS = '/api/api/randomperks'
const URL_ITEMS = '/api/api/items'
const URL_ADDONS = '/api/api/addons'

const RandomizerLayout = () => {
    const [role, setRole] = useState("killer");

    const [randomCharacter, setRandomCharacter] = useState([])

    const [randomPerks, setRandomPerks] = useState([])

    const [randomItem, setRandomItem] = useState([])

    const [addOns, setAddOns] = useState([])

    const fetchRandomCharacterAndItem = async (role) => {
        const endpointCharacter =  `${URL_RANDOM_CHARACTER}?role=${role}`
        const responseCharacter = await fetch(endpointCharacter, API_OPTIONS);

        if (!responseCharacter.ok) {
            throw new Error(responseCharacter.statusText);
        }

        const data = await responseCharacter.json();


        if (data.response === 'False') {
            setRandomCharacter([]);
            return;
        }

        const character = Object.values(data);

        setRandomCharacter(character);

        const item = character[11];

        if( item !== null) {
            const endpointItems = `${URL_ITEMS}`
            const responseItems = await fetch(endpointItems, API_OPTIONS);
            if (!responseItems.ok) {
                throw new Error(responseItems.statusText);
            }

            const dataItems = await responseItems.json();

            if (dataItems.response === 'False') {
                setRandomItem([]);
                return;
            }

            const itemValue = Object.entries(dataItems);

            const itemSearched = itemValue.filter(([key, element]) => (
                key === item
            ))

            setRandomItem(itemSearched);
        } else{
            const endpointItems = `${URL_ITEMS}?role=${role}`
            const responseItems = await fetch(endpointItems, API_OPTIONS);
            if (!responseItems.ok) {
                throw new Error(responseItems.statusText);
            }

            const dataItems = await responseItems.json();

            if (dataItems.response === 'False') {
                setRandomItem([]);
                return;
            }

            const itemValue = Object.values(dataItems);

            var randomValue = itemValue[Math.floor(Math.random() * itemValue.length)]

            while(randomValue.item_type === null) {
                randomValue = itemValue[Math.floor(Math.random() * itemValue.length)]
            }

            setRandomItem(randomValue);

        }
    }

    const fetchRandomPerks = async () => {
        const endpointPerks =  `${URL_RANDOM_PERKS}?role=${role}`
        const responsePerks = await fetch(endpointPerks, API_OPTIONS);

        if (!responsePerks.ok) {
            throw new Error(responsePerks.statusText);
        }

        const dataPerks = await responsePerks.json();


        if (dataPerks.response === 'False') {
            setRandomPerks([]);
            return;
        }

        const dataArrayPerks = Object.values(dataPerks);

        setRandomPerks(dataArrayPerks);
    }

    const fetchRandomAddOns = async (role, item) => {
        const endpointAddOn =  `${URL_ADDONS}?role=${role}`
        const response = await fetch(endpointAddOn, API_OPTIONS);

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const data = await response.json();


        if (data.response === 'False') {
            setAddOns([]);
            return;
        }

        const addOns = Object.values(data);

        var addOnsForItem;

        if (role === 'survivor' && item.length > 0) {
            console.log(item);
            addOnsForItem = Array.from(addOns.filter((element) => element.item_type === item.item_type));

            console.log(addOnsForItem);
            var indexAddOn1 = Math.floor(Math.random() * addOnsForItem.length)
            var indexAddOn2 = Math.floor(Math.random() * addOnsForItem.length)
            while (indexAddOn1 === indexAddOn2 && addOnsForItem.length > 0) {
                indexAddOn2 = Math.floor(Math.random() * addOnsForItem.length)
            }
            // var addOn1 = addOnsForItem[Math.floor(Math.random() * addOnsForItem.length)]
            // var addOn2 = addOnsForItem[Math.floor(Math.random() * addOnsForItem.length)]
            // while (addOn1 === addOn2)
            //     addOn2 = addOnsForItem[Math.floor(Math.random() * addOnsForItem.length)]

            console.log(indexAddOn1 + ' ' + indexAddOn2);
        }


    }

    const fetchAssets = async (role) => {
        try{
            ///1 random character and 1 item

            await fetchRandomCharacterAndItem(role);

            ///4 random perks

            await fetchRandomPerks();

            ///2 add ons


        }catch(error){
            console.log(error)
        }
    }


    useEffect(() => {
        fetchAssets(role);
    }, [role]);

    useEffect(() => {
        fetchRandomAddOns(role, randomItem);
    }, [randomItem]);

    return (
        <section className=" mt-[80px] text-white">
            <div className="pb-5 flex flex-row items-center justify-between ">
                <h2 className=" text-3xl">{role === "killer" ? "Killer" : "Survivor"} Builds</h2>
                <img className='cursor-pointer size-20' onClick={() => {setRole(role === "killer" ? "survivor" : "killer")}} src={role === "killer" ? './killerIcon.png' : 'survivorIcon.png'} alt="Role Image" />
            </div>
            <div className="w-full h-[5px] bg-gray-400"/>
        </section>
    )
}
export default RandomizerLayout

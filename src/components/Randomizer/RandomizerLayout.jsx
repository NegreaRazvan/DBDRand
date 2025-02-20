import React, {useEffect, useState} from 'react'
import RandomizerCard from "./RandomizerCard.jsx";
import Spinner from "../Spinner.jsx";
import AddOnInformationCard from "./AddOnInformationCard.jsx";
import CharacterInformationCard from "./CharacterInformationCard.jsx";
import PerkInformationCard from "./PerkInformationCard.jsx";
import ItemInformationCard from "./ItemInformationCard.jsx";

const cache={}

const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json'
    }
};

const URL_RANDOM_CHARACTER = '/api/api/randomcharacter';
const URL_RANDOM_PERKS = '/api/api/randomperks';
const URL_ITEMS = '/api/api/items';
const URL_ADDONS = '/api/api/addons';
const URL_OFFERINGS = '/api/api/offerings';

const RandomizerLayout = () => {
    const [role, setRole] = useState("killer");

    const [randomCharacter, setRandomCharacter] = useState([])

    const [randomPerks, setRandomPerks] = useState([])

    const [randomItem, setRandomItem] = useState([])

    const [addOns, setAddOns] = useState([])

    const [offering, setOffering] = useState([])

    const [isDoneRandomizing, setIsDoneRandomizing] = useState(false)

    const [retry, setRetry] = useState(false)

    const fetchWithCache = async (url) => {
        // const cache = localStorage.getItem('UrlCache')

        // if the response is in cache -> return it
        if (cache[url])
            return cache[url];

        // fetch from the endpoint
        const response = await fetch(url, API_OPTIONS);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data = await response.json();

        if (data.response === 'False') {
            throw new Error('Error fetching data');
        }

        // save the response in the cache
        if(!url.includes("random")) {
            cache[url] = data;
            // localStorage.setItem('UrlCache', cache);
        }
        return data;
    };

    const fetchRandomCharacterAndItem = async (role) => {
        /// get the random character, depending on the role
        const data = await fetchWithCache( `${URL_RANDOM_CHARACTER}?role=${role}`)

        const character = Object.values(data);


        setRandomCharacter(character);

        /// get the item type: it's null if it's a survivor, a power if it's a killer
        const item = character[11];

        let itemSearched;

        const dataItems = await fetchWithCache( `${URL_ITEMS}?role=${role}`)

        if( item !== null) {

            const itemValue = Object.entries(dataItems);

            /// we get the properties of the power
            itemSearched = itemValue.filter(([key, element]) => (
                key === item
            ))

            itemSearched = itemSearched[0]

            /// itemSearched for killer is going to be a map because we need the key part for when we filter the specific add ons


        } else{
            const itemValue = Object.entries(dataItems);

            /// random item out of the available ones
            itemSearched = itemValue[Math.floor(Math.random() * itemValue.length)]

            /// if the item is a killer specific item / event specific item, we don't want it
            while(itemSearched[1].item_type === null) {
                itemSearched = itemValue[Math.floor(Math.random() * itemValue.length)]
            }

        }

        /// we will have a single map Object (key, element)
        setRandomItem(itemSearched);
        return itemSearched;
    }

    const fetchRandomPerks = async (role) => {
        const dataPerks = await fetchWithCache( `${URL_RANDOM_PERKS}?role=${role}`)

        const dataArrayPerks = Object.values(dataPerks);

        setRandomPerks(dataArrayPerks);
    }

    const fetchRandomAddOns = async (role, item) => {
            const data = await fetchWithCache( `${URL_ADDONS}?role=${role}`)

            const addOns = Object.values(data);


            const addOnsForAsset = role === 'survivor' ? Array.from(addOns.filter((element) => element.item_type === item[1].item_type)) :
                Array.from(addOns.filter((element) => (element.parents[0] === item[0])));
            const indexAddOn1 = Math.floor(Math.random() * addOnsForAsset.length);
            let indexAddOn2 = Math.floor(Math.random() * addOnsForAsset.length);
            while (indexAddOn1 === indexAddOn2 && addOnsForAsset.length > 0) {
                indexAddOn2 = Math.floor(Math.random() * addOnsForAsset.length);
            }

            const addOn1 = addOnsForAsset[indexAddOn1];
            const addOn2 = addOnsForAsset[indexAddOn2];

            const array= [addOn1, addOn2];

            setAddOns(array);
    }

    const fetchRandomOffering = async (role) => {
        const data = await fetchWithCache( `${URL_OFFERINGS}?role=${role}`)

        const offerings = Object.values(data)
        const randomOffering = offerings[Math.floor(Math.random() * offerings.length)]

        setOffering(randomOffering);
    }

    const fetchAssets = async (role) => {
        try{
            setIsDoneRandomizing(false)
            const item = await fetchRandomCharacterAndItem(role);
            if (item) {
                await fetchRandomAddOns(role, item);
            }
            await fetchRandomPerks(role);
            await fetchRandomOffering(role)
        }catch(error){
            console.log(error)
        } finally {
            setIsDoneRandomizing(true)
        }
    }


    useEffect(() => {
        const timer = setTimeout(() => {
            fetchAssets(role);
        }, 300); // 300ms debounce

        return () => clearTimeout(timer);
    }, [role, retry]);


    return (
        <section className=" mt-[80px] text-white flex flex-col gap-4 min-w-[412px]">
            <div className="pb-5 flex flex-row items-center justify-between ">
                <h2 className=" text-3xl">{role === "killer" ? "Killer" : "Survivor"} Builds</h2>
                <div className="flex gap-4" >
                    <img onClick={() => setRetry(previous => !previous)} className='cursor-pointer size-15' src={'./retry.png'} alt='Retry' />
                    <img className='cursor-pointer size-20' onClick={() => {setRole(role === "killer" ? "survivor" : "killer")}} src={role === "killer" ? './killerIcon.png' : 'survivorIcon.png'} alt="Role Image" />
                </div>
            </div>
            <div className="w-full h-[5px] bg-gray-400 "/>
            {isDoneRandomizing ? <RandomizerCard item = {role === 'survivor' ?  randomItem[1] : randomItem[1]} addOns={addOns} offering = {offering} perks={randomPerks} character={randomCharacter}/> :
                <div className='flex justify-center'> <Spinner/></div>

            }
            <h3 className='text-2xl pt-8 text-white'>Build Info</h3>
            {isDoneRandomizing ?
                <>
                    <CharacterInformationCard character={randomCharacter} />
                    <ItemInformationCard item={randomItem[1]} />
                    {addOns.map(addOn => (
                        <AddOnInformationCard key={addOn.name} addOn={addOn}/>
                    ))}
                    {randomPerks.map(perk => (
                        <PerkInformationCard key={perk.name} perk={perk}/>
                    ))}
                </>
                :
                <div className='flex justify-center'> <Spinner/></div>
            }

        </section>
    )
}
export default RandomizerLayout

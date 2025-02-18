import React, {useEffect, useState} from 'react'
import RandomizerCard from "./RandomizerCard.jsx";
import Spinner from "../Spinner.jsx";


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

        let itemSearched;

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

            itemSearched = itemValue.filter(([key, element]) => (
                key === item
            ))

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

            itemSearched = randomValue
        }
        console.log(itemSearched);
        setRandomItem(itemSearched);
        return itemSearched;
    }

    const fetchRandomPerks = async (role) => {
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
            const endpointAddOn = `${URL_ADDONS}?role=${role}`
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


            const addOnsForAsset = role === 'survivor' ? Array.from(addOns.filter((element) => element.item_type === item.item_type)) :
                Array.from(addOns.filter((element) => element.parents[0] === item[0][0]));

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
        const endpoint =  `${URL_OFFERINGS}?role=${role}`
        const responsePerks = await fetch(endpoint, API_OPTIONS);

        if (!responsePerks.ok) {
            throw new Error(responsePerks.statusText);
        }

        const data = await responsePerks.json();


        if (data.response === 'False') {
            setRandomPerks([]);
            return;
        }

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
            {role ==='survivor' ? console.log(randomItem[0]) : console.log('killer')}
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
    }, [role]);


    return (
        <section className=" mt-[80px] text-white ">
            <div className="pb-5 flex flex-row items-center justify-between ">
                <h2 className=" text-3xl">{role === "killer" ? "Killer" : "Survivor"} Builds</h2>
                <img className='cursor-pointer size-20' onClick={() => {setRole(role === "killer" ? "survivor" : "killer")}} src={role === "killer" ? './killerIcon.png' : 'survivorIcon.png'} alt="Role Image" />
            </div>
            <div className="w-full h-[5px] bg-gray-400 mb-6"/>
            {/*{isDoneRandomizing ? <RandomizerCard item = {role === 'survivor' ? randomItem[0] : randomItem[0][1]} addOn1 = {addOns[0]} addOn2 = {addOns[1]} offering = {offering} /> :*/}
            {/*    <Spinner/>*/}
            {/*}*/}
        </section>
    )
}
export default RandomizerLayout

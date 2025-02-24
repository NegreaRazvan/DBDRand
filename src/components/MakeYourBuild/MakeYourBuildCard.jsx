import React, {useEffect, useState} from 'react'
import Search from "../Community/Search.jsx";
import {b} from "framer-motion/m";
import Spinner from "../Spinner.jsx";
import {saveBuild} from "../../Appwrite.js";


const cache = {}

const URL_PERKS = '/api/api/perks'
const URL_CHARACTERS = '/api/api/characters'
const URL_ITEMS = '/api/api/items';
const URL_ADDONS = '/api/api/addons';
const URL_OFFERINGS = '/api/api/offerings';

const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json'
    }
};


const MakeYourBuildCard = ({role}) => {
    const [searchTerm, setSearchTerm] = useState("")

    const [itemImage, setItemImage] = useState({image: './perkSelector.png', lockedIn: false, item: null, itemId: null, characterPortrait: null, characterName: null});
    const [addOnsImages, setAddOnsImages] = useState([{image: './perkSelector.png', lockedIn: false, addOn: null, rarity: null}, {image: './perkSelector.png', lockedIn: false, addOn: null, rarity: null}]);
    const [offeringImage, setOfferingImage] = useState({image: './offeringSelector.png', lockedIn: false, offering: null, rarity: null});
    const [perksImages, setPerksImages] = useState([{image: './perkSelector.png', lockedIn: false, perk: null},{image: './perkSelector.png', lockedIn: false, perk: null},{image: './perkSelector.png', lockedIn: false, perk: null},{image: './perkSelector.png', lockedIn: false, perk: null}]);
    const [leftArrow, setLeftArrow] = useState('./arrow.png');
    const [rightArrow, setRightArrow] = useState('./arrow.png');

    const [isDoneCaching, setIsDoneCaching] = useState(false);

    const [page, setPage] = useState(1);
    const [countPage, setCountPage] = useState(0);

    const [displayArray, setDisplayArray] = useState([]);

    const [selectedState, setSelectedState] = useState( null );

    const [description, setDescription] = useState( '' );
    const [youtubeLink, setYoutubeLink] = useState( '' );
    const [username, setUsername] = useState('');

    const [characterComboBox, setCharacterComboBox] = useState([]);

    const [loadedCharacters, setLoadedCharacters] = useState(false);




    const fetchWithCache = async (url) => {

        if (cache[url])
            return cache[url];

        const response = await fetch(url, API_OPTIONS);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data = await response.json();

        if (data.response === 'False') {
            throw new Error('Error fetching data');
        }

        if(!url.includes("random")) {
            cache[url] = data;
        }
        // if(url === `${URL_CHARACTERS}?role=${role}`)
        //     console.log(data)
        return data;
    };


    const fetchAssets = async (role) => {
        setIsDoneCaching(false);
         fetchWithCache(`${URL_PERKS}?role=${role}`);
        const characters = await fetchWithCache( `${URL_CHARACTERS}?role=${role}`)
        if(characters){
            setLoadedCharacters(false)
            loadCharacters(characters)
            setLoadedCharacters(true)
        }
         fetchWithCache( `${URL_ITEMS}?role=${role}`)
         fetchWithCache( `${URL_ADDONS}?role=${role}`)
         fetchWithCache( `${URL_OFFERINGS}?role=${role}`)
        setIsDoneCaching(true);
    }

    const unlockState = (selectedState) => {
        if(selectedState === 'itemImage')
            setItemImage(prev => ({...prev, image: './perkSelector.png', lockedIn : false}));
        if(selectedState === 'addOnsImages')
            setAddOnsImages((prev)=>
                prev.map(element =>
                    ({...element, image : './perkSelector.png', lockedIn: false} )) )
        if(selectedState === 'offeringImage')
            setOfferingImage(prev => ({...prev, image: './offeringSelector.png', lockedIn : false,}))
        if(selectedState === 'perksImages'){
            setPerksImages((prev)=>
                prev.map(element =>
                    ({...element, image : './perkSelector.png', lockedIn: false} )) )
        }

    }

    const prepareRoleChange = () => {
        setItemImage(prev => ({...prev, image: './perkSelector.png', lockedIn : false, item: null, itemId: null}));
        setAddOnsImages((prev)=>
            prev.map(element =>
                ({...element, image : './perkSelector.png', lockedIn: false, addOn: null} )) )
        setOfferingImage(prev => ({...prev, image: './offeringSelector.png', lockedIn : false, offering: null}))
        setPerksImages((prev)=>
            prev.map(element =>
                ({...element, image : './perkSelector.png', lockedIn: false, perk: null} )) )
    }

    const handleSelectState = (selectedState, assetImage) => {
        if(selectedState === 'itemImage') {
            // console.log(Object.values(cache[`${URL_CHARACTERS}?role=${role}`]).filter(element => element.item === Object.entries(cache[`${URL_ITEMS}?role=${role}`]).filter(element => element[1].image.split("/").pop() === assetImage.split("/").pop())[0][0]))
            setItemImage(prev => ({
                ...prev,
                item: prev.item === null ? assetImage : prev.item !== assetImage ? assetImage : null, itemId: role ==='killer' ? Object.entries(cache[`${URL_ITEMS}?role=${role}`]).filter(element => element[1].image.split("/").pop() === assetImage.split("/").pop())[0][0] : Object.entries(cache[`${URL_ITEMS}?role=${role}`]).filter(element => element[1].image.split("/").pop() === assetImage.split("/").pop())[0][1].item_type,
                characterPortrait: role ==='killer' ? Object.values(cache[`${URL_CHARACTERS}?role=${role}`]).filter(element => element.item === Object.entries(cache[`${URL_ITEMS}?role=${role}`]).filter(element => element[1].image.split("/").pop() === assetImage.split("/").pop())[0][0])[0].image : null,
                characterName: role ==='killer' ? Object.values(cache[`${URL_CHARACTERS}?role=${role}`]).filter(element => element.item === Object.entries(cache[`${URL_ITEMS}?role=${role}`]).filter(element => element[1].image.split("/").pop() === assetImage.split("/").pop())[0][0])[0].name : null
            }))
            setAddOnsImages((prev) => prev.map(element => ({...element, addOn: null, rarity: null})))
        }

        if(selectedState === 'addOnsImages')
            !addOnsImages.some(element => element.addOn === assetImage) ?
            setAddOnsImages((prev)=>
                prev.map(element => element.lockedIn ?
                    ({...element, addOn: element.addOn===null ? assetImage : element.addOn !== assetImage ? assetImage: null} ) : element) ) :
                setAddOnsImages((element) => element.lockedIn ?
                    ({...element, perk: element.addOn===null ? assetImage : element.addOn !== assetImage ? assetImage: null} ) : element.addOn === assetImage ? ({...element, addOn: null} ) : element)
        if(selectedState === 'offeringImage')
            setOfferingImage(prev => ({...prev, offering : prev.offering===null ? assetImage : prev.offering !== assetImage ? assetImage: null}))
        if(selectedState === 'perksImages'){
            !perksImages.some(element => element.perk === assetImage) ?
            setPerksImages((prev)=>
                prev.map(element => element.lockedIn ?
                    ({...element, perk: element.perk===null ? assetImage : element.perk !== assetImage ? assetImage: null} ) : element)  ) :

                setPerksImages((prev)=>
                    prev.map(element => element.lockedIn ?
                        ({...element, perk: element.perk===null ? assetImage : element.perk !== assetImage ? assetImage: null} ) : element.perk === assetImage ? ({...element, perk: null} ) : element)  )
        }
    }


    const setArray = async () => {
        let data;
        if(selectedState === 'perksImages') {
            data = cache[`${URL_PERKS}?role=${role}`];
            data=Object.values(data).sort((a, b) => a.name.localeCompare(b.name));
        }
        if(selectedState === 'addOnsImages') {
            data = itemImage.item === null ? [] : cache[`${URL_ADDONS}?role=${role}`]
            const rarityOrder = ["ultrarare", "veryrare", "rare", "uncommon", "common"]
            const encountered = new Set();
            console.log(Object.values(data), itemImage.itemId)
            console.log(Object.values(data).filter(element => role ==='killer' ? element.parents[0] === itemImage.itemId : element.item_type === itemImage.itemId ))
            data = Object.values(data).filter(element => element.rarity !== 'specialevent').filter(element => role ==='killer' ? element.parents[0] === itemImage.itemId : element.item_type === itemImage.itemId ).filter(element => encountered.has(element.name) ? false : encountered.add(element.name)).sort((a, b) => rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity));
        }if(selectedState === 'offeringImage') {
            data = cache[`${URL_OFFERINGS}?role=${role}`];
            const rarityOrder = ["ultrarare", "veryrare", "rare", "uncommon", "common"]
            data = Object.values(data).filter(element => element.retired!==1).sort((a, b) => rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity));
        }
        if(selectedState === 'itemImage') {
            data = cache[`${URL_ITEMS}?role=${role}`];
            const rarityOrder = ["ultrarare", "veryrare", "rare", "uncommon", "common"]
            data = role === 'killer' ? Object.values(data).sort((a, b) => a.name.localeCompare(b.name)) : Object.values(data).filter(element => element.item_type !== null && element.rarity !=='specialevent' && element.rarity !=='none').sort((a, b) => rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity));
        }

        if(selectedState !== null) {
            setCountPage(Math.ceil(Object.entries(data).length / 15));
            setDisplayArray(data.slice((page - 1) * 15, page * 15))
        }

    }

    const loadCharacters = async (characters) => {
        if(role ==='survivor') {
            setCharacterComboBox(Object.values(characters))
        }
    }

    useEffect(() => {
        fetchAssets(role);
        prepareRoleChange()
        setSelectedState(null)
        setDisplayArray([])
    }, [role]);


    useEffect(() => {
        (isDoneCaching)
            setArray();

    },[selectedState, page]);


    return (
        <div className='grid grid-cols-[4fr_2fr] text-white text-center'>
            <div className='border-8 bg-gray-400 border-gray-700 flex justify-evenly items-center p-4'>
                <div className='flex flex-row items-center justify-center gap-4'>
                     <div>
                        {itemImage.item !==null && role ==='killer' &&  <div className="relative">
                            <img src={'./powers/backgroundPower.png'} className="absolute size-25 z-0"/>
                        </div>}
                        <img className='relative size-25 cursor-pointer z-10'
                             onClick={() =>(
                                 unlockState(selectedState), setPage(1),
                                 setSelectedState('itemImage'),
                                 setItemImage(prev=>
                                     ({...prev, lockedIn: true, image : './perkSelectorHover.png'})
                                 ))}
                             onMouseOver={() =>  !itemImage.lockedIn && itemImage.item===null && setItemImage((prev) => ({...prev, image : './perkSelectorHover.png'}))} onMouseOut={() => !itemImage.lockedIn && !itemImage.selected &&  setItemImage((prev) => ({...prev, image : './perkSelector.png'}))} src={itemImage.item===null ?  itemImage.image : itemImage.item} alt='Perk Selector'/>

                    </div>
                    <img className='size-15 ' src={'./plus.png'} />
                    {addOnsImages.map((addOn, index) => (
                        <div key={index}>
                            {addOn.addOn !==null &&  <div className="relative">
                                <img src={`./addOns/${addOn.rarity}.png`} className="absolute size-20 z-0"/>
                            </div>}
                            <img key={index} className='relative z-10 size-20 cursor-pointer'
                                 onClick={() =>(
                                     unlockState(selectedState), setPage(1),
                                     setSelectedState('addOnsImages'),
                                     setAddOnsImages((prev)=>
                                        prev.map((element, i) =>
                                                 index === i ? { ...element, image : './perkSelectorHover.png', lockedIn: true} : element))
                                 )}
                                 onMouseOver={() =>
                                     setAddOnsImages(prev =>
                                        prev.map((element, i) =>
                                    i===index && !element.lockedIn && element.addOn===null ? { ...element, image : './perkSelectorHover.png'} : element))
                                }
                                 onMouseOut={() =>
                                     setAddOnsImages((prev) =>
                                         prev.map((element, i) =>
                                             i===index && !element.lockedIn && element.addOn===null ? { ...element, image : './perkSelector.png'} : element))
                                 }
                                 src={addOn.addOn === null ? addOn.image : addOn.addOn} alt='AddOn Slot'/>
                        </div>)
                        )
                    }
                </div>
                <div>
                    {offeringImage.offering !==null &&
                        <div className="relative">
                            <img src={`./offerings/${offeringImage.rarity}.png`} className="absolute size-25 z-0" />
                        </div>
                    }
                    <img className='relative z-10 size-25 cursor-pointer' onClick={() =>(
                            unlockState(selectedState), setPage(1),
                            setSelectedState('offeringImage'),
                            setOfferingImage(prev=>
                                ({...prev, lockedIn: true, image : './offeringSelectorHover.png'})
                            ))}
                         onMouseOver={() => !offeringImage.lockedIn && offeringImage.offering ===null &&  setOfferingImage((prev) => ({...prev, image : './offeringSelectorHover.png'}))} onMouseOut={() => !offeringImage.lockedIn && !offeringImage.selected &&  setOfferingImage((prev) => ({...prev, image : './offeringSelector.png'}))} src={offeringImage.offering === null ? offeringImage.image : offeringImage.offering} alt='Offering Selector'/>
                </div>
            </div>

            <div className='border-8 bg-gray-400 border-gray-700 flex flex-col p-4 gap-2  col-start-2 row-start-1 row-end-4'>

                    <h2 className='text-[20px] text-left font-bold'>Write a description <span className='font-normal text-gray-200'>(optional)</span> : </h2>
                    <div className='w-full h-[150px] flex flex-col  bg-gray-700 border-8 border-gray-900'>
                        <textarea className='p-2 h-full w-full resize-none' placeholder="Write a description..." value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>

                    <h2 className='text-[20px] text-left font-bold'>Youtube link <span className='font-normal text-gray-200'>(optional)</span> : </h2>
                    <div className='w-full h-[100px] flex flex-col  bg-gray-700 border-8 border-gray-900'>
                        <textarea className='p-2 h-full w-full resize-none' placeholder="Paste a youtube link..." value={youtubeLink} onChange={(e) => setYoutubeLink(e.target.value)} />
                    </div>
                    {!loadedCharacters ? (
                        <Spinner />
                    ) : role==='survivor' && (
                        <select className='cursor-pointer p-2 w-[150px]' onChange={(e) => {
                            setItemImage(prev => ({...prev, characterName: e.target.value,
                            characterPortrait: Object.values(cache[`${URL_CHARACTERS}?role=${role}`]).filter(element => element.name === e.target.value)[0].image}))
                         }}>
                            {characterComboBox.map((option, index) => (
                                <option className="text-gray-800" key={index} value={option.name}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    )
                    }
                    <h2 className='text-[20px] text-left font-bold'>Username:  </h2>
                    <div className='w-[200px] h-[80px] flex flex-col  bg-gray-700 border-8 border-gray-900'>
                        <textarea className='p-2 h-full w-full resize-none' placeholder="Username..." value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <button className='cursor-pointer mt-10 text-2xl bg-gray-700 pl-5 pr-5 p-5 shadow-inner rounded-2xl' onClick={async () => {
                        try {
                            await saveBuild(addOnsImages, itemImage, perksImages, offeringImage, description, username, youtubeLink, role)
                            console.log(addOnsImages, itemImage, perksImages, offeringImage, description, username, youtubeLink, role)
                        }catch(err) {
                            console.log(err)
                        }
                    }}>Save the build</button>

            </div>


            <div className='border-8 bg-gray-400 border-gray-700 flex justify-center items-center gap-12 p-8 col-start-1 col-end-2'>
                {perksImages.map((perk, index) => (
                    <div key={index}>
                            {perk.perk !==null && <div className="relative">
                                <img src={'./perkPortrait.png'} className="absolute size-28"/>
                            </div>}
                            <img  key={index} className={`relative  cursor-pointer ${perk.perk === null ? 'rotate-45 size-20' : 'size-28'}`}
                                  onClick={() =>(
                                          unlockState(selectedState), setPage(1),
                                          setSelectedState('perksImages'),
                                          setPerksImages((prev)=>
                                              prev.map((element, i) =>
                                                  index === i ? { ...element, image : './perkSelectorHover.png', lockedIn: true} : element))
                                  )}
                                 onMouseOver={() =>
                                     setPerksImages(prev =>
                                         prev.map((element, i) =>
                                             i===index && !element.lockedIn && element.perk===null ? { ...element, image : './perkSelectorHover.png'} : element))
                                 }
                                 onMouseOut={() =>
                                     setPerksImages((prev) =>
                                         prev.map((element, i) =>
                                             i===index && !element.lockedIn && element.perk===null ? { ...element, image : './perkSelector.png'} : element))
                                 }
                                 src={perk.perk === null ? perk.image : perk.perk} alt='Perk Slot'/>
                        </div>)
                )
                }
            </div>

            <div className='border-8 bg-gray-400 border-gray-700 min-h-[450px] flex flex-col  p-4 col-start-1 gap-2'>

                <div className='flex flex-col flex-grow border-8 rounded-2xl border-gray-900 bg-gray-700'>
                    <div className='flex flex-row flex-grow justify-between items-center'>
                        <img className='size-10 cursor-pointer' onClick={() => {page>1 && setPage((prev) => prev-1)}} onMouseOver={() => setLeftArrow('./arrowHover.png')} onMouseOut={() => setLeftArrow('./arrow.png')} src={leftArrow} alt='Left Arrow'/>
                        <ul className='grid grid-cols-5 '>
                            {isDoneCaching ? selectedState === 'perksImages' ?
                                displayArray.map((element, i) =>
                                    <li key={i} className={` grid grid-cols-[1fr_1fr_1fr_1fr_1fr]] `}>
                                        <div className="relative">
                                            <img src={'./perkPortrait.png'} className="absolute size-25" />
                                        </div>
                                        <img className='size-25 cursor-pointer z-1' onClick = {() => {
                                            handleSelectState(selectedState, `/${selectedState}/ICONPERKS_${element.name.toUpperCase().replace(/\s/g, "").replace(/&/g, "AND").replace(/’/g, "").replace(/:/g, "").replace(/'/g, "").replace(/‘/g, "")}.PNG`)

                                        }}
                                        src={`/${selectedState}/ICONPERKS_${element.name.toUpperCase().replace(/\s/g, "").replace(/&/g, "AND").replace(/’/g, "").replace(/:/g, "").replace(/'/g, "").replace(/‘/g, "")}.PNG`} alt={'Perk Image'}/>
                                    </li>
                                ) : selectedState === 'itemImage' ?
                                    displayArray.map((element, i) =>(
                                        <li key={i} className={`grid grid-cols-[1fr_1fr_1fr_1fr_1fr]] `}>
                                            <div className="relative">
                                                <img src={'./powers/backgroundPower.png'} className="absolute size-25" />
                                            </div>
                                            <img onClick = {() => {
                                                handleSelectState(selectedState, `./powers/${element.image.split("/").pop()}`)

                                            }}
                                            className='size-25 z-1' src={`./powers/${element.image.split("/").pop()}`} />
                                        </li>)
                                    ) : selectedState === 'offeringImage' ?
                                        displayArray.map((element, i) =>(
                                                <li key={i} className={`grid grid-cols-[1fr_1fr_1fr_1fr_1fr]] `}>
                                                    <div className="relative">
                                                        <img src={`./offerings/${element.rarity}.png`} className="absolute size-25" />
                                                    </div>
                                                    <img onClick = {() => {
                                                        handleSelectState(selectedState, `./offerings/${element.image.split("/").pop()}`)
                                                        setOfferingImage(prev => ({...prev, rarity: element.rarity}))
                                                    }}
                                                         className='size-25 z-1' src={`./offerings/${element.image.split("/").pop()}`} />
                                                </li>)
                                        ) : selectedState === 'addOnsImages' && itemImage.item!==null ?
                                    displayArray.map((element, i) =>(
                                        <li key={i} className={`grid grid-cols-[1fr_1fr_1fr_1fr_1fr]] `}>
                                            <div className="relative">
                                                <img src={`./addOns/${element.rarity}.png`} className="absolute size-25" />
                                            </div>

                                            {console.log(`./addOns/${element.image.split("/").pop()}`)}
                                            <img onClick = {() => {
                                                handleSelectState(selectedState, `./addOns/${element.image.split("/").pop()}`)
                                                console.log(addOnsImages)
                                                setAddOnsImages((prev)=>
                                                    prev.map(el =>
                                                        el.addOn === `./addOns/${element.image.split("/").pop()}` ? { ...el, rarity: element.rarity} : el))
                                            }}
                                                 className='size-25 z-1' src={`./addOns/${element.image.split("/").pop()}`} />
                                        </li>)
                                    ): <p></p> : <Spinner/>
                            }
                        </ul>
                        <img className='size-10 rotate-180 cursor-pointer' onClick={() => {countPage>page && setPage((prev) => prev+1) }} onMouseOver={() => setRightArrow('./arrowHover.png')} onMouseOut={() => setRightArrow('./arrow.png')} src={rightArrow} alt='Left Arrow'/>
                    </div>
                    {selectedState !==null && <p>{page}/{countPage}</p>}
                </div>
            </div>

        </div>
    )
}
export default MakeYourBuildCard

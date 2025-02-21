import React, {useEffect, useState} from 'react'
import Search from "../Community/Search.jsx";


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

    const [itemImage, setItemImage] = useState({image: './perkSelector.png', lockedIn: false, selected: false});
    const [addOnsImages, setAddOnsImages] = useState([{image: './perkSelector.png', lockedIn: false, selected: false}, {image: './perkSelector.png', lockedIn: false, selected: false}]);
    const [offeringImage, setOfferingImage] = useState({image: './offeringSelector.png', lockedIn: false, selected: false});
    const [perksImages, setPerksImages] = useState([{image: './perkSelector.png', lockedIn: false, selected: false},{image: './perkSelector.png', lockedIn: false, selected: false},{image: './perkSelector.png', lockedIn: false, selected: false},{image: './perkSelector.png', lockedIn: false, selected: false}]);
    const [leftArrow, setLeftArrow] = useState('./arrow.png');
    const [rightArrow, setRightArrow] = useState('./arrow.png');

    const [isDoneCaching, setIsDoneCaching] = useState(false);

    const [page, setPage] = useState(1);
    const [countPage, setCountPage] = useState(0);

    const [displayArray, setDisplayArray] = useState({array: [], isPerks: true});

    const [selectedState, setSelectedState] = useState( 'itemImage' );



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
        return data;
    };

    const fetchAssets = async (role) => {
        setIsDoneCaching(false);
        fetchWithCache(`${URL_PERKS}?role=${role}`);
        fetchWithCache( `${URL_CHARACTERS}?role=${role}`)
        fetchWithCache( `${URL_ITEMS}?role=${role}`)
        fetchWithCache( `${URL_ADDONS}?role=${role}`)
        fetchWithCache( `${URL_OFFERINGS}?role=${role}`)
        setIsDoneCaching(true);
    }

    const unlockState = (selectedState) => {
        if(selectedState === 'itemImage')
            setItemImage(prev => ({...prev, image: './perkSelector.png', lockedIn : false}))
        if(selectedState === 'addOnsImages')
            setAddOnsImages((prev)=>
                prev.map(element =>
                    ({...element, image : './perkSelector.png', lockedIn: false} )) )
        if(selectedState === 'offeringImage')
            setOfferingImage(prev => ({...prev, image: './offeringSelector.png', lockedIn : false}))
        if(selectedState === 'perksImages'){
            setPerksImages((prev)=>
                prev.map(element =>
                    ({...element, image : './perkSelector.png', lockedIn: false} )) )
        }

    }

    const setArray = async () => {
        let data;
        if(selectedState === 'perksImages')
            data = cache[`${URL_PERKS}?role=${role}`];
        if(selectedState === 'addOnsImages')
            data = cache[`${URL_ADDONS}?role=${role}`];
        if(selectedState === 'offeringImage')
            data = cache[`${URL_OFFERINGS}?role=${role}`];
        if(selectedState === 'itemImage')
            data = cache[`${URL_ITEMS}?role=${role}`];
        setCountPage(Math.ceil(Object.entries(data).length/15));
        console.log(Object.entries(data))
        setDisplayArray({array: Object.values(data).slice((page - 1) * 15, page * 15), isPerks: selectedState === 'perksImages'})

    }

    useEffect(() => {
        fetchAssets(role);
    }, [role]);

    useEffect(() => {
        (isDoneCaching)
        {
            setPage(1);
            setArray();
        }
    },[selectedState]);

    useEffect(() => {
        (isDoneCaching)
        {
            setArray();
        }
    },[page])


    return (
        <div className='grid grid-cols-[4fr_2fr] text-white text-center'>
            <div className='border-8 bg-gray-400 border-gray-700 flex justify-evenly items-center p-4'>
                <div className='flex flex-row items-center justify-center gap-4'>
                    <img className='size-25'
                         onClick={() =>(
                             unlockState(selectedState),
                             setSelectedState('itemImage'),
                             setItemImage(prev=>
                                 ({...prev, lockedIn: true, image : './perkSelectorHover.png'})
                             ))}
                         onMouseOver={() =>  !itemImage.lockedIn && setItemImage((prev) => ({...prev, image : './perkSelectorHover.png'}))} onMouseOut={() => !itemImage.lockedIn &&  setItemImage((prev) => ({...prev, image : './perkSelector.png'}))} src={itemImage.image} alt='Perk Selector'/>
                    <img className='size-15 ' src={'./plus.png'} />
                    {addOnsImages.map((addOn, index) => (
                            <img key={index} className='size-20'
                                 onClick={() =>(
                                     unlockState(selectedState),
                                     setSelectedState('addOnsImages'),
                                     setAddOnsImages((prev)=>
                                        prev.map((element, i) =>
                                                 index === i ? { ...element, image : './perkSelectorHover.png', lockedIn: true} : element))
                                 )}
                                 onMouseOver={() =>
                                     setAddOnsImages(prev =>
                                        prev.map((element, i) =>
                                    i===index && !element.lockedIn ? { ...element, image : './perkSelectorHover.png'} : element))
                                }
                                 onMouseOut={() =>
                                     setAddOnsImages((prev) =>
                                         prev.map((element, i) =>
                                             i===index && !element.lockedIn ? { ...element, image : './perkSelector.png'} : element))
                                 }
                                 src={addOn.image} alt='AddOn Slot'/>
                            )
                        )
                    }
                    {/*<img className='size-20' onMouseOver={() => setAddOnsImages((prev) => ({ prev[0].image : './perkSelectorHover.png'}))} onMouseOut={() =>  setAddOnsImages((prev) => ({...prev, image : './perkSelector.png'}))} src={addOnsImages[0].image} alt='AddOn Slot'/>*/}
                    {/*<img className='size-20' onMouseOver={() =>(setAddOn2Image('./perkSelectorHover.png'))} onMouseOut={() =>setAddOn2Image('./perkSelector.png')} src={addOnsImages[0].image} alt='AddOn Slot'/>*/}
                </div>
                <img className='size-25' onClick={() =>(
                        unlockState(selectedState),
                        setSelectedState('offeringImage'),
                        setOfferingImage(prev=>
                            ({...prev, lockedIn: true, image : './offeringSelectorHover.png'})
                        ))}
                     onMouseOver={() => !offeringImage.lockedIn && setOfferingImage((prev) => ({...prev, image : './offeringSelectorHover.png'}))} onMouseOut={() => !offeringImage.lockedIn &&  setOfferingImage((prev) => ({...prev, image : './offeringSelector.png'}))} src={offeringImage.image} alt='Offering Selector'/>
            </div>

            <div className='border-8 bg-gray-400 border-gray-700 flex justify-center items-center gap-16 p-8 col-start-2 row-start-1 row-end-4'></div>

            <div className='border-8 bg-gray-400 border-gray-700 flex justify-center items-center gap-16 p-8 col-start-1 col-end-2'>
                {perksImages.map((perk, index) => (
                            <img  key={index} className='size-20 rotate-45'
                                  onClick={() =>(
                                      unlockState(selectedState),
                                          setSelectedState('perksImages'),
                                          setPerksImages((prev)=>
                                              prev.map((element, i) =>
                                                  index === i ? { ...element, image : './perkSelectorHover.png', lockedIn: true} : element))
                                  )}
                                 onMouseOver={() =>
                                     setPerksImages(prev =>
                                         prev.map((element, i) =>
                                             i===index && !element.lockedIn ? { ...element, image : './perkSelectorHover.png'} : element))
                                 }
                                 onMouseOut={() =>
                                     setPerksImages((prev) =>
                                         prev.map((element, i) =>
                                             i===index && !element.lockedIn ? { ...element, image : './perkSelector.png'} : element))
                                 }
                                 src={perk.image} alt='Perk Slot'/>
                    )
                )
                }
            </div>

            <div className='border-8 bg-gray-400 border-gray-700 min-h-[450px] flex flex-col  p-4 col-start-1 gap-2'>

                <div className=" w-[300px] flex bg-light-100/5 px-4 py-2 rounded-lg max-w-3xl bg-gray-700 border">
                    <input className="px-1 w-full outline-hidden placeholder-light-200 text-gray-200"
                           type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <div className='flex flex-col flex-grow border-8 rounded-2xl border-gray-900 bg-gray-700'>
                    <div className='flex flex-row flex-grow justify-between items-center'>
                        <img className='size-10' onClick={() => {page>1 && setPage((prev) => prev-1)}} onMouseOver={() => setLeftArrow('./arrowHover.png')} onMouseOut={() => setLeftArrow('./arrow.png')} src={leftArrow} alt='Left Arrow'/>
                        <ul className='grid grid-cols-5 '>
                            {isDoneCaching ? displayArray['isPerks'] ?
                                displayArray['array'].map((element, i) =>
                                    <li key={i} className={`grid grid-cols-[1fr_1fr_1fr_1fr_1fr]] ${i%5===4 ? 'ml-8' : 'ml-8' }`}>
                                        <img className='size-25' src={'./dbdRandom.png'} />
                                    </li>
                                ) :
                                    displayArray['array'].map((element, i) =>
                                        <li key={i} className={`grid grid-cols-[1fr_1fr_1fr_1fr_1fr]] ${i%5===4 ? 'ml-8' : 'ml-8' }`}>
                                            <img className='size-25' src={'./dbdRandom.png'} />
                                        </li>
                                    ) :
                                <p/>
                            }
                        </ul>
                        <img className='size-10 rotate-180' onClick={() => {countPage>page && setPage((prev) => prev+1) }} onMouseOver={() => setRightArrow('./arrowHover.png')} onMouseOut={() => setRightArrow('./arrow.png')} src={rightArrow} alt='Left Arrow'/>
                    </div>
                    {isDoneCaching && <p>{page}/{countPage}</p>}
                </div>
            </div>

        </div>
    )
}
export default MakeYourBuildCard

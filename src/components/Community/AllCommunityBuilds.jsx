import React, {useEffect, useState} from 'react'
import {getCountBuilds, getPaginatedBuilds} from "../../Appwrite.js";
import Search from "./Search.jsx";
import Spinner from "../Spinner.jsx";
import BuildCard from "./BuildCard.jsx";



const API_CHARACTER_URL="/api/api/characters"

const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json'
    }
};

const AllCommunityBuilds = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

    const [role, setRole] = useState("killer");

    const [builds, setBuilds] = useState([]);

    const [page, setPage] = useState(1);

    const [killersComboBox, setKillersComboBox] = useState([]);

    const [killerSelected, setKillerSelected] = useState('');

    const [loadingBuilds, setLoadingBuilds] = useState(false);

    const [loadingKillers, setLoadingKillers] = useState(false);

    const [countBuilds, setCountBuilds] = useState(0);



    const fetchBuilds = async (page, role, killerSelected) => {
        setLoadingBuilds(true);
        try{
            console.log(killerSelected)
            const builds = await getPaginatedBuilds(page, role, killerSelected);

            setBuilds(builds);

            const count = await getCountBuilds(role, killerSelected);
            setCountBuilds(Math.ceil(count/15));
        }catch(error){
            console.log(error)
        } finally {
            setLoadingBuilds(false);
        }
    }

    const fetchKillers = async () => {
        setLoadingKillers(true);
        try{
            if (killersComboBox.length === 0) {
                const endpoint = `${API_CHARACTER_URL}`
                const response = await fetch(endpoint, API_OPTIONS);

                if (!response.ok) {
                    throw new Error(response.statusText);
                }

                const data = await response.json();


                if (data.response === 'False') {
                    setKillersComboBox([]);
                    return;
                }

                const dataArray = Object.values(data);

                const killerNames = dataArray.filter((item) => (
                    item.role === 'killer'
                ))

                setKillersComboBox(killerNames);
            }
        }catch(error){
            console.log(error)
        } finally {
            setLoadingKillers(false);
        }
    }

    useEffect(() => {
        fetchKillers();
    },[])

    useEffect(() => {
        fetchBuilds(page, role, killerSelected);
    }, [page, role, killerSelected])


    return (
        <section className=" mt-[80px] text-white">
            <div className="pb-5 flex flex-row items-center justify-between ">
                <h2 className=" text-3xl">{role === "killer" ? "Killer" : "Survivor"} Builds</h2>
                <img className='cursor-pointer size-20' onClick={() => {setRole(role === "killer" ? "survivor" : "killer")}} src={role === "killer" ? './killerIcon.png' : 'survivorIcon.png'} alt="Role Image" />
            </div>
            <div className="w-full h-[5px] bg-gray-400"/>
            <div className="pb-5 pt-5 flex flex-row items-center justify-between ">
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                {loadingKillers ? (
                    <Spinner />
                    ) : role === "killer" && (
                    <select className='cursor-pointer p-2 w-[150px]' onChange={(e) => {
                        console.log(e.target.value)
                        setKillerSelected(e.target.value)
                    }}>
                        <option className="text-gray-800" key='0' value="">All killers</option>
                        {killersComboBox.map((option, index) => (
                            <option className="text-gray-800" key={index} value={option.name}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                    )
                }

            </div>
            {builds.length > 0 && (
                    <ul className='flex flex-col gap-2'>
                        {builds.map((build, index) => (
                            <BuildCard key={index} build={build} />
                        ))}
                    </ul>
            )}
            <div className='flex justify-between mt-4'>
                <div></div>
                <div className='flex flex-row gap-2'>
                    <p>{page} / {countBuilds}</p>
                    {countBuilds>page &&
                        <button onClick={() => {setPage(prevState => prevState-1)}} className='cursor-pointer hover:bg-gray-400'>&larr;</button>
                    }

                    {page === 1 && countBuilds>page &&
                        <button onClick={() => {setPage(prevState => prevState+1)}} className='cursor-pointer hover:bg-gray-400'>&rarr;</button>
                    }


                </div>
            </div>
        </section>
    )
}
export default AllCommunityBuilds

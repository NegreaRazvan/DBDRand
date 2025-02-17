import React, {useEffect, useState} from 'react'
import {getPaginatedBuilds} from "../../Appwrite.js";
import Search from "./Search.jsx";
import Spinner from "../Spinner.jsx";



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

    const [role, setRole] = useState("Killer");

    const [builds, setBuilds] = useState([]);

    const [page, setPage] = useState(1);

    const [killersComboBox, setKillersComboBox] = useState([]);

    const [killerSelected, setKillerSelected] = useState('');

    const [loadingBuilds, setLoadingBuilds] = useState(false);

    const [loadingKillers, setLoadingKillers] = useState(false);

    const fetchBuilds = async () => {
        setLoadingBuilds(true);
        try{
            const builds = await getPaginatedBuilds(page)
            setBuilds(builds)
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
        console.log(killersComboBox);
    },[])

    useEffect(() => {
        fetchBuilds()
    }, [])

    return (
        <section className=" mt-[80px] text-white">
            <div className="pb-5 flex flex-row items-center justify-between ">
                <h2 className=" text-3xl">{role === "Killer" ? "Killer" : "Survivor"} Builds</h2>
                <img className='cursor-pointer size-20' onClick={() => {setRole(role === "Killer" ? "Survivor" : "Killer")}} src={role === "Killer" ? './killerIcon.png' : 'survivorIcon.png'} alt="Role Image" />
            </div>
            <div className="w-full h-[5px] bg-gray-400"/>
            <div className="pb-5 pt-5 flex flex-row items-center justify-between ">
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                {loadingKillers ? (
                    <Spinner />
                    ) : role === "Killer" && (
                    <select className='p-2 w-[150px]' onChange={(e) => setKillerSelected(e.target.value)}>
                        <option className="text-gray-800" key='0' value="All killers">All killers</option>
                        {killersComboBox.map((option, index) => (
                            <option className="text-gray-800" key={index} value={option.name}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                    )
                }
            </div>
        </section>
    )
}
export default AllCommunityBuilds

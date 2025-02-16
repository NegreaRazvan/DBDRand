import React, {useEffect, useState} from 'react'
import {getPaginatedBuilds} from "../../Appwrite.js";

const AllCommunityBuilds = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

    const [role, setRole] = useState("Killer");

    const [builds, setBuilds] = useState([]);

    const [page, setPage] = useState(1);

    const fetchBuilds = async () => {
        try{
            const builds = await getPaginatedBuilds(page)
            setBuilds(builds)
        }catch(error){
            console.log(error)
        }
    }

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
        </section>
    )
}
export default AllCommunityBuilds

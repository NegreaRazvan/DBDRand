import React from 'react'

const Search = ({searchTerm, setSearchTerm}) => {
    return (
        <div className="w-[600px] flex bg-light-100/5 px-4 py-2 rounded-lg max-w-3xl  bg-gray-400 border">


            <input className="px-1 w-full outline-hidden placeholder-light-200 text-gray-200"
                   type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

        </div>
    )
}
export default Search

import React from 'react'

const CommunityCard = ({text}) => {
    return (
        <div className="rounded-2xl bg-secondary shadow-inner shadow-gray-500 p-10">
            <p className="w-[400px] text-gray-700 text-2xl tracking-tight leading-[28.8px] text-center">{text}</p>
        </div>
    )
}
export default CommunityCard

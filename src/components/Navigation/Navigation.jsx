import React from 'react'
import { Link} from "react-router-dom";

const Navigation = () => {
    return (
            <div className="gap-6 text-white flex flex-row items-center justify-center">
                <Link to='/'>HOME</Link>
                <Link to='/randomizer'>RANDOMIZER</Link>
                <Link to='/makeyourbuild'>MAKE YOUR BUILD</Link>
                <Link to='/communitybuilds'>COMMUNITY BUILDS</Link>
            </div>
    )
}
export default Navigation

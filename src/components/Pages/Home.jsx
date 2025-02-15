import React from 'react'
import RandomizeBuildHomeSection from "../HomeSections/RandomizeBuildHomeSection.jsx";
import MakeYourBuildHomeSection from "../HomeSections/MakeYourBuildHomeSection.jsx";
import CommunityBuildsHomeSection from "../HomeSections/CommunityBuildsHomeSection.jsx";
import {motion} from "framer-motion";

const Home = () => {
    return (
        <motion.div initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}>
            <RandomizeBuildHomeSection/>
            <MakeYourBuildHomeSection/>
            <CommunityBuildsHomeSection/>
        </motion.div>
    )
}
export default Home

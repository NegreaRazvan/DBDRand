import {useEffect, useRef, useState} from 'react'
import RandomizeBuildHomeSection from "../HomeSections/RandomizeBuildHomeSection.jsx";
import MakeYourBuildHomeSection from "../HomeSections/MakeYourBuildHomeSection.jsx";
import CommunityBuildsHomeSection from "../HomeSections/CommunityBuildsHomeSection.jsx";


const Home = () => {
    const [isVisible, setIsVisible] = useState({});
    const sectionRef=useRef([]);

    const addToRefs = (el) => {
        if (el && !sectionRef.current.includes(el)) {
            sectionRef.current.push(el);
        }
    };


    useEffect(() => {
        const observer= new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const id= entry.target.id;
                setIsVisible((prev) => ({
                    ...prev,
                    [id]: entry.isIntersecting,
                }));
                if(entry.isIntersecting)
                    observer.unobserve(entry.target);

            })
        }, {threshold: 0.2})

        sectionRef.current.forEach(el => {
            observer.observe(el);
        })

        return () => observer.disconnect();
    }, []);

    return (
        <div >
            <div id="randomize" ref={addToRefs}>
                <RandomizeBuildHomeSection isVisible={isVisible["randomize"]} />
            </div>
            <div id="build" ref={addToRefs}>
                <MakeYourBuildHomeSection isVisible={isVisible["build"]}/>
            </div>
            <div id="community" ref={addToRefs}>
                <CommunityBuildsHomeSection isVisible={isVisible["community"]}/>
            </div>
        </div>
    )
}
export default Home

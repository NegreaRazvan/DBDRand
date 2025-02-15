import React from 'react'
import CommunityBuilds from "./components/Pages/CommunityBuilds.jsx";
import RandomizeBuild from "./components/Pages/RandomizeBuild.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MakeYourBuild from "./components/Pages/MakeYourBuild.jsx";
import Home from "./components/Pages/Home.jsx";
import Layout from "./components/Layout.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/randomizer' element={<RandomizeBuild/>}/>
                    <Route path='/makeyourbuild' element={<MakeYourBuild/>}/>
                    <Route path='/communitybuilds' element={<CommunityBuilds/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
export default App

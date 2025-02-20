import React from 'react'
import CommunityBuilds from "./components/Pages/CommunityBuilds.jsx";
import RandomizeBuild from "./components/Pages/RandomizeBuild.jsx";
import {BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes} from "react-router-dom";
import MakeYourBuild from "./components/Pages/MakeYourBuild.jsx";
import Home from "./components/Pages/Home.jsx";
import Layout from "./components/Layout.jsx";
import RandomizerLayout from "./components/Randomizer/RandomizerLayout.jsx";

const App = () => {
    const router = createBrowserRouter([{
        path : "/",
        element : <Layout/>,
        children: [
            {path : "/", element: <Home/>, loader : () => {}},
            {path : "/randomizer", element : <RandomizerLayout/>},
            {path : "/makeyourbuild", element : <MakeYourBuild/>},
            {path : "/communitybuilds", element : <CommunityBuilds/>},
            // {path : "/adi" , element: <p>adi2</p>}
        ]
    }]);
    return (
        <RouterProvider router={router}/>

        // <BrowserRouter>
        //     <Routes>
        //         <Route element={<Layout/>}>
        //             <Route path='/' element={<Home/>}/>
        //             <Route path='/randomizer' element={<RandomizeBuild/>}/>
        //             <Route path='/makeyourbuild' element={<MakeYourBuild/>}/>
        //             <Route path='/communitybuilds' element={<CommunityBuilds/>}/>
        //         </Route>
        //     </Routes>
        // </BrowserRouter>
    )
}
export default App

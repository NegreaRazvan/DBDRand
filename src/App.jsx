import React from 'react'
import Logo from "./components/Logo.jsx";
import Navigation from "./components/Navigation.jsx";
import RandomizeBuild from "./components/RandomizeBuild.jsx";
import MakeYourBuild from "./components/MakeYourBuild.jsx";

const App = () => {
    return (
        <main className="relative bg-primary min-h-screen ">
            <div className=" max-w-6xl mx-auto ">
                <div className="flex flex-row items-center shadow-2xl justify-between">
                   <div className="flex flex-row gap-20 ">
                        <Logo/>
                        <Navigation />
                    </div>
                    <img className="size-10 rounded-full" src={"./profile.png"}></img>
                </div>
                <div className="">
                    <RandomizeBuild></RandomizeBuild>
                    <MakeYourBuild/>
                </div>
            </div>

        </main>
    )
}
export default App

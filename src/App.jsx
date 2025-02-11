import React from 'react'
import Logo from "./components/Logo.jsx";
import Navigation from "./components/Navigation.jsx";

const App = () => {
    const [openHamburger, setOpenHamburger] = React.useState(false);
    return (
        <main className="relative bg-primary min-h-screen">
            <div className="flex flex-row justify-between">
                <Logo/>
                <Navigation openHamburger={openHamburger} />
            </div>

        </main>
    )
}
export default App

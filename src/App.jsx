import { Dock } from "./components/dock.jsx";
import { Navbar } from "./components/navbar";
import { Welcome_code } from "./components/welcome";
import { Windows } from "./components/Windows";
import gsap from "gsap";
import Safari from "./windows/safari.jsx";

import { Draggable } from "gsap/Draggable";
// this below is to register dragabble windows 
gsap.registerPlugin(Draggable)



function App() {
    return (
        <main className="w-full h-full">
            <Navbar />
            <div>
                <Welcome_code />
                <Dock />
                <Windows />
                <Safari />
            </div>
        </main>
    );
}

export default App;

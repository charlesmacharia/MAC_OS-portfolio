import { Dock } from "./components/dock.jsx";
import { Navbar } from "./components/navbar";
import { Welcome_code } from "./components/welcome";
import Terminal from "./windows/terminal.jsx";

function App() {
    return (
        <main>
            <Navbar />
            <div>
                <Welcome_code />
                <Dock />
                <Terminal/>
            </div>
        </main>
    );
}

export default App;

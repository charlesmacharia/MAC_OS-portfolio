import { Dock } from "./components/dock.jsx";
import { Navbar } from "./components/navbar";
import { Welcome_code } from "./components/welcome";

function App() {
    return (
        <main>
            <Navbar />
            <div>
                <Welcome_code />
                <Dock />
            </div>
        </main>
    );
}

export default App;

import { techStack } from "../constants";
import windowWrapper from "../HOC/window";
import { Check, Flag } from "lucide-react";
import Windowcontrols from "../components/windowControls";

const Terminal = () => {
    console.log("Terminal component rendering...");
    return (
        <>
           <div id="window-header" className="header bg-gray-800 text-white p-4">
                <Windowcontrols windowKey="terminal"/>
                <p>
                    <span className="font-bold">@kiruri_macharia charles  %</span>about me
                </p>
            </div>
            <div className="techstack">
                <p>
                    <span className="font-bold">@kiruri_macharia charles  %</span> Techstack
                </p>


                <div className="label">
                    <p className="w-32">Category</p>
                    <p>Technologies</p>
                </div>

                <ul className="content">
                    {techStack.map(({ category, items }) => (
                        <li key={category} className="flex items-center">
                            <Check className="check" size={20} />
                            <h3>{category}</h3>
                            <ul>
                                {items.map((item, i) => (
                                    <li key={i}>{item}{i < items.length - 1 ? "," : ""}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>

                <div className="footnote"> 
                    <p>
                        <Check size={20}/> 5 of 5 stacks loaded sucessfully.
                    </p>

                    <p className="text-black">
                    <Flag size={20} fill="black" /> Render time: 6.32ms
                    </p>
                </div>
            </div>
        </>
    );
};

const TerminalWindow = windowWrapper(Terminal, "terminal");

export default TerminalWindow;
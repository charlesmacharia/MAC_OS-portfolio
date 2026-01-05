import { useRef } from "react";
import { dockApps } from "../constants";
// ISSUE FIXED: Removed trailing space after "react-tooltip" - was causing import resolution error
import { Tooltip } from "react-tooltip"; // dont forget to run  npm install react-tooltip to download react-tooltip
// ISSUE FIXED: Changed from 'gsap/gsap-core' to 'gsap' - using the standard import ensures proper offline functionality
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import {useWindowStore } from "C:\Users\HP\Desktop\macos_portfolio2\src\store\window.js"

export const Dock = () => {
const {openWindow } = useWindowStore();
    const dockRef = useRef(null);

    // animates using gsap
    useGSAP(() => {
        // define the dock
        const dock = dockRef.current;

        if (!dock) return () => {}; // if there is no dock we simply exist the function (return nothing) because there is nothing to animate

        // when there is a dock;
        // we are ready to get acess to all the docks we want to animate

        const icons = dock.querySelectorAll(".dock-icon"); //gets all classes of dock-icon.

        // function that animates the selected docks based on the horizontal position of the mouse (mouseX position)
        const animateIcons = (mouseX) => {
            // this gets acess to the left position of the dock so we know where it starts
            const { left } = dock.getBoundingClientRect();

            icons.forEach((icon) => {
                // gets start position of the icon by looking for the utmost left of an icon (the start) and the width  of the icon
                const { left: iconleft, width } = icon.getBoundingClientRect();

                // this (below) gets the center of the icon
                const center = iconleft - left + width / 2;

                // this (below ) gets the absolute  distance of the mouse from the center of the icon
                // ISSUE FIXED: Changed 'math.abs' to 'Math.abs' (capital M) - JavaScript's Math object requires capital M
                const distance = Math.abs(mouseX - center);

                // this (below ) controls  the intensity of the hover effect
                const intensity = Math.exp(-(distance ** 2.5) / 20000);

                gsap.to(icon, {
                    scale: 1 + 0.25 * intensity,
                    y: -15 * intensity, // changes the y position
                    duration: 0.2,
                    ease: "power1.out",
                });
            });
        };

        const handleMouseMove = (e) => {
            const { left } = dock.getBoundingClientRect();
            // clientX is the current position of the mouse
            animateIcons(e.clientX - left);
        };

        //  callback function to reset the icons once we move out of their view
        const resetIcons = () =>
            icons.forEach((icon) =>
                gsap.to(icon, {
                    scale: 1,
                    y: 0,
                    duration: 0.3,
                    ease: "power1.out",
                })
            );

        dock.addEventListener("mousemove", handleMouseMove);
        // ISSUE FIXED: Changed 'mouseLeave' to 'mouseleave' (all lowercase) - DOM event names are case-sensitive and must be lowercase
        dock.addEventListener("mouseleave", resetIcons);

        // cleanup
        // ISSUE FIXED: Changed second 'mousemove' to 'mouseleave' - was removing the wrong event listener
        return () => {
            dock.removeEventListener("mousemove", handleMouseMove);
            dock.removeEventListener("mouseleave", resetIcons);

        };
    } , [] ); //we add the empty dependacy array []  to the gsap hook when we want it to happen atthe start 

    const toggleApp = (appId) => {
if(!app.canOpen)return; {/*if an app CAN NOT open then simply return ,
    else... */}

// if window is already open ,then close window and pass app id of the window we want to close 
if(window.isOpen) {
    closeWindow(app.id)
} //else i'll open the  app id and 
else {
    openWindow(app.id)
}

console.log(windows)
    };
    return (
        <section id="dock">
            <div ref={dockRef} className="dock-container">
                {/* ISSUE FIXED: Added 'return' statement - React map functions must return JSX */}
                {/* ISSUE FIXED: Changed 'app' to 'id' - app variable doesn't exist, we need to pass the id */}
                {/* ISSUE FIXED: Changed template literal syntax from "/images/${icons}" to proper JSX template literal and fixed variable name from 'icons' (plural) to 'icon' (singular) */}
                {/* ISSUE FIXED: Changed className from string "canOpen ? '' : 'opacity-60' " to actual ternary expression */}
                {dockApps.map(({ id, name, icon, canOpen }) => {
                    return (
                        <div key={id} className="relative flex justify-center">
                            <button
                                type="button"
                                className="dock-icon"
                                aria-label={name}
                                data-tooltip-id="dock-tooltip"
                                data-tooltip-content={name}
                                data-tooltip-delay-show={150}
                                disabled={!canOpen}
                                onClick={() => toggleApp(id)}
                            >
                                <img
                                    src={`/images/${icon}`}
                                    alt={name}
                                    loading="lazy"
                                    className={canOpen ? '' : 'opacity-60'}
                                />
                            </button>
                        </div>
                    );
                })}

                <Tooltip id="dock-tooltip" place="top" className="tooltip" />
            </div>
        </section>
    );
};

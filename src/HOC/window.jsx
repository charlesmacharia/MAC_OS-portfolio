// This HOC (higher order components )is a function that takes a component as input
// and then return an enhanced version of component

import React, { useLayoutEffect, useRef } from "react";
import { useWindowStore } from "../store/window";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import Draggable from "gsap/Draggable";

gsap.registerPlugin(Draggable);

// every higher order component needs to accept a component as an input .

// This HOC component wraps a component to give it window features 


const windowWrapper = (component, windowKey) => {

    // this gets access to the variables and functiions in the windows store
    // this wrapped is an enhanced component with window features


    /*const wrapped here is the same as EnhancedComponent */
    const Wrapped = (props) => {
        const { focusWindow, windows } = useWindowStore();

        // guard and use consistent name
        const win = windows?.[windowKey] || {};
        const { isOpen = false, zIndex = 0, isMinimized = false, isMaximized = false } = win;


        const ref = useRef(null); // ref used to manage the animations

        // the gsap animations for opening the window 

        // GSAP animation for opening window
        useGSAP(() => {
            const el = ref.current;
            if (!el || !isOpen) return;

            el.style.display = "block";

            // Animate window opening
            gsap.fromTo(el,
                { scale: 0.8, opacity: 0, y: 40 },
                { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
            );

        }, [isOpen]);

        useGSAP(() => {
            const el = ref.current
            if (!el) return;

            Draggable.create(el, {
                onPress: () =>
                    focusWindow(windowKey)
            });

            // kill instance of draggable 
            const [instance] = Draggable.create(el, {
                onPress: () =>
                    focusWindow(windowKey),

                onRelease: () => {
                    instance.kill();  //same as return() => focusWindow(windowKey)
                }
            })

        }, []);

        // This handles the display changes for closing
        useLayoutEffect(() => {

            const el = ref.current;
            if (!el) return;

            if (!isOpen) {
                // Animate closing then hide
                gsap.to(el, {
                    scale: 0.8,
                    opacity: 0,
                    y: 40,
                    duration: 0.3,
                    ease: "power3.in",
                    onComplete: () => {
                        el.style.display = "none";
                    }
                });
            }
        }, [isOpen]);

        return (
            <section
                id={windowKey}
                ref={ref}
                style={{ zIndex, ...(isMinimized || !isOpen ? { display: "none" } : {}), ...(isMaximized ? { position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh" } : {}) }}
                className="window-container"
                onClick={() => focusWindow(windowKey)}
            >
                {React.createElement(component, props)}
            </section>
        );
    };

    // setting a display name for easier debugging
    Wrapped.displayName = `windowWrapper(${component.displayName || component.name || "Component"
        })`;

    return Wrapped;
};

export default windowWrapper;


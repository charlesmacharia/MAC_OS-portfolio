// This HOC (higher order components )is a function that takes a component as input
// and then return an enhanced version of the component

import React, { useLayoutEffect, useRef } from "react";
import { useWindowStore } from "../store/window";
import { useGSAP } from "@gsap/react";

// every higher order component needs to accept a component as an input .
const windowWrapper = (component, windowKey) => {
    // this gets acces to the variables and functiions in the windows store
    const Wrapped = (props) => {
        const { focuswindow, windows } = useWindowStore();

        // guard and use consistent name
        const win = windows?.[windowKey] || {};
        const { isOpen = false, zIndex = 0 } = win;

        const ref = useRef(null); // ref used to manage the animations

        useGSAP(() => {
            const el = ref.current;
            if (!el || !isOpen) return;

            el.style.display = "block"; // makes sure the window is visible
            // animation for opening the window
        }, [isOpen]);

        useLayoutEffect(() => {
            const el = ref.current;
            if (!el) return;

            el.style.display = isOpen ? "block" : "none";
        }, [isOpen]);

        return (
            <section
                id={windowKey}
                ref={ref}
                style={{ zIndex }}
                className="absolute"
            >
                {React.createElement(component, props)}
            </section>
        );
    };

    // setting a display name for easier debugging
    Wrapped.displayName = `windowWrapper(${
        component.displayName || component.name || "Component"
    })`;

    return Wrapped;
};

export default windowWrapper;

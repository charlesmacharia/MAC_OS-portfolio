import { create } from "zustand";
import { immer } from "zustand/middleware/immer"
{/* immer is a middleware that enables you perfome immutable updates (provides for  cleaner , less bug prone code.) */ }
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "../constants";
import { Minimize } from "lucide-react";


export const useWindowStore = create(
    immer((set) => ({
        windows: WINDOW_CONFIG,
        nextZIndex: INITIAL_Z_INDEX + 1,
        //comma is important for syntax here


        // function that controls  window  openning 
        openWindow: (windowKey, data = null) => {
            set((state) => {

                const win = state.windows[windowKey]
                win.isOpen = true;
                win.isMinimized = false;
                win.zIndex = state.nextZIndex;
                win.data = data ?? win.data; // if new data doesnt exist we make it the same as the data that was already there.
                state.nextZIndex++;
            })

        },

        // function that controls window closing below 
        closeWindow: (windowKey) => {
            set((state) => {
                const win = state.windows[windowKey]
                win.isOpen = false;
                win.isMinimized = false;
                win.isMaximized = false;
                win.zIndex = INITIAL_Z_INDEX;
                win.data = null;

            })

        },

        // function that controls 
        focusWindow: (windowKey, data = null) => {
            set((state) => {

                const win = state.windows[windowKey]
                win.zIndex = state.nextZIndex++;
            })

        },

        minimizeWindow: (windowKey) => {
            set((state) => {
                const win = state.windows[windowKey]
                win.isMinimized = true;
            })
        },

        restoreWindow: (windowKey) => {  // For "un-minimize"
            set((state) => {
                const win = state.windows[windowKey];
                if (win) {
                    win.isMinimized = false;
                }
            });
        },

        maximizeWindow: (windowKey) => {
            set((state) => {
                const win = state.windows[windowKey]
                win.isMaximized = !win.isMaximized; // toggle the value of isMaximized on and off 
            })
        }
    }))
)

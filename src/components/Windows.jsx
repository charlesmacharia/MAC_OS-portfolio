import { useWindowStore } from "../store/window";
import TerminalWindow from "../windows/terminal";
import SafariWindow from "../windows/safari";

const windowComponents = {
  terminal: TerminalWindow,
  safari: SafariWindow,
  // Add other window components here as you create them
};

export const Windows = () => {
  const { windows } = useWindowStore();
  console.log("Windows component rendering, windows state:", windows);

  return (
    <>
      {Object.entries(windows).map(([key, config]) => {
        console.log(`Window ${key}: isOpen=${config.isOpen}`);
        if (!config.isOpen) return null;
        
        const WindowComponent = windowComponents[key];
        if (!WindowComponent) {
          console.warn(`No component found for window: ${key}`);
          return null;
        }

        return <WindowComponent key={key} />;
      })}
    </>
  );
};

import { useWindowStore } from "../store/window";


const Windowcontrols = ({windowKey}) => {

    const {closeWindow,minimizeWindow,maximizeWindow} = useWindowStore()   
    
    return <div id= "window-controls">
        <div className="close"onClick={() => closeWindow(windowKey)}/>
        <div className="minimize"onClick={() => minimizeWindow(windowKey)}/>
        <div className="maximize"onClick={() => maximizeWindow(windowKey)}/>
    </div>
};

export default Windowcontrols;

import React from "react";
import "../styles/mainheading.css"
import menu from "./menu.png"
import darkMenu from "./menu-bar.png"

export default function MainHeading(props){
    const {toggle,dark}=props;
    return (
        <>
            <div className={`main-heading ${dark ? "dark-theme-on":""} `}>
                <img src={dark ? menu : menu } className="menu" onClick={()=>toggle(val=>!val)}/>
                <p className="main-heading-text">ALGORITHM VISUALIZER</p>
            </div>
        </>
    )
}
import React, { useState } from "react";
import sun from "../styles/sun.png"
import moon from "../styles/moon.png"
import "../styles/mode.css"

export default function ModeToggler(props){
    const {dark,setDark}=props;
    return(
        <>
            <div className={`mode ${dark ? "dark" : ""}`} onClick={()=>setDark(x=>!x)} >
                <div className={`sun ${dark ? "nosun":""}`}><img className="sun-image" src={sun}></img></div>
                <div className={`inner-toggle ${dark ? "dark-inner-toggle" : ""}`}></div>
                <div className={`moon ${dark ? "":"nomoon"}`}><img className="moon-image" src={moon}></img></div>
            </div>
        </>
    )
}
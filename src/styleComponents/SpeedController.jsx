import { useState } from "react";
import React from "react";
import drop from "../styles/down.png"
import "../styles/speedDrop.css"

export default function SpeedDrop(props){
    const [dropdown,setDropdown]=useState(false);
    const {dark,selected,setSelected,setSpeed}=props;
    
    return(
        <div className="speedDropdown">
            <div className={`dropdownButton ${dark ? "setDark":""}`} onClick={()=>setDropdown(x=>!x)}>
                    <p className="selectedText">{selected}</p>
                    <img className="drop-icon" src={drop}  />
            </div>
            {dropdown && (
                <div className={`dropdownContent ${dark ? "set-dark":""}`} onClick={()=>setDropdown(x=>!x)} >
                    <div className="dropdownItem" onClick={(e)=>{
                                                                    setSelected(e.target.textContent)
                                                                    setSpeed(100);
                                                                }}>
                        Slow
                    </div>
                    <div className="dropdownItem" onClick={(e)=>{
                                                                    setSelected(e.target.textContent)
                                                                    setSpeed(50);
                                                                }} >
                        Medium
                    </div>
                    <div className="dropdownItem" onClick={(e)=>{
                                                                    setSelected(e.target.textContent)
                                                                    setSpeed(10);
                                                                }} >
                        Fast
                    </div>
                </div>
            )}
        </div>
    )
}
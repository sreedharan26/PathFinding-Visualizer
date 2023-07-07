import React from "react";
import SpeedDrop from "./SpeedController";
import ModeToggler from "./modeToggler";
import "../styles/buttons.css"
import { useState } from "react";

export default function Buttons(props){
    const {one,two,three,four,five,six,speedVal,speedfunc,dark,setDark}=props;
    const [selected,setSelected]=React.useState("Fast")
    return (
        <>
            <div className={`buttons-container ${dark ? "dark-theme-on":""}`}>
                <div className="starter"></div>
                <p className="algorithms">Algorithms: </p>
                <button className="btn" onClick={()=>two()}>Dijkstra's</button>
                <button className="btn" onClick={()=>three()}>BFS </button>
                <button className="btn" onClick={()=>four()}>DFS</button>
                <button className="btn" onClick={()=>five()}>A Star</button>
                <div className="breaker"></div>
                <button className="btn" onClick={()=>one()}>Reset</button>
                <button className="btn" onClick={()=>six()}>Maze</button>
                <div className="breaker"></div>
                <div className="speed">
                    <p className="speedText">Speed: </p>
                    <SpeedDrop dark={dark} selected={selected} setSelected={setSelected} setSpeed={speedfunc}/>
                </div>
                <div className="breaker"></div>
                <ModeToggler dark={dark} setDark={setDark} />
                {/* <div className="mode-container">

                </div> */}
            </div>
        </>
    )
}
{/* <div className="speedcontroller cnt" >
    <p>Delay: </p>
    <input type="range" min="10" max="100"  value={speedVal} className="speed-slider" onChange={(e)=>{let x=Math.floor(1000/(e.target.value));speedfunc(x)}}/>
</div> */}
import React from "react";
import "../styles/node.css"

export default function Node(props){
    const {clas,dark,row,col,isFinish,isStart,isWall,isVisited,justVisited,isPath,onMouseEnter,onMouseUp,onMouseDown,mouseIsPressed,isHere,onClick}=props;
    const extraClassName= props.isFinish ? "node-finish" : props.isStart ? "node-start" : props.isVisited ? "node-visited" : props.isPath ? "node-path" : props.isWall ? "node-wall" : "";
    const here = isHere ? "isHere" : ""
    return (
        <div 
            className={`node ${dark ? "dark-on":""} ${justVisited ? "justVisitedNeigh" : ""} ${extraClassName} ${clas ? "blink" : ""}`}
            onMouseEnter={()=>onMouseEnter(row,col)}
            onMouseDown={()=>onMouseDown(row,col)}
            onMouseUp={()=>onMouseUp()}
            onClick={onClick}
            >
        </div>
    )
}
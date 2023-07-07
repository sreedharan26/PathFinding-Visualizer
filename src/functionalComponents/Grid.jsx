import React from "react";
import Node from "./Node";
import "../styles/grid.css"

export default function Grid(props){
    const {grid,one,two,three,mouse,handle,dark,clas}=props;

    return (
        <>
            <div className={`grid ${dark ? "dark-theme-on":""}`}>
                {
                    grid.map((row,rowId) => {
                        return (
                            <div className="row" key={rowId}>
                                {
                                    row.map((node,nodeId) => {
                                        const { row, col, isStart, isFinish, isWall, isVisited, isPath, isHere,justVisited } = node;
                                        return (
                                            <Node 
                                                dark={dark}
                                                clas={clas}
                                                key={nodeId}
                                                row={row}
                                                col={col}
                                                isHere={isHere}
                                                isStart={isStart}
                                                isFinish={isFinish}
                                                isWall={isWall}
                                                isVisited={isVisited}
                                                justVisited={justVisited}
                                                isPath={isPath}
                                                mouseIsPressed={mouse.mouseIsPressed}
                                                onMouseDown={(row, col) => one(row, col)}
                                                onMouseEnter={(row, col) =>
                                                two(row, col)
                                                }
                                                onMouseUp={() => three()}
                                                onClick={(e)=>handle(e,row,col)}
                                            />
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
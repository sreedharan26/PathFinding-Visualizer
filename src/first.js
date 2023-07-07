//replaced this with react component
{/* <div className="grid">
  {arr.map((row, rowId) => {
    return (
      <div className="row" key={rowId}>
        {row.map((node, nodeId) => {
          const { row, col, isStart, isFinish, isWall, isVisited, isPath, isHere,justVisited } = node;
          return (
            <Node
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
              onMouseDown={(row, col) => handleMouseDown(row, col)}
              onMouseEnter={(row, col) =>
                handleMouseEnter(row, col)
              }
              onMouseUp={() => handleMouseUp()}
              onClick={(e)=>handleClick(e,row,col)}
            />
          )})
        }
      </div>
    )
  })}
</div> */}


// import React from "react"
// import Node from "./components/Node"
// import { dijkstras,getShortestPath } from "./algorithms/dijkstras";
// import './App.css'

// export default function App(){
//     const startRow = 10;
//     const startCol = 5;
//     const endRow = 10;
//     const endCol = 45;

//     const [arr,setArr] = React.useState([]);

//     React.useEffect(()=>{
//       initial();
//     },[])

//     function initial(){
//       const grid=[]
//       for(let row=0;row<20;row++){
//         let currentRow=[]
//         for(let col=0;col<50;col++){
//           currentRow.push({
//             row,
//             col,
//             isStart: row===10 && col===5,
//             isFinish: row===10 && col===45,
//             distance: Infinity,
//             isVisited: false,
//             isWall: false,
//             previousNode: null,
//           })
//         }
//         grid.push(currentRow);
//       }
//       setArr(val=>grid)
//     }
//     // console.log(grid.node);
//     // console.log(grid.node[startRow][startCol])

//     function animateDijkstras(visitedNodesInOrder, shortestPath){
//       for (let i = 0; i <= visitedNodesInOrder.length; i++) {
//         if (i === visitedNodesInOrder.length) {
//           setTimeout(() => {
//             animateShortestPath(shortestPath);
//           }, 50 * i);
//           return;
//         }
//         setTimeout(() => {
//           const node = visitedNodesInOrder[i];
//           setArr(prevArr => {
//             const newGrid = [...prevArr];
//             const newNode = {
//               ...node,
//               isVisited: true,
//             };
//             newGrid[node.row][node.col] = newNode;
//             return newGrid;
//           });
//         }, 50 * i);
//       }
//     }

//     function animateShortestPath(shortestPath) {
//       for (let i = 0; i < shortestPath.length; i++) {
//         setTimeout(() => {
//           const node = shortestPath[i];
//           setArr(prevArr => {
//             const newGrid = [...prevArr];
//             const newNode = {
//               ...node,
//               isVisited: false,
//               isPath: true,
//             };
//             newGrid[node.row][node.col] = newNode;
//             return newGrid;
//           });
//         }, 50 * i);
//       }
//     }

//     function visualizeDijkstras(){
//       console.log("first" , arr)
//       const copiedState = [ ...arr ];
//       const v = copiedState.map(row => [...row.map(obj => ({ ...obj }))])
//       const startNode = v[startRow][startCol];
//       const endNode = v[endRow][endCol];
//       const visitedNodesInOrder = dijkstras(v,startNode,endNode);
//       animateDijkstras(visitedNodesInOrder,getShortestPath());

//     }
//   return (
//     <div className="grid-container">
//       <button onClick={visualizeDijkstras}>Dijkstra's</button>
//       <div className="grid">
//         {
//           arr.map((row,rowId)=>{
//             return (
//                 <div className="row" key={rowId}>
//                   {row.map((node,nodeId) => {
//                     const {row,col,isStart,isFinish,isWall,isVisited}=node;
//                       return (
//                         <Node 
//                           key={nodeId} 
//                           row={row} 
//                           col={col} 
//                           isStart={isStart} 
//                           isFinish={isFinish}
//                           isWall={isWall} 

//                         />
//                       );
//                     })}
//                 </div>
//             )    
//           })
//         }
//       </div>
//     </div>
//   )
// }
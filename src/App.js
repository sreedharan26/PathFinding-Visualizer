import React, { useState, useEffect } from "react";
import {flushSync} from 'react-dom';
import MainHeading from "./styleComponents/MainHeading";
import Sidebar from "./styleComponents/Sidebar.jsx";
import Buttons from "./styleComponents/Buttons";
import Grid from "./functionalComponents/Grid";
import { dijkstras, getShortestPath } from "./algorithms/dijkstras";
import { bfs, getShortestPathBFS } from "./algorithms/BFS";
import { solveDFS, getShortestPathDFS } from "./algorithms/DFS";
import { aStar,getPath } from "./algorithms/aStar";
import randomMaze from "./algorithms/mazeGenerator";
import "./styles/App.css";


export default function App() {

  //all states declaration
  const [startRow,setStartRow] = useState(-1);
  const [startCol,setStartCol] = useState(-1);
  const [endRow,setEndRow] = useState(-1);
  const [endCol, setEndCol] = useState(-1);
  const [start,setStart]=useState(false);
  const [finish,setFinish]=useState(false);
  const [refresh,setrefresh]=useState(false);
  const [arr, setArr] = useState([]);
  const [mouse, setMouse]=useState( {mouseIsPressed: false})
  const [show, setShow] = useState(false)
  const [spl, setSpl] = useState(0)
  const [speed,setSpeed]=useState(10);
  const [sToggle,setSToggle]=useState(true);
  const [dark,setDark]=useState(false);
  const [text,setText]=useState(0);
  const [error, setError] = useState({present : false, message : ""});
  const [clas,setClas] = useState(false); 
  
  //to display the description
  const displayText=[ <p>⭐️ Select a start Node and an end Node in the grid below. Select an algorithm and visualize it! You can also create a simple <b>maze</b></p>,
                      <p>👉 Dijkstra's algorithm allows us to find the <b>shortest path</b> between any two vertices of a graph.</p>,
                      <p>👉 Breadth-first search (BFS) is an algorithm for searching a graph for a node that satisfies a given property.<b>Guaruntees shortest path</b></p>,
                      <p>👉 Depth-first search (DFS) is an algorithm for searching a tree data structure for a node that satisfies a given property.<b>Can't guaruntee shortest path</b></p>,
                      <p>👉 A-Star algorithm uses a heuristic function <b><i>(f(n) = g(n) + h(n))</i></b> for traversal which helps it to decide the further path.<b>Guaruntees shortest path</b></p>
                    ]

  
  //after loading of the page first initialize the grid
  useEffect(() => {
    initializeGrid();
  }, []);

  useEffect(()=>{
    if(clas)
    setTimeout(()=>{
      setClas(false);
    },500)
  },[clas])

  //a function to first mark the nodes as start and finish
  function handleClick(e,row,col){
    e.preventDefault();
    if(start && finish){
      return
    }
    if(start){
      setFinish(true);
      setEndCol(col);
      setEndRow(row);
      arr[row][col].isFinish=true;
    }else{
      setStart(true);
      setStartCol(col);
      setStartRow(row);
      arr[row][col].isStart=true;
    }
    return;
  }

  //a function to reset all the components
  function reset(){
    setStartRow(val=>-1);
    setStartCol(val=>-1);
    setEndRow(val=>-1);
    setEndCol(val=>-1);
    setStart(val=>false);
    setFinish(val=>false);
    setShow(val=>false);
    setText(0);
    setError({present : false, message : ""});
  }
  useEffect(()=>{
    initializeGrid();
  },[startCol,startRow,endCol,endRow])

  //initialization of grid
  function initializeGrid() {
    const grid = [];
    for (let row = 0; row < 30; row++) {
      let currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push({
          row,
          col,
          isStart: row === startRow && col === startCol,
          isFinish: row === endRow && col === endCol,
          distance: Infinity,
          isVisited: false,
          isWall: false,
          justVisited:false,
          previousNode: null,
          isHere:false,
          f:Infinity,
          g:Infinity,
          h:Infinity
        });
      }
      grid.push(currentRow);
    }
    setArr(grid);

  }

  //functionality starts
  //a function that takes the order of visited nodes and animate them in the grid component
  function animateAlgo(visitedNodesInOrder,justVisitedNodes, shortestPath) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(shortestPath);
          setShow(true)
        }, speed * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const justVisited=(justVisitedNodes && justVisitedNodes[i]);
        setArr(prevArr => {
          const newGrid = [...prevArr];
          const newNode = {
            ...node,
            isVisited: true,
            isHere:true,
          };
          newGrid[node.row][node.col] = newNode;
          for(let k=0;(justVisited && k<justVisited.length);k++){
            const {row,col}=justVisited[k];
            newGrid[row][col].justVisited=true;
          }
          return newGrid;
        });
      }, speed * i);
    }
  }

  //this animates the shortest path at last
  function animateShortestPath(shortestPath) {
    for (let i = 0; i < shortestPath.length; i++) {
      setTimeout(() => {
        const node = shortestPath[i];
        setArr(prevArr => {
          const newGrid = [...prevArr];
          const newNode = {
            ...node,
            isVisited: false,
            isPath: true,
            isHere:true
          };
          newGrid[node.row][node.col] = newNode;
          return newGrid;
        });
      }, speed * i);
    }
  }

  //generates a maze of walls
  function visualizeMaze(){
    const grid=structuredClone(arr);
    randomMaze(grid);
    // console.log(grid);
    setArr(grid);
  }

  // a function to visualize the dijkstra
  function visualizeDijkstra() {
    try{
      if(startCol!==-1 && endCol!==-1 && startCol!=-1 && startRow!=-1){
        setError({present : false, message : ""});
      }else{
        throw Error("Please select starting point and ending point in the below grid")
      }
    }
    catch(err){
      console.log(err.message);
      setError({present:true,message:err.message});
      setClas(true);
      return;

    }
    setText(1);
    // const arrClone = structuredClone(arr);  //shortcut for deep copying of nested objects
    const copiedState = [...arr];  //shallow copy of nested objects still passes the references of inside objects
    const grid = copiedState.map(row => [...row.map(obj => ({ ...obj }))]);  //so we need to again map over all objects and use spread operator

    const startNode = (startRow >= 0 && startCol >= 0 && grid[startRow][startCol]) || grid[0][0];
    const endNode = (endRow >= 0 && endCol >= 0 && grid[endRow][endCol]) || grid[10][10];
    const justVisitedNodes=[]
    startNode.isWall=false;
    endNode.isWall=false;
    const visitedNodesInOrder = dijkstras(grid, startNode, endNode,justVisitedNodes);
    const shortestPath=getShortestPath(endNode)
    setSpl(shortestPath.length)
    animateAlgo(visitedNodesInOrder,justVisitedNodes, shortestPath);
  }

  // a function to visualize the bfs
  function visualizeBFS(){
    try{
      if(startCol!==-1 && endCol!==-1 && startCol!=-1 && startRow!=-1){
        setError({present : false, message : ""});
      }else{
        throw Error("Please select starting point and ending point in the below grid")
      }
    }
    catch(err){
      console.log(err.message);
      setError({present:true,message:err.message});
      setClas(true);
      return;

    }
    setText(2);
    const copiedState = [...arr];  //shallow copy of nested objects still passes the references of inside objects
    const grid = copiedState.map(row => [...row.map(obj => ({ ...obj }))]);  //so we need to again map over all objects and use spread operator
    const startNode = (startRow && startCol && grid[startRow][startCol]) || grid[0][0];
    const endNode = (endRow && endCol && grid[endRow][endCol]) || grid[10][10];
    console.log("hi")
    const justVisitedNodes=[]
    startNode.isWall=false;
    endNode.isWall=false;
    const visitedNodesInOrder=bfs(grid,startNode,endNode,justVisitedNodes);
    console.log(visitedNodesInOrder);
    const shortestPath=getShortestPathBFS(endNode);
    setSpl(shortestPath.length)
    animateAlgo(visitedNodesInOrder,justVisitedNodes,shortestPath);
  }

  // a function to visualize the dfs
  function visualizeDFS(){
    try{
      if(startCol!==-1 && endCol!==-1 && startCol!=-1 && startRow!=-1){
        setError({present : false, message : ""});
      }else{
        throw Error("Please select starting point and ending point in the below grid")
      }
    }
    catch(err){
      console.log(err.message);
      setError({present:true,message:err.message});
      setClas(true);
      return;

    }
    setText(3);
    const copiedState = [...arr];  //shallow copy of nested objects still passes the references of inside objects
    const grid = copiedState.map(row => [...row.map(obj => ({ ...obj }))]);  //so we need to again map over all objects and use spread operator
    const startNode = (startRow && startCol && grid[startRow][startCol]) || grid[0][0];
    const endNode = (endRow && endCol && grid[endRow][endCol]) || grid[10][10];
    console.log("hi")
    const justVisitedNodes=[]
    startNode.isWall=false;
    endNode.isWall=false;
    const visitedNodesInOrder=solveDFS(grid,startNode,endNode,justVisitedNodes);
    console.log(visitedNodesInOrder);
    const shortestPath=getShortestPathDFS(endNode);
    setSpl(shortestPath.length)
    animateAlgo(visitedNodesInOrder,justVisitedNodes,shortestPath);
  }

  // a function to visualize the a*
  function visualizeAStar(){
    try{
      if(startCol!==-1 && endCol!==-1 && startCol!=-1 && startRow!=-1){
        setError({present : false, message : ""});
      }else{
        throw Error("Please select starting point and ending point in the below grid")
      }
    }
    catch(err){
      console.log(err.message);
      setError({present:true,message:err.message});
      setClas(true);
      return;

    }
    setText(4);
    const grid=structuredClone(arr);
    const startNode = (startRow && startCol && grid[startRow][startCol]) || grid[0][0];
    const endNode = (endRow && endCol && grid[endRow][endCol]) || grid[10][10];
    const justVisitedNodes=[];
    startNode.isWall=false;
    endNode.isWall=false;
    const visitedNodesInOrder=aStar(grid,startNode,endNode,justVisitedNodes);
    const shortestPath=getPath(endNode);
    setSpl(shortestPath.length)
    animateAlgo(visitedNodesInOrder,justVisitedNodes,shortestPath);

  }

  // these below three functions are for dragging functionality of custom walls
  function handleMouseDown(row, col) {
    if(!start || !finish){
      return
    }
    const newGrid = getNewGridWithWallToggled(arr, row, col);
    setArr(newGrid)
    setMouse({mouseIsPressed: true})
  }

  function handleMouseEnter(row, col) {
    if(!start || !finish){
      return
    }
    if (!mouse.mouseIsPressed){
      return;
    } 
    const newGrid = getNewGridWithWallToggled(arr, row, col);
    setArr(newGrid);
  }

  function handleMouseUp() {
    if(!start || !finish){
      return
    }
    setMouse({mouseIsPressed: false});
  }

  useEffect(()=>{
    if(start && finish){
    setError({present : false, message : ""});
    }
  },[start,finish])
  
  return (
    <>
      <div className={`heading-container ${dark ? "dark-theme" : ""}`}>
        <MainHeading toggle={setSToggle} dark={dark}/>
        <Buttons dark={dark} setDark={setDark} one={reset} two={visualizeDijkstra} three={visualizeBFS} four={visualizeDFS} five={visualizeAStar} six={visualizeMaze} speedVal={speed} speedfunc={setSpeed} />
      </div>
      <div className={`grid-sidebar-container ${dark ? "dark-theme" : ""} `}>
        {sToggle && <Sidebar dark={dark} />}
        <div className={`grid-buttons-container ${dark ? "dark-theme" : ""} `}>
          <div className={`description ${dark ? "dark-theme" : ""} `}>
            {displayText[text]}
          </div>
          <div className={`error ${dark ? "dark-theme" : ""} `}>
            {error.present ? error.message : null}
          </div>
          {show && <p className={`resulttext ${dark ? "dark-theme" : ""}`}>The length of the Path is <span className="result">{spl}</span> units</p>}
            <Grid clas={clas} dark={dark} grid={arr} one={handleMouseDown} two={handleMouseEnter} three={handleMouseUp} mouse={mouse} handle={handleClick} />
        </div>
      </div>
    </>
  )
}

// to toggle the nodes
const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};


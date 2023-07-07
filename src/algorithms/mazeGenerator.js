export default function randomMaze(grid) {
	for(let i=0; i<grid.length; i++) {
		for(let j=0; j<grid[0].length; j++) {
			let random = Math.random();
			let currentNode = grid[i][j];
			let randomTwo =  0.30 ;
			if (random < randomTwo && !currentNode.isStart && !currentNode.isFinish) {
					currentNode.isWall = true;
			}
		}
	}
}


//  function maze (grid,startNode){
//     startNode.isWall=false;
//     const frontier=getNeighbor(grid,startNode);
//     while(frontier.length>0){
//         const randomIndex = Math.floor(Math.random() * frontier.length);
//         const currentCell = frontier[randomIndex];
//         const { row, col } = currentCell;
//         const neighbors = getNeighbor(grid, currentCell);
//         if (neighbors.length > 0) {
//             // Choose a random neighbor
//             const randomNeighborIndex = Math.floor(Math.random() * neighbors.length);
//             const randomNeighbor = neighbors[randomNeighborIndex];
//             const { row: neighborRow, col: neighborCol } = randomNeighbor;
      
//             // Remove the wall between the current cell and the chosen neighbor
//             const wallRow = row + (neighborRow - row) / 2;
//             const wallCol = col + (neighborCol - col) / 2;
//             grid[wallRow][wallCol].isWall = false;
      
//             // Mark the chosen neighbor as part of the maze
//             randomNeighbor.isWall = false;
      
//             // Add the neighbors of the chosen neighbor to the frontier
//             const nextFrontier = getNeighbor(grid, randomNeighbor);
//             frontier.push(...nextFrontier);
//         }
//         frontier.splice(randomIndex, 1);
//     }
//     console.log("end");
//     return grid;
// }

function updateWall(grid,node,prevCurrent){
    if(!prevCurrent){
        return;
    }
    const {row,col}=node;
    const row1=prevCurrent.row;
    const col1=prevCurrent.col;
    if(row===row1){
        if(col>col1){
            grid[row][col-1].isWall=false;
        }else{
            grid[row][col+1].isWall=false;
        }
    }else{
        if(row>row1){
            grid[row-1][col].isWall=false;
        }else{
            grid[row+1][col].isWall=false;
        }
    }
    
}

function getNeighbor(grid,node){
    const neighbors=[];
    const {row,col}=node;
    if(row-2>=0){
        neighbors.push(grid[row-2][col]);
    }
    if(col+2<grid[0].length ){
        neighbors.push(grid[row][col+2]);
    }
    if(row+2<grid.length ){
        neighbors.push(grid[row+2][col]);
    }
    if(col-2>=0 ){
        neighbors.push(grid[row][col-2]);
    }
    // if(neighbors.length>0){
    //     const r = Math.floor(Math.random()*(neighbors.length));
    //     return neighbors[r];
    // }
    return neighbors.filter(val=> val.isWall);
}
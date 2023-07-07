// row,
//           col,
//           isStart: row === startRow && col === startCol,
//           isFinish: row === endRow && col === endCol,
//           distance: Infinity,
//           isVisited: false,
//           isWall: false,
//           previousNode: null,
//           isHere:false,

export function bfs(grid1,startNode,endNode,justVisitedNodes){
    const grid=[...grid1]
    if(!startNode || !endNode || startNode===endNode){
        return false;
    }
    startNode.distance=0;
    const queueArr = [startNode];
    const visitedNodesOrder = []
    while(queueArr.length>0){
        const node=queueArr.shift();
        if(node.isVisited || node.isWall){
            continue;
        }
        visitedNodesOrder.push(node);
        node.isVisited=true;
        if(node.row===endNode.row && node.col===endNode.col){
            return visitedNodesOrder;
        }
        const arr=adjacentNeighbors(grid,node);
        queueArr.push(...arr);
        updateUnVisitedNodes(grid,node,justVisitedNodes);
        console.log(queueArr);
    }

}

function updateUnVisitedNodes(grid,node,justVisitedNodes){
    const neighbors=adjacentNeighbors(grid,node);
    justVisitedNodes.push(neighbors);
    for(const val of neighbors){
        val.distance=node.distance+1;
        val.previousNode=node;
    }
}

function adjacentNeighbors(grid,node){
    const neighbors=[];
    const {row,col}=node;

    if(row>0){
        neighbors.push(grid[row-1][col])
    }
    if(row<grid.length-1){
        neighbors.push(grid[row+1][col])
    }
    if(col>0){
        neighbors.push(grid[row][col-1])
    }
    if(col<grid[0].length-1){
        neighbors.push(grid[row][col+1])
    }
    return neighbors.filter(node => !node.isVisited)
}

export function getShortestPathBFS(endNode){
    const path=[];
    let currentNode=endNode;
    while(currentNode!==null){
        path.unshift(currentNode);
        currentNode=currentNode.previousNode;
    }
    return path;
}
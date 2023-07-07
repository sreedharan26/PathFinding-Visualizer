export function dijkstras(grid1,startNode,endNode,justVisitedNodes){
    const grid=[...grid1]
    if(!startNode || !endNode || startNode===endNode){
        return false
    }
    startNode.distance=0;
    const visitedNodesOrder = []
    const unVisitedNodes = getAllNodes(grid);
    while(unVisitedNodes.length>0){
        sortNodes(unVisitedNodes);
        const nearestNode=unVisitedNodes.shift();
        if(nearestNode.isWall) continue;

        if(nearestNode.distance===Infinity) return visitedNodesOrder;
        
        nearestNode.isVisited= true;
        visitedNodesOrder.push(nearestNode)
        if(nearestNode===endNode){
            return visitedNodesOrder;
        }
        updateUnVisitedNodes(nearestNode,grid,justVisitedNodes)
    }
}

function updateUnVisitedNodes(nearestNode,grid,justVisitedNodes){
    const neighbors=nearestNeighbors(nearestNode,grid);
    justVisitedNodes.push(neighbors);
    for(const val of neighbors){
        val.distance=nearestNode.distance+1;
        val.previousNode=nearestNode;
    }
}

function nearestNeighbors(nearestNode,grid){
    const neighbors=[];
    const {row,col}=nearestNode;

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

function sortNodes(unVisitedNodes){
    unVisitedNodes.sort((a,b)=> a.distance-b.distance )
}

function getAllNodes(grid){
    let nodes=[];
    for(const row of grid){
        for(const item of row){
            nodes.push(item)
        }
    }
    return nodes;
}

export function getShortestPath(endNode){
    const path=[];
    let currentNode=endNode;
    while(currentNode!==null){
        path.unshift(currentNode);
        currentNode=currentNode.previousNode;
    }
    return path;
}
export function aStar(grid,startNode,endNode,justVisitedNodes){
    if(!startNode || !endNode || startNode===endNode){
        return false;
    }

    const openList=[];
    // const closedList=[];
    startNode.f=0;
    startNode.g=0;
    openList.push(startNode);
    const visitedNodesInOrder=[];
    while(openList.length>0){
        sortOnFValue(openList);
        const leastFNode=openList.shift();

        if(leastFNode.isWall || leastFNode.isVisited){
            continue;
        }
        // if(leastFNode.distance===Infinity){
        //     return visitedNodesInOrder;
        // }
        if(leastFNode===endNode){
            return visitedNodesInOrder;
        }
        
        leastFNode.isVisited=true;
        visitedNodesInOrder.push(leastFNode);
        // closedList.push(leastFNode);
        const neighbors=generateNeighbors(leastFNode,grid);
        justVisitedNodes.push(neighbors);
        for(let i=0;i<neighbors.length;i++){
            if(neighbors[i].isVisited){
                continue;
            }
            const distance = leastFNode.g + succDistance(neighbors[i],leastFNode);
            neighbors[i].h=hDistance(endNode,neighbors[i]);
            if(distance < neighbors[i].g){
                neighbors[i].previousNode=leastFNode;
                neighbors[i].g=distance;
                neighbors[i].f=distance+neighbors[i].h;
                if(!openList.includes(neighbors[i])){
                    openList.push(neighbors[i]);
                }
            }
        }
    }
    return visitedNodesInOrder;
}

function hDistance(a,b){
    let x1=a.row;
    let y1=a.col;
    let x2=b.row;
    let y2=b.col;
    const x=(Math.abs((x2-x1))**2);
    const y=(Math.abs((y2-y1))**2);
    return (Math.sqrt(x+y));
}

function succDistance(a,b){
    let x1=a.row;
    let y1=a.col;
    let x2=b.row;
    let y2=b.col;
    if(x1===x2 || y1===y2){
        return 1;
    }
    
    return Math.sqrt(2);
    
}

function generateNeighbors(node,grid){
    const neighbors=[];
    const {row,col}=node;
    
    const rows=grid.length;
    const cols=grid[0].length;
    if(row+1<rows){
        neighbors.push(grid[row+1][col]);
    }
    if(row>0){
        neighbors.push(grid[row-1][col]);
    }
    if(col+1<cols){
        neighbors.push(grid[row][col+1]);
    }
    if(col>0){
        neighbors.push(grid[row][col-1]);
    }
    if(row+1<rows && col+1<cols){
        neighbors.push(grid[row+1][col+1]);
    }
    if(row>0 && col+1<cols){
        neighbors.push(grid[row-1][col+1]);
    }
    if(row+1<rows && col>0){
        neighbors.push(grid[row+1][col-1]);
    }
    if(row>0 && col>0){
        neighbors.push(grid[row-1][col-1]);
    }
    return neighbors;
}

function sortOnFValue(openList){
    openList.sort((a,b)=>{
        if(a.f===b.f){
            return a.g<b.g ? -1 : 1;
        }
        return a.f < b.f ? -1 : 1;
    } );
}

export function getPath(endNode){
    const path=[];
    let currentNode=endNode;
    while(currentNode!==null){
        path.unshift(currentNode);
        currentNode=currentNode.previousNode;
    }
    return path;
}
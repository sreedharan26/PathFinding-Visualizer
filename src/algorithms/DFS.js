let isfound=false;
export function solveDFS(grid1,startNode,endNode,justVisitedNodes){
    const grid=[...grid1]
    if(!startNode || !endNode || startNode===endNode){
        return false;
    }
    const visitedNodesInOrder=[];
    startNode.distance=0;
    const stackArr = [startNode];
    const visitedNodesOrder = []
    while(stackArr.length>0){
        const node=stackArr.pop();
        if(node.isVisited || node.isWall){
            continue;
        }
        node.isVisited=true;
        if(node.isFinish){
            return visitedNodesOrder;
        }
        visitedNodesOrder.push(node);
        const arr=adjacentNeighbors(grid,node);
        justVisitedNodes.push(arr);
        for(let i=0;i<arr.length;i++){
            let obj=arr[i];
            obj.previousNode=node;
            stackArr.push(obj)
        }
    }
    // return visitedNodesInOrder
}
// function dfs(grid,node,endNode,visitedNodesInOrder,isfound){
//     if(node.isVisited || isfound){
//         return;
//     }
//     node.isVisited=true;
//     visitedNodesInOrder.push(node);
//     if(node.row===endNode.row && node.col===endNode.col){
//         isfound=true;
//         return visitedNodesInOrder;
//     }
//     const arr=adjacentNeighbors(grid,node);
//     // arr.every((obj)=>{
//     //     if(isfound){
//     //         return false;
//     //     }
//     //     obj.previousNode=node;
//     //     obj.distance=node.distance+1;
//     //     dfs(grid,obj,endNode,visitedNodesInOrder,isfound);
//     //     return true;
//     // })

//     for(let i=0;i<arr.length;i++){
//         if(isfound || arr[i].isVisited){
//             return;
//         }
//         if(arr[i].row===endNode.row && arr[i].col===endNode.col){
//             isfound=true;
//             arr[i].previousNode=node;
//             arr[i].distance=node.distance+1;
//             return visitedNodesInOrder;
//         }
//         arr[i].previousNode=node;
//         arr[i].distance=node.distance+1;
//         dfs(grid,arr[i],endNode,visitedNodesInOrder,isfound)


//     }

// }


function updateUnVisitedNodes(grid,node){
    const neighbors=adjacentNeighbors(grid,node);
    for(const val of neighbors){
        val.distance=node.distance+1;
        val.previousNode=node;
    }
}

function adjacentNeighbors(grid,node){
    const neighbors=[];
    const {row,col}=node;

    if(col>0){
        neighbors.push(grid[row][col-1])
    }
    if(row<grid.length-1){
        neighbors.push(grid[row+1][col])
    }
    if(col<grid[0].length-1){
        neighbors.push(grid[row][col+1])
    }
    if(row>0){
        neighbors.push(grid[row-1][col])
    }
    return neighbors.filter(node => !node.isVisited)
}

export function getShortestPathDFS(endNode){
    const path=[];
    let currentNode=endNode;
    while(currentNode!==null){
        path.unshift(currentNode);
        currentNode=currentNode.previousNode;
    }
    return path;
}
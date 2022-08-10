function calculateRoverPath(map) {
    const startNode = '0.0'
    const endNode = `${map.length - 1}.${map[0].length - 1}`
    const edges = createEdges(map)
    const results = dijkstraAlgorithm(edges, startNode, endNode);
    saveFileData(results)
}

function dijkstraAlgorithm(edges, startNode, endNode) {
    const shortestDistanceNode = (distances, visited) => {
        let shortest = null;

        for (let node in distances) {
            let currentIsShortest =
                shortest === null || distances[node] < distances[shortest];
            if (currentIsShortest && !visited.includes(node)) {
                shortest = node;
            }
        }
        return shortest;
    };
    let distances = {};
    distances[endNode] = "Infinity";
    distances = Object.assign(distances, edges[startNode]);
    let parents = {endNode: null};

    for (let child in edges[startNode]) {
        parents[child] = startNode;
    }
    let visited = [];

    let node = shortestDistanceNode(distances, visited);

    while (node) {
        let distance = distances[node];
        let children = edges[node];
        for (let child in children) {
            if (String(child) === String(startNode)) {
                continue;
            } else {
                let newDistance = distance + children[child];
                if (!distances[child] || distances[child] > newDistance) {
                    distances[child] = newDistance;
                    parents[child] = node;
                }
            }
        }

        visited.push(node);

        node = shortestDistanceNode(distances, visited);
    }
    let shortestPath = [endNode];
    let parent = parents[endNode];
    while (parent) {
        shortestPath.push(parent);
        parent = parents[parent];
    }
    shortestPath.reverse();

    return {
        fuel: distances[endNode], steps: shortestPath.length - 1, path: shortestPath,
    };
}

let createEdges = (arr) => {
    const edges = []
    for (let y = 0; y < arr.length; y++) {
        for (let x = 0; x < arr[y].length; x++) {
            edges[y + '.' + x] = {}
            if (y - 1 !== -1) {
                edges[y + '.' + x][(y - 1) + '.' + x] = Math.abs(arr[y][x] - arr[y - 1][x]) + 1
            }
            if (x - 1 !== -1) {
                edges[y + '.' + x][y + '.' + (x - 1)] = Math.abs(arr[y][x] - arr[y][x - 1]) + 1
            }
            if (y + 1 !== arr.length) {
                edges[y + '.' + x][(y + 1) + '.' + x] = Math.abs(arr[y][x] - arr[y + 1][x]) + 1
            }
            if (x + 1 !== arr[y].length) {
                edges[y + '.' + x][y + '.' + (x + 1)] = Math.abs(arr[y][x] - arr[y][x + 1]) + 1
            }
        }
    }
    return edges
}

function saveFileData(data) {
    const result =
        `${data.path.map(p => "[" + p.replace('.', '][') + "]").join('->')}\n` +
        `steps: ${data.path.length - 1}\n` +
        `fuel: ${data.fuel}`
    const fs = require("fs")
    fs.writeFileSync("path-plan.txt", result, "ascii")
}

module.exports = {
    calculateRoverPath,
};

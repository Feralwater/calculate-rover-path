function calculateRoverPath(map) {
    try {
        validate(map);
        const startNode = '0.0';
        const endNode = `${map.length - 1}.${map[0].length - 1}`;
        const edges = createEdges(map);
        const results = dijkstraAlgorithm(edges, startNode, endNode);

        const data = prepareData(results);
        validateResult(results);
        saveFile(data);
    } catch (e) {
        saveFile(`Cannot start a movement because ${e.message}`);
    }
}

function dijkstraAlgorithm(edges, startNode, endNode) {
    const shortestDistanceNode = (distances, visited) => {
        let shortest = null;

        for (const node in distances) {
            const currentIsShortest = shortest === null || distances[node] < distances[shortest];
            if (currentIsShortest && !visited.includes(node)) {
                shortest = node;
            }
        }
        return shortest;
    };
    let distances = {};
    distances[endNode] = 'Infinity';
    distances = Object.assign(distances, edges[startNode]);
    const parents = {endNode: null};

    for (const child in edges[startNode]) {
        parents[child] = startNode;
    }
    const visited = [];

    let node = shortestDistanceNode(distances, visited);

    while (node) {
        const distance = distances[node];
        const children = edges[node];
        for (const child in children) {
            if (String(child) !== String(startNode)) {
                const newDistance = distance + children[child];
                if (!distances[child] || distances[child] > newDistance) {
                    distances[child] = newDistance;
                    parents[child] = node;
                }
            }
        }

        visited.push(node);

        node = shortestDistanceNode(distances, visited);
    }
    const shortestPath = [endNode];
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
    const edges = [];
    for (let y = 0; y < arr.length; y += 1) {
        for (let x = 0; x < arr[y].length; x += 1) {
            edges[`${y}.${x}`] = {};
            if (y - 1 !== -1) {
                edges[`${y}.${x}`][`${y - 1}.${x}`] = Math.abs(arr[y][x] - arr[y - 1][x]) + 1;
            }
            if (x - 1 !== -1) {
                edges[`${y}.${x}`][`${y}.${x - 1}`] = Math.abs(arr[y][x] - arr[y][x - 1]) + 1;
            }
            if (y + 1 !== arr.length) {
                edges[`${y}.${x}`][`${y + 1}.${x}`] = Math.abs(arr[y][x] - arr[y + 1][x]) + 1;
            }
            if (x + 1 !== arr[y].length) {
                edges[`${y}.${x}`][`${y}.${x + 1}`] = Math.abs(arr[y][x] - arr[y][x + 1]) + 1;
            }
            if (y - 1 !== -1 && x - 1 !== -1) {
                edges[`${y}.${x}`][`${y - 1}.${x - 1}`] = Math.abs(arr[y][x] - arr[y - 1][x - 1]) + 1.5;
            }
            if (x + 1 !== arr[y].length && y - 1 !== -1) {
                edges[`${y}.${x}`][`${y - 1}.${x + 1}`] = Math.abs(arr[y][x] - arr[y - 1][x + 1]) + 1.5;
            }
            if (y + 1 !== arr.length && x - 1 !== -1) {
                edges[`${y}.${x}`][`${y + 1}.${x - 1}`] = Math.abs(arr[y][x] - arr[y + 1][x - 1]) + 1.5;
            }
            if (x + 1 !== arr[y].length && y + 1 !== arr.length) {
                edges[`${y}.${x}`][`${y + 1}.${x + 1}`] = Math.abs(arr[y][x] - arr[y + 1][x + 1]) + 1.5;
            }
        }
    }
    return edges;
};

function saveFile(result) {
    const fs = require('fs');
    fs.writeFileSync('path-plan.txt', result, 'ascii');
}

function prepareData(data) {
    return `${data.path.map((p) => `[${p.replace('.', '][')}]`).join('->')}\n`
        + `steps: ${data.path.length - 1}\n`
        + `fuel: ${Math.floor(data.fuel)}`;
}

class CannotStartMovement extends Error {
}

const validateResult = (data) => {
    if (data.fuel === 'Infinity') {
        throw new CannotStartMovement('can`t reach end point');
    }
};
const validate = (array) => {
    try {
        if (Number.isInteger(+array[0][0]) === false) {
            throw new CannotStartMovement('start point is incorrect');
        }
        if (!array.every((val) => val.every((value) => value === 'X' || Number.isInteger(+value) === true))) {
            throw new CannotStartMovement('');
        }
    } catch (e) {
        if (e instanceof CannotStartMovement) {
            throw new CannotStartMovement(e.message);
        }
        throw new CannotStartMovement('incoming data is incorrect ');
    }
};
module.exports = {
    calculateRoverPath,
};

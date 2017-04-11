export const width = 19;
export const height = 19;

const getNeighbors = (x, y) => {
    let neighbors = [];
    if (x > 1) {
        neighbors.push(`${x - 1}-${y}`)
    }
    if (x < width) {
        neighbors.push(`${x + 1}-${y}`)
    }
    if (y > 1) {
        neighbors.push(`${x}-${y - 1}`)
    }
    if (y < height) {
        neighbors.push(`${x}-${y + 1}`)
    }
    return neighbors
}

const Spot = class {
    constructor(obj, x, y) {
        this.neighbors = getNeighbors(x, y);
        this.x = x;
        this.y = y;
        this.checked = false;
        this.color = 'empty';
    }
    adjacent(obj) {
        return this.neighbors.map(coord => {
            return obj[coord]
        })
    }
}

const Board = class {
    constructor() {
        for (let y = 1; y <= height; y++) {
            for (let x = 1; x <= width; x++) {
                this[`${x}-${y}`] = new Spot(this, x, y)
            }
        }
    }
    showByRow() {
        let rows = [];
        const keys = Object.keys(this);
        for (let i = 0; i < keys.length; i += width) {
            rows.push(keys.slice(i, i + width))
        }
        return rows
    }
}

const initialBoard = new Board()

const adjacent = (obj, tile) => {
    return obj[tile].neighbors.map(coord => {
        return obj[coord]
    })
}
const showByRow = (obj) => {
    let rows = [];
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i += width) {
        rows.push(keys.slice(i, i + width))
    }
    return rows
}

const turn = 'black'

export default {
    board: initialBoard,
    adjacent,
    showByRow,
    turn,
    playerColor: null
}
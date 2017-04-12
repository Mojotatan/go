const getNeighbors = (x, y, size) => {
    let neighbors = [];
    if (x > 1) {
        neighbors.push(`${x - 1}-${y}`)
    }
    if (x < size) {
        neighbors.push(`${x + 1}-${y}`)
    }
    if (y > 1) {
        neighbors.push(`${x}-${y - 1}`)
    }
    if (y < size) {
        neighbors.push(`${x}-${y + 1}`)
    }
    return neighbors
}

const Spot = class {
    constructor(obj, x, y, size) {
        this.neighbors = getNeighbors(x, y, size);
        this.x = x;
        this.y = y;
        this.checked = false;
        this.color = 'empty';
    }
    // adjacent(obj) {
    //     return this.neighbors.map(coord => {
    //         return obj[coord]
    //     })
    // }
}

const Board = class {
    constructor(size) {
        for (let y = 1; y <= size; y++) {
            for (let x = 1; x <= size; x++) {
                this[`${x}-${y}`] = new Spot(this, x, y, size)
            }
        }
    }
    // showByRow() {
    //     let rows = [];
    //     const keys = Object.keys(this);
    //     for (let i = 0; i < keys.length; i += width) {
    //         rows.push(keys.slice(i, i + width))
    //     }
    //     return rows
    // }
}

const adjacent = (obj, tile) => {
    return obj[tile].neighbors.map(coord => {
        return obj[coord]
    })
}
const showByRowCreator = (size) => { return (
    (obj) => {
        let rows = [];
        const keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i += size) {
            rows.push(keys.slice(i, i + size))
        }
        return rows
    }
)}

export default (size, turn, prevMove) => {
    return {
        board: new Board(size),
        adjacent,
        showByRow: showByRowCreator(size),
        turn,
        playerColor: null,
        prevMove,
        players: 0,
        size
    }
}
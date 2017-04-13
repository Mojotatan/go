const control = (a, b) => {
    if (a === 'neutral' || b === 'neutral') {
        return 'neutral'
    } else if (a === 'empty' || !a) {
        return b
    } else if (b === 'empty' || !b) {
        return a
    } else if (a !== b) {
        return 'neutral'
    } else {
        return b
    }
}


//     if (!a) {
//         return b
//     } else if (!b || b === 'empty') {
//         return a
//     } else if (a !== b) {
//         return 'neutral'
//     } else {
//         return b
//     }
// }

export default (board, size) => {
    const check = (spot, controller, val) => {
        let newVal = val + 1
        spot.checked = true
        spot.neighbors.forEach(neighbor => {
            if (board[neighbor].color === 'empty' && !board[neighbor].checked) {
                const blar = check(board[neighbor], controller, newVal)
                newVal = blar[1]
                controller = control(controller, blar[0])
            } else {
                controller = control(controller, board[neighbor].color)
            }
        })
        return [controller, newVal]
    }
    let black = 0;
    let white = 0;
    for (let y = 1; y <= size; y++) {
        for (let x = 1; x <= size; x++) {
            let spot = board[`${x}-${y}`]
            if (spot.color === 'black') {
                black++
            } else if (spot.color === 'white') {
                white++
            } else if (!spot.checked) {
                const blar = check(spot, null, 0)
                if (blar[0] === 'black') {
                    black += blar[1]
                } else if (blar[0] === 'white') {
                    white += blar[1]
                }
            }
        }
    }
    let winner = (black > white) ? 'Black' : 'White';
    return `Black ${black}, White ${white}. ${winner} wins!`
}
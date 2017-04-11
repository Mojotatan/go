import React from 'react';
import {connect} from 'react-redux';
import {setTile, checkTile, killTile, decheck} from '../redux/actions/board';

class Board extends React.Component {
    constructor() {
        super()
    }

    render() {
        // console.log('props', this.props)
        let r = 0;
        const {adjacent, board, showByRow, turn} = this.props.board;
        // console.log('board', board)
        const handleClick = (e) => {
            this.props.play(e, turn)
            this.props.lifeOrDeath(board)
        }
        return (
            <div>
                <h3>{turn}'s turn</h3>
                {showByRow(board).map(row => {
                    r++;
                    return (
                    <div key={r} className="tile-row">
                        {row.map(spot => {
                            return <button onClick={handleClick} key={spot} id={spot} className={`tile ${board[spot].color}`}>+</button>
                        })}
                    </div>)
                })}
            </div>
        )
    }
}

const handlePlay = (e) => {
    const spot = e.target.id
    // console.log('clicked', spot)
    return spot
}


const mapStateToProps = (state) => {
    // console.log('state', state)
    return {
        board: state.board
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        play: (e, color) => dispatch(setTile(handlePlay(e), color)),
        lifeOrDeath: (board) => {

            // check utility function
            const check = (spot) => {
                dispatch(checkTile(spot, true))
                let alive = false;
                board[spot].neighbors.forEach(neighbor => {
                    if (board[neighbor].color === board[spot].color) {
                        if (!board[neighbor].checked) {
                            alive = check(neighbor) || alive
                        }
                    } else if (board[neighbor].color === 'empty') {
                        alive = true
                    }
                })
                return alive
            }

            // kill utility function
            const kill = (spot) => {
                const color = board[spot].color
                dispatch(killTile(spot))
                board[spot].neighbors.forEach(neighbor => {
                    if (board[neighbor].color === color) {
                        kill(neighbor)
                    }
                })
            }

            Object.keys(board).forEach(spot => {
                if (!board[spot].checked && board[spot].color !== 'empty') {
                    if (!check(spot)) {
                        kill(spot)
                    }
                }
            })

            dispatch(decheck())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {loadOptions, setOptions, chooseGame, newGame} from '../redux/actions/lobby';
import {initializeBoard, setStatus} from '../redux/actions/board';
import socket from '../socket';
import Chat from './Chat';

class Lobby extends React.Component {
    constructor () {
        super()

        this.handleChange = this.handleChange.bind(this)
        this.handleOption = this.handleOption.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleJoin = this.handleJoin.bind(this)
    }

    handleChange(e) {
        const game = e.target.value
        this.props.choose(game)
        this.props.load(game)
    }

    handleOption(e, option) {
        const value = e.target.value
        this.props.change(option, value)
    }

    handleClick(e) {
        browserHistory.push('/go');
        // needs some refactoring to support multiple games 
        // this.props[this.props.lobby.game](...Object.keys(this.props.lobby.selectedOptions).map(option => this.props.lobby.selectedOptions[option]), 'START')
        this.props.goStart(this.props.lobby.selectedOptions[0].boardSize, 'black', 'START')
        this.props.goJoinAs(this.props.lobby.selectedOptions[1].color)
        this.props.host(this.props.lobby.game, this.props.lobby.user)
        socket.emit('newGame', {game: this.props.lobby.game, host: this.props.lobby.user})
    }

    handleJoin(host) {
        socket.emit('joinGame', host)
    }

    render () {
        // console.log('props', this.props)
        const {games, user, gameOptions, selectedOptions, game} = this.props.lobby
        return (
            <div>
                <h1>LOBBY</h1>
                <h3>Welcome, {user}</h3>
                <Chat user={user}/>
                <br />
                <div>
                    <h3>Host a game</h3>
                    <select onChange={this.handleChange}>
                        <option value="default">Choose a game</option>
                        <option value="go">Go</option>
                    </select>
                    {Object.keys(gameOptions[game]).map(option => {
                        return (
                            <select onChange={(e) => {this.handleOption(e, option)}} key={option}>
                                <option value="default">{option}</option>
                            {gameOptions[game][option].options.map(choice => {
                                return (
                                    <option value={choice} key={choice}>{choice}</option>
                                )
                            })}
                            </select>
                        )
                    })}
                    <button disabled={game === 'default'} onClick={this.handleClick}>Start game</button>
                </div>
                <br />
                <div>
                    <h2>Games</h2>
                    {games.map(game => {
                        return (
                            <div key={game.host} className="game">
                                <strong>{game.game.toUpperCase() } </strong> 
                                <button onClick={() => {this.handleJoin(game.host)}}>JOIN</button>
                                {` hosted by ${game.host}`}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        lobby: state.lobby
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        load: (game) => dispatch(loadOptions(game)),
        change: (option, value) => dispatch(setOptions(option, value)),
        choose: (game) => dispatch(chooseGame(game)),
        goStart: (size, turn, prevMove) => dispatch(initializeBoard(size, turn, prevMove)),
        goJoinAs: (role) => dispatch(setStatus(role)),
        host: (game, host) => {
            console.log(`${host} is hosting a game of ${game}`)
            dispatch(newGame(game, host))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lobby)
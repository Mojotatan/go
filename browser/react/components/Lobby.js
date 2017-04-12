import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {loadOptions} from '../redux/actions/lobby';
import socket from '../socket';
import Chat from './Chat'

class Lobby extends React.Component {
    constructor () {
        super()
        this.state = {selGame: 'default', options: {}}

        this.handleChange = this.handleChange.bind(this)
        this.handleOption = this.handleOption.bind(this)
    }

    handleChange(e) {
        const game = e.target.value
        this.setState({selGame: game})
        this.props.load(game)
        this.setState({options: this.props.lobby.selectedOptions})
    }

    handleOption(e) {
        return e.target.value
    }

    render () {
        // console.log('props', this.props)
        const {games, user, gameOptions, selectedOptions} = this.props.lobby
        return (
            <div>
                <h1>LOBBY</h1>
                <h3>Welcome, {user}</h3>
                <Chat user={user}/>
                <div>
                    <select onChange={this.handleChange}>
                        <option value="default">Choose a game</option>
                        <option value="go">Go</option>
                    </select>
                    {Object.keys(gameOptions[this.state.selGame]).map(option => {
                        return (
                            <select onChange={this.handleOption} key={option}>
                                <option value="default">{option}</option>
                            {gameOptions[this.state.selGame][option].options.map(choice => {
                                return (
                                    <option value={choice} key={choice}>{choice}</option>
                                )
                            })}
                            </select>
                        )
                    })}
                    <button disabled={this.state.selGame !== 'default'} onSubmit={this.handleSubmit}>
                        <Link to={`/${this.state.selGame}`}>Start game</Link>
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('state', state)
    return {
        lobby: state.lobby
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        load: (game) => dispatch(loadOptions(game))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lobby)
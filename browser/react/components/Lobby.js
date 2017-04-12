import React from 'react';
import {connect} from 'react-redux';
import {setName} from '../redux/actions/lobby'
import socket from '../socket';

class Lobby extends React.Component {
    constructor () {
        super()
        this.state = {inputName: '', activeUsers: []}

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({inputName: e.target.value})
    }

    handleSubmit() {
        this.setState({inputName: ''})
    }

    render () {
        // console.log('props', this.props)
        const {games, users, userIndex} = this.props.lobby
        const rename = (e) => {
            let newName = this.state.inputName || "No-name McLamerson";
            socket.emit('userEdit', {name: newName, index: userIndex})
            this.props.editName(newName)
            this.handleSubmit()
        }
        return (
            <div>
                <h1>LOBBY</h1>
                <h3>Welcome, {users[userIndex].name}</h3>
                <div>
                    <span>Enter a name </span> 
                    <input onChange={this.handleChange} value={this.state.inputName}></input>
                    <button onClick={rename}>is my name!</button>
                </div>
                <div className="sidebar" >
                    ACTIVE USERS
                    <ul>
                        {users.map(user => {
                            return <li key={user.id}>{user.name}</li>
                        })}
                    </ul>
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
        editName: (name) => {
            dispatch(setName(name))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lobby)
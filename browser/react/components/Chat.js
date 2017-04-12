import React from 'react';
import socket from '../socket';

export default class Chat extends React.Component {
    constructor() {
        super()
        this.state = {inputText: ''}

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({inputText: e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault()
        console.log(`${this.props.user}: ${this.state.inputText}`)
        socket.emit('message', {user: this.props.user, text: this.state.inputText})
        this.setState({inputText: ''})
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <span>Say something </span> 
                <input onChange={this.handleChange} value={this.state.inputText}></input>
                <button>Talk!</button>
            </form>
        )
    }
}
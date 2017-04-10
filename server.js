// import express from 'express';
// import morgan from 'morgan';
// import bodyParser from 'body-parser';
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const path = require('path')
// might need to install babel to use import/export--I suppose it doesn't matter for now

const app = express();

// middleware
app.use(morgan('tiny'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('browser'))

// if routes are later needed for fleshing out
// const router = require('./routes')
// app.use('/', router)

app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'browser', 'index.html'))
})

app.listen(3000, () => {console.log('Ready to go on port 3000')})

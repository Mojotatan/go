const express = require('express');
const path = require('path');

const router = new express.Router();

router.route('/')
    .get(function(req, res) {
        res.sendFile(path.join(__dirname, '../browser/index.html'))
    })

module.exports = router;

// ***** CURRENTLY THIS ROUTER IS UNUSED ***** //
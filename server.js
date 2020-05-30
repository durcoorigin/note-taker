// npm packages
const express = require('express');
const fs = require('fs');
const path = require('path');

// local API package
const { notes } = require('./Develop/db/db');

// Server Instructions
const PORT = process.env.PORT || 3001;
const app = express();


// connect to HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
})

// Choose server port connection
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
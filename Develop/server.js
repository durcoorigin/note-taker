// npm packages
const express = require('express');
const fs = require('fs');
const path = require('path');

// local API package
const { notes } = require('./db/db');

// Server Instructions
const PORT = process.env.PORT || 3001;
const app = express();
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

// Access public directory
app.use(express.static('public'));

// Retrieve information from the API
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

function findById(id, notesArray) {
    const result = notesArray.filter(notes => notes.id === id)[0];
    return result
}

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
}

// Add information to the API
app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();

    const note =createNewNote(req.body, notes);

    res.json(req.body);
})

// connect to HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

// Choose server port connection
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
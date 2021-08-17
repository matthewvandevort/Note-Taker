const router = require('express').Router();
const { notes } = require('../../db/db');
const { createNewNote, deleteNote } = require('../../lib/noteFunction');


router.get('/notes', (req, res) => {
    let savedNote = notes;
    res.json(savedNote);
});

router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();
    let postNote = createNewNote(req.body, notes);
    res.json(postNote);
});

router.delete('/notes/:id', (req, res) => {
    deleteNote(notes, req.params.id);
    res.json(notes);
});


module.exports = router;


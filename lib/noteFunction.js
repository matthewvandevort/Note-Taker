const fs = require('fs');
const path = require('path');


function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({
            notes: notesArray
        }, null, 2)
    )
    return note;
}

function deleteNote(notesArray, id) {
    let deleteId = parseInt(id);
    notesArray.splice(deleteId, 1);

    for (let i = deleteId; i < notesArray.length; i++) {
        notesArray[i].id = i.toString();      
    }

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({
            notes: notesArray
        }, null, 2)
    )
}

module.exports = {
    createNewNote,
    deleteNote
};
const fs = require("fs");
const path = require("path");

// Takes a new note and writes the data to the database.
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

// This takes the deleted note removes it by the id then writes the database again with the new idexes.
function deleteNote(notesArray, id) {
    let deleteID = parseInt(id);
    notesArray.splice(deleteID, 1);

    // This loop re-writes the indexes for the remaining notes.
    for (let i = deleteID; i < notesArray.length; i++) {
        notesArray[i].id = i.toString();
    }

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({
            notes: notesArray
        }, null, 2)
    )
}

// Calling the above two functions
module.exports = {
    createNewNote,
    deleteNote
};
let $noteTitle = $('.note-title');
let $noteText = $('note-textarea');
let $saveNoteBtn = $('.save-note');
let $newNoteBtn = $('new-note');
let $noteList = $('list-container .list-group');


// activeNote is used to keep track of the note in the textarea
let activeNote = {};

const getNotes = function() {
  return $.ajax({
    url: '/api/notes',
    method: 'GET'
  });
};

const saveNote = function(note) {
  return $.ajax({
    url: '/api/notes',
    data: note,
    method: 'POST'
  });
};

const deleteNote = function(id) {
  return $.ajax({
    url: '/api/notes' + id,
    method: 'DELETE'
  });
};

const renderActiveNote = function() {
  $saveNoteBtn.hide();

  if (activeNote.id) {
    $noteTitle.setAttribute('readonly', true);
    $noteText.setAttribute('readonly', true);
    $noteTitle.value = activeNote.title;
    $noteText.value = activeNote.text;
  } else {
    $noteTitle.removeAttribute('readonly');
    $noteText.removeAttribute('readonly');
    $noteTitle.value = '';
    $noteText.value = '';
  }
};

const handleNoteSave = function() {
  const newNote = {
    title: $noteTitle.val(),
    text: $noteText.val(),
  };

  saveNote(newNote).then(function(data) {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Delete the clicked note
const handleNoteDelete = function(event) {
  // Prevents the click listener for the list from being called when the button inside of it is clicked
  event.stopPropagation();

  let note = $(this)
    .parent('list-group-item')
    .data();

  if (activeNote.id === note.id) {
    activeNote = {};
  }

  deleteNote(noteId).then(function() {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the activeNote and displays it
const handleNoteView = function() {
  activeNote = {};  
  renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
const handleNewNoteView = function() {
  activeNote = {};
  renderActiveNote();
};

const handleRenderSaveBtn = () => {
  if (!$noteTitle.value.trim() || !$noteText.value.trim()) {
    $saveNoteBtn.hide();
  } else {
    $saveNoteBtn.show();
  }
};

// Render the list of note titles
const renderNoteList = function() {
  $noteList.empty();
  let noteListItems = [];

  for (let i = 0; i < notes.length; i++) {
    let note = notes[i];

    let $li = $("<li class='list-group-item'>").data.note;
    let $span = $("<span>").text(note.title);
    let $delBtn = $("<i class='fas fa-trash-alt float-right text-danger delete-note'>");
    
    $li.append($span, $delBtn),
    noteListItems.push($li);    
  }
  $noteList.append(noteListItems);
};

// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = function () {
  return getNotes().then(function(data) {
    renderNoteList(data);
  });
};

$saveNoteBtn.on('click', handleNoteSave);
$noteList.on('click', '.list-group-item', handleNoteView);
$newNoteBtn.on('click', handleNewNoteView);
$noteList.on('click', '.delete-note', handleNoteDelete);
$noteTitle.on('keyup', handleRenderSaveBtn);
$noteText.on('keyup', handleRenderSaveBtn);

getAndRenderNotes();

document.addEventListener('DOMContentLoaded', initialize, false);

var canvas;
var context;

var noteForm;
var solfegeForm;

var notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
var solfegeScale = [ 'Do', 'Re', 'Mi', 'Fa', 'So', 'La', 'Ti' ];
var semitones = [0, 2, 4, 5, 7, 9, 11];

var noteSelected = "C";
var solfegeSelected = "Do";

function noteSelectedFunc(e) {
  noteSelected = noteForm.options[noteForm.selectedIndex].value;
  note(noteSelected, solfegeSelected);
}

function solfegeSelectedFunc(e) {
  solfegeSelected = solfegeForm.options[solfegeForm.selectedIndex].value;
  note(noteSelected, solfegeSelected);
}

function initialize(e) {
  canvas = document.getElementById('majorScales');
  context = canvas.getContext('2d');
  noteForm = document.getElementById('selectedNoteForm');
  solfegeForm = document.getElementById('selectedSolfegeForm');
  noteForm.addEventListener("click", noteSelectedFunc);
  solfegeForm.addEventListener("click", solfegeSelectedFunc);
  note(noteSelected, solfegeSelected);
}

function note(noteName, solfege) {
  // Find the index of the passed in solfege, and convert to semitone position.
  var count = semitones[solfegeScale.indexOf(solfege)];
  var indexOfNote = notes.indexOf(noteName);
  // Calculate the new index, with array wrap around.
  var newIndex = count + indexOfNote > notes.length - 1 ? (count + indexOfNote) % notes.length : indexOfNote + count;
  // Select the correct note.
  var selectedNote = notes[newIndex];

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  context.font = '200px sans-serif';
  context.fillStyle = "#0095DD";
  context.fillText(selectedNote, canvas.width / 2 - context.measureText(selectedNote).width / 2, canvas.height / 2 + 200 / 4);
  context.closePath();
}

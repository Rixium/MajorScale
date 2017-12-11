// Challenge by Cosmologicon
//
// ** Background **
// For the purpose of this challenge, the 12 musical notes in the chromatic scale are named:
//
// C  C#  D  D#  E  F  F#  G  G#  A  A#  B
//
// The interval between each pair of notes is called a semitone, and the sequence wraps around.
// So for instance, E is 1 semitone above D#, C is 1 semitone above B, F# is 4 semitones above D, and C# is 10 semitones above D#.
// (This also means that every note is 12 semitones above itself.)
//
// A major scale comprises 7 out of the 12 notes in the chromatic scale.
// There are 12 different major scales, one for each note.
// For instance, the D major scale comprises these 7 notes:
//
// D  E  F#  G  A  B  C#
//
// The notes in a major scale are the notes that are 0, 2, 4, 5, 7, 9, and 11 semitones above
// the note that the scale is named after. In the movable do solfège system,
// these are referred to by the names Do, Re, Mi, Fa, So, La, and Ti, respectively.
// So for instance, Mi in the D major scale is F#, because F# is 4 semitones above D.
//
// (In general, a note can have more than one name. For instance A# is also known as Bb.
// Depending on the context, one or the other name is more appropriate.
// You'd never hear it referred to as the A# major scale in real music.
// Instead it would be called Bb major. Don't worry about that for this challenge.
// Just always use the names of the notes given above.)
//
// ** Challenge **
// Write a function that takes the name of a major scale and the solfège name of a note,
// and returns the corresponding note in that scale.

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

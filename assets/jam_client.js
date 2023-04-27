let synth;

const keyboardName = document.getElementById('keyboard-name');
const keyboard = document.getElementById('keyboard')
keyboard.addEventListener('click', playNote);
const jamButtons = document.getElementById('jam-buttons')
jamButtons.addEventListener('click', changeJam);

function changeJam(event) {
  //console.log(event.target.dataset.jam);
  // You should implement this first. This function gets called
  // whenever the user clicks one of the keyboard options inside
  // #jam-buttons. It should do a XMLHttpRequest to fetch the
  // correct JSON file from the server.
  // Once you get the JSON data and parse it inside this function
  // you should call createButtons function with it to actually
  // change the DOM in this page to have the correct buttons.
  event.preventDefault();
  let reques = new XMLHttpRequest();
  reques.addEventListener('load', ()=>{
    createButtons(JSON.parse(reques.responseText))});
  reques.open('GET', '/json/' + event.target.dataset.jam+ '.json' );
  reques.send();
}
function createButtons(noteObject) {
  // This function should first of all clear any keyboard buttons
  // that currently exists. Below there is a clearButtons function
  // already implemented that you can use.
  // Then you should loop over noteObject.notes (which will
  // contain an array of notes), create button elements with the
  // notes, add data-note attribute to that corresponds to the
  // note, add the note name as their innerText, and finally append
  // them to #keyboard element.
  // Finally, you should set #keyboard-name to match the
  // noteObject.name
  clearButtons();
  const arr = noteObject.notes
  for(i=0; i<arr.length; i++){
    let butns = document.createElement('button');
    butns.innerText = arr[i];
    butns.dataset.note = arr[i];
    keyboard.appendChild(butns);
  };
  keyboardName.innerText=noteObject.name
}

function clearButtons() {
  while (keyboard.firstChild) {
    keyboard.removeChild(keyboard.firstChild);
  }
}

function playNote(evt) {
  // Find out the note that was played from the data attribute
  let note = evt.target.dataset.note;
  // This will create a new synth or if it exists already do nothing
  synth = synth || new Tone.Synth().toMaster()
  // Play the note
  synth.triggerAttackRelease(note, '8n');
}

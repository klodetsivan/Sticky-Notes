
loadNotes(false);

// Display notes when refreshing or returning to page 
function loadNotes(isNoteAdded) {

    // Load from storage
    const allNotes = loadNotesFromStorage();

    // Display notes in page
    displayNotes(allNotes,isNoteAdded);
}

// add note to page
function addTask() {

    const isValid = validation();
    if (!isValid) {
        return;
    }

    const allNotes = loadNotesFromStorage();
    const note = getNote();

    allNotes.push(note);

    saveNotesToStorage(allNotes);
    displayNotes(allNotes,true);
    clearBoard();

}

// create a note 
function getNote() {

    const noteText = textBox.value;
    const noteDate = dateBox.value;
    const noteTime = timeBox.value;

    const note = {
        noteText,
        noteDate,
        noteTime
    };
    return note;
}

// load noates from Storage 
function loadNotesFromStorage() {

    const str = localStorage.getItem("notes");
    if (!str) {
        return [];
    }
    const notes = JSON.parse(str);
    return notes;

}

// save notes to Storage 
function saveNotesToStorage(allNotes) {
    const str = JSON.stringify(allNotes);
    localStorage.setItem("notes", str);
}

// display notes on page 
function displayNotes(allNotes,isNoteAdded) {
    const notesBody = document.getElementById("notesBody");
    notesBody.innerHTML = "";
    for (const n of allNotes) {
        const id = allNotes.indexOf(n);
        
        const div = GetNoteDiv(id,n , allNotes, isNoteAdded)

        notesBody.innerHTML += div;
    }
}
// creat note 
function GetNoteDiv(id,n , allNotes, isNoteAdded){
    return ` <div id="${id}" class="${allNotes.length -1  === id && isNoteAdded ? "note animationNote" : "note"}">
    <svg class="btnExit" onclick="deleteNote(${id})" xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF00"
    width="16" height="16" class="bi bi-x-square-fill" viewBox="0 0 16 16">
    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/></svg>
    <p class="bckt">${n.noteText}</p>
    <p class="bck">${n.noteDate}<br>${n.noteTime}</p>
    </div>`
}


// delete note from page and Storage 
function deleteNote(noteId) {
    const allNotes = loadNotesFromStorage();
    allNotes.splice(noteId, 1);
    saveNotesToStorage(allNotes);
    loadNotes(false);

}

// clear board 
function clearBoard() {

    textBox.value = "";
    dateBox.value = "";
    timeBox.value = "";
    textBox.focus();
}


// validation 
function validation() {
    const noteText = textBox.value;
    const noteDate = dateBox.value;
    const noteTime = timeBox.value;
    const today = setMinDate();

    textBox.style.backgroundColor = "";

    dateBox.style.backgroundColor = "";

    timeBox.style.backgroundColor = "";


    if (noteText === "") {
        event.preventDefault();
        alert("missing text");
        return false;
    }
    if (!noteDate) {
        event.preventDefault();
        dateBox.style.backgroundColor = "pink";
        alert("missing date");
        return false;
    }
    if (!noteTime) {
        event.preventDefault();
        timeBox.style.backgroundColor = "pink";
        alert("missing time");
        return false;
    }
    if (noteDate < today) {
        event.preventDefault();
        dateBox.style.backgroundColor = "pink";
        alert("wrong date");
        return false;
    }
    return true;
}

// prevent past date to be choosen 
function setMinDate() {
    let today = new Date().toISOString().split('T')[0];
    document.getElementsByName("dateBox")[0].setAttribute('min', today);
    return today;
}


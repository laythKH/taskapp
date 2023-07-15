const generateRandomId = () => {
   return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

const setNoteToLocalStorage = (note) => {
   localStorage.setItem('notes', JSON.stringify(note));
}

const getNotesFromLocalStorage = () => {
   const notes = JSON.parse(localStorage.getItem('notes'));
   if (!notes || notes.length === 0) {
      return false;
   }
   return notes;
}

export { generateRandomId, setNoteToLocalStorage, getNotesFromLocalStorage }
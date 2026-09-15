import { addNote,loadNote,editNote } from "../services/noteServices.js";

const editor = document.getElementById("editorContent");
const topSave = document.getElementById("topSaveBtn");
const bottomSave = document.getElementById("bottomSaveBtn");
const discard = document.getElementById("discardBtn");
const noteTitle = document.getElementById("noteTitle");
const cancelBtn = document.getElementById("cancelActionBtn");
const message = document.getElementById("message");
let mode;
let Id;


const handleExplicitSave = async (event) => {
  event.preventDefault();

  
  const title = noteTitle.value.trim();
  const content = editor.value.trim();

  if (!title || !content) {
    showMessage("Please fill in all fields.", "error");
    return;
  }

  try {
    let result;
    if(mode==="new"){
       result = await addNote({
        Title: title,
        Content: content,
        IsPinned: false,
        IsArchived: false,
      });
    
    }
    else if(mode==="edit"){
      
      result = await editNote({
        noteId: Id,
        Title: title,
        Content: content,
        IsPinned: false,
        IsArchived: false,
      });
    }
    

    console.log(result);

    if (result === true) {
      mode === "new"?showMessage("Note added successfully.", "success"):
      showMessage("Note edited successfully.", "success");

      setTimeout(() => {
        window.location.href = "./dashboard.html";
      }, 800);
    } else {
      mode === "new"?showMessage("Failed to add note.", "error"):
      showMessage("Failed to edit note.", "error");
      
    }
  } catch (error) {
    console.error(error);

    showMessage("Something went wrong. Please try again.", "error");
  }
};
topSave.addEventListener("click", handleExplicitSave);
bottomSave.addEventListener("click", handleExplicitSave);

discard.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete this note?")) {
  }
});

function showMessage(text, type) {
  message.textContent = text;
  message.className = `message ${type}`;
  message.style.display = "block";
}

cancelBtn.addEventListener("click", function () {
  window.location.href = "./dashboard.html";
});





(async function LoadNote(){
  const params = new URLSearchParams(window.location.search);
  const noteId = params.get("id");
  if(noteId === null){
    mode = "new";
    showMessage("Add new note..");

  }
  else{
    mode = "edit";
    const note = await loadNote(noteId);

    Id = noteId;
    noteTitle.value = note["title"] ?? "Untitled Note";
    editor.value = note["content"] ?? "";
  }
  

})();




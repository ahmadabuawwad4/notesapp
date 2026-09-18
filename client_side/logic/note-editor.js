import { addNote, loadNote, editNote } from "../services/noteServices.js";

// ==========================================
// DOM Elements
// ==========================================

const form = document.getElementById("noteEditorForm");

const editor = document.getElementById("editorContent");
const noteTitle = document.getElementById("noteTitle");

const topSave = document.getElementById("topSaveBtn");
const bottomSave = document.getElementById("bottomSaveBtn");

const discard = document.getElementById("discardBtn");
const cancelBtn = document.getElementById("cancelActionBtn");

const message = document.getElementById("message");

// ==========================================
// State
// ==========================================

let mode = "new";
let noteId = null;

// ==========================================
// Save Note
// ==========================================

async function handleSave(event) {
  event.preventDefault();

  const title = noteTitle.value.trim();
  const content = editor.value.trim();

  if (!title || !content) {
    showMessage("Please fill in all fields.", "error");
    return;
  }

  try {
    let result;

    if (mode === "new") {
      result = await addNote({
        Title: title,
        Content: content,
        IsPinned: false,
        IsArchived: false,
      });
    }

    if (mode === "edit") {
      result = await editNote({
        noteId: noteId,
        Title: title,
        Content: content,
        IsPinned: false,
        IsArchived: false,
      });
    }

    if (result === true) {
      const successMessage =
        mode === "new"
          ? "Note added successfully."
          : "Note edited successfully.";

      showMessage(successMessage, "success");

      setTimeout(() => {
        window.location.href = "./dashboard.html";
      }, 800);

      return;
    }

    const errorMessage =
      mode === "new" ? "Failed to add note." : "Failed to edit note.";

    showMessage(errorMessage, "error");
  } catch (error) {
    console.error(error);

    showMessage("Something went wrong. Please try again.", "error");
  }
}

// ==========================================
// Delete Note
// ==========================================

async function handleDelete() {
  if (mode !== "edit") {
    return;
  }

  const confirmed = confirm("Are you sure you want to delete this note?");

  if (!confirmed) {
    return;
  }

  // Add deleteNote() here when needed.
}

// ==========================================
// Cancel
// ==========================================

function handleCancel() {
  window.location.href = "./dashboard.html";
}

// ==========================================
// Message
// ==========================================

function showMessage(text, type = "") {
  message.textContent = text;
  message.dataset.type = type;
}

// ==========================================
// Load Note
// ==========================================

async function loadCurrentNote() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  // New Note
  if (id === null) {
    mode = "new";

    showMessage("Add new note");

    return;
  }

  // Edit Note
  mode = "edit";
  noteId = id;

  try {
    const note = await loadNote(id);

    if (!note) {
      showMessage("Note not found.", "error");
      return;
    }

    noteTitle.value = note.title ?? "";
    editor.value = note.content ?? "";

    showMessage("Editing Note");
  } catch (error) {
    console.error(error);

    showMessage("Failed to load note.", "error");
  }
}

// ==========================================
// Events
// ==========================================

form.addEventListener("submit", handleSave);

topSave.addEventListener("click", () => {
  form.requestSubmit();
});

discard.addEventListener("click", handleDelete);

cancelBtn.addEventListener("click", handleCancel);

// ==========================================
// Initialize
// ==========================================

loadCurrentNote();

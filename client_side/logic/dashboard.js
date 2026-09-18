import { loadNotes, deleteNote } from "../services/noteServices.js";


// ================================================================
// STATE
// ================================================================

const state = {
    notes: [],
    filteredNotes: [],
    searchTerm: "",
    isLoading: false,
    hasError: false
};


// ================================================================
// DOM ELEMENTS
// ================================================================

const elements = {
    notesGrid: document.getElementById("notesGrid"),
    notesCount: document.getElementById("notesCount"),

    loadingState: document.getElementById("loadingState"),
    errorState: document.getElementById("errorState"),
    emptyState: document.getElementById("emptyState"),

    searchInput: document.getElementById("searchInput"),

    newNoteButton: document.getElementById("newNoteButton"),
    emptyStateCreateButton: document.getElementById(
        "emptyStateCreateButton"
    ),

    logoutButton: document.getElementById("logoutButton")
};


// ================================================================
// INITIALIZATION
// ================================================================

async function initializeDashboard() {

    setupEvents();

    await getNotes();
}


// ================================================================
// LOAD NOTES
// ================================================================

async function getNotes() {

    setLoadingState(true);

    try {

        const result = await loadNotes();

        console.log("API Result:", result);

        if (!Array.isArray(result)) {

            console.error("Invalid API response:", result);

            showError();

            return;
        }

        state.notes = result;
        state.filteredNotes = result;

        renderNotes();

    } catch (error) {

        console.error("Failed to load notes:", error);

        showError();

    } finally {

        setLoadingState(false);
    }
}


// ================================================================
// RENDER NOTES
// ================================================================

function renderNotes() {

    const notes = state.filteredNotes;

    clearNotesGrid();

    updateNotesCount(notes.length);

    if (notes.length === 0) {

        showEmptyState();

        return;
    }

    showNotesGrid();

    notes.forEach(note => {

        const card = createNoteCard(note);

        elements.notesGrid.appendChild(card);
    });
}


// ================================================================
// CREATE NOTE CARD
// ================================================================

function createNoteCard(note) {

    const card = document.createElement("article");

    card.className = "note-card";

    card.dataset.noteId = note.noteId;

    const title = note.title ?? "Untitled Note";
    const content = note.content ?? "";
    const updatedAt = note.updatedAt;

    card.innerHTML = `

        <div class="note-card__header">

            <h2 class="note-card__title">
                ${escapeHtml(title)}
            </h2>

            <div class="note-card__actions">

                <button
                    type="button"
                    class="note-card__action"
                    title="Favorite"
                    aria-label="Favorite note"
                    data-action="favorite"
                >

                    <span class="material-symbols-outlined">
                        star
                    </span>

                </button>


                <button
                    type="button"
                    class="note-card__action"
                    title="Edit"
                    aria-label="Edit note"
                    data-action="edit"
                >

                    <span class="material-symbols-outlined">
                        edit
                    </span>

                </button>


                <button
                    type="button"
                    class="note-card__action note-card__action--delete"
                    title="Delete"
                    aria-label="Delete note"
                    data-action="delete"
                >

                    <span class="material-symbols-outlined">
                        delete
                    </span>

                </button>

            </div>

        </div>


        <p class="note-card__content">
            ${escapeHtml(content)}
        </p>


        <div class="note-card__footer">

            <p class="note-card__date">
                Updated ${formatDate(updatedAt)}
            </p>

        </div>
    `;

    return card;
}


// ================================================================
// NOTES GRID EVENTS
// ------------------------------------------------
// Event Delegation
// ================================================================

function handleNoteGridClick(event) {

    const actionButton = event.target.closest("[data-action]");
    const noteCard = event.target.closest(".note-card");

    if (!noteCard) {
        return;
    }

    const noteId = Number(noteCard.dataset.noteId);

    if (!noteId) {
        return;
    }


    // ------------------------------------------------------------
    // Action Button
    // ------------------------------------------------------------

    if (actionButton) {

        event.stopPropagation();

        const action = actionButton.dataset.action;

        handleNoteAction(action, noteId);

        return;
    }


    // ------------------------------------------------------------
    // Card Click
    // ------------------------------------------------------------

    editNote(noteId);
}


// ================================================================
// NOTE ACTIONS
// ================================================================

async function handleNoteAction(action, noteId) {

    switch (action) {

        case "edit":

            editNote(noteId);

            break;


        case "delete":

            await handleDeleteNote(noteId);

            break;


        case "favorite":

            favoriteNote(noteId);

            break;


        default:

            console.warn(
                `Unknown note action: ${action}`
            );
    }
}


// ================================================================
// SEARCH
// ================================================================

function handleSearch(event) {

    const searchTerm = event.target.value
        .toLowerCase()
        .trim();

    state.searchTerm = searchTerm;

    state.filteredNotes = filterNotes(
        state.notes,
        searchTerm
    );

    renderNotes();
}


// ================================================================
// FILTER NOTES
// ================================================================

function filterNotes(notes, searchTerm) {

    if (!searchTerm) {

        return notes;
    }

    return notes.filter(note => {

        const title = String(
            note.title ?? ""
        ).toLowerCase();

        const content = String(
            note.content ?? ""
        ).toLowerCase();

        return (
            title.includes(searchTerm) ||
            content.includes(searchTerm)
        );
    });
}


// ================================================================
// CREATE NOTE
// ================================================================

function navigateToCreateNote() {

    window.location.href = "./note-editor.html";
}


// ================================================================
// EDIT NOTE
// ================================================================

function editNote(noteId) {

    window.location.href =
        `./note-editor.html?id=${noteId}`;
}


// ================================================================
// DELETE NOTE
// ================================================================

async function handleDeleteNote(noteId) {

    const confirmed = confirm(
        "Are you sure you want to delete this note?"
    );

    if (!confirmed) {
        return;
    }


    try {

        const result = await deleteNote(noteId);

        console.log("Delete result:", result);

        if (!result) {

            console.error(
                "Failed to delete note:",
                result
            );

            return;
        }


        // --------------------------------------------------------
        // Remove note from local state
        // --------------------------------------------------------

        state.notes = state.notes.filter(
            note => note.noteId !== noteId
        );


        // --------------------------------------------------------
        // Apply current search again
        // --------------------------------------------------------

        state.filteredNotes = filterNotes(
            state.notes,
            state.searchTerm
        );


        // --------------------------------------------------------
        // Update UI
        // --------------------------------------------------------

        renderNotes();

    } catch (error) {

        console.error(
            "Failed to delete note:",
            error
        );
    }
}


// ================================================================
// FAVORITE NOTE
// ================================================================

function favoriteNote(noteId) {

    console.log("Favorite note:", noteId);

    // Favorite API will be implemented later.
}


// ================================================================
// LOGOUT
// ================================================================

function logout() {

    sessionStorage.removeItem("token");

    window.location.href = "./login.html";
}


// ================================================================
// UI STATE
// ================================================================

function setLoadingState(isLoading) {

    state.isLoading = isLoading;

    if (isLoading) {

        showLoading();

        return;
    }

    hideLoading();
}


// ================================================================
// SHOW LOADING
// ================================================================

function showLoading() {

    elements.loadingState.classList.remove("is-hidden");

    elements.errorState.classList.add("is-hidden");
    elements.notesGrid.classList.add("is-hidden");
    elements.emptyState.classList.add("is-hidden");
}


// ================================================================
// HIDE LOADING
// ================================================================

function hideLoading() {

    elements.loadingState.classList.add("is-hidden");
}


// ================================================================
// SHOW NOTES GRID
// ================================================================

function showNotesGrid() {

    elements.notesGrid.classList.remove("is-hidden");

    elements.emptyState.classList.add("is-hidden");
    elements.errorState.classList.add("is-hidden");
}


// ================================================================
// SHOW EMPTY STATE
// ================================================================

function showEmptyState() {

    elements.notesGrid.classList.add("is-hidden");

    elements.emptyState.classList.remove("is-hidden");

    elements.errorState.classList.add("is-hidden");
}


// ================================================================
// SHOW ERROR
// ================================================================

function showError() {

    state.hasError = true;

    elements.loadingState.classList.add("is-hidden");
    elements.notesGrid.classList.add("is-hidden");
    elements.emptyState.classList.add("is-hidden");

    elements.errorState.classList.remove("is-hidden");
}


// ================================================================
// CLEAR NOTES
// ================================================================

function clearNotesGrid() {

    elements.notesGrid.innerHTML = "";
}


// ================================================================
// UPDATE NOTES COUNT
// ================================================================

function updateNotesCount(count) {

    elements.notesCount.textContent = count;
}


// ================================================================
// SETUP EVENTS
// ================================================================

function setupEvents() {


    // ------------------------------------------------------------
    // Notes Grid
    // ------------------------------------------------------------

    if (elements.notesGrid) {

        elements.notesGrid.addEventListener(
            "click",
            handleNoteGridClick
        );
    }


    // ------------------------------------------------------------
    // Search
    // ------------------------------------------------------------

    if (elements.searchInput) {

        elements.searchInput.addEventListener(
            "input",
            handleSearch
        );
    }


    // ------------------------------------------------------------
    // New Note
    // ------------------------------------------------------------

    if (elements.newNoteButton) {

        elements.newNoteButton.addEventListener(
            "click",
            navigateToCreateNote
        );
    }


    // ------------------------------------------------------------
    // Empty State
    // ------------------------------------------------------------

    if (elements.emptyStateCreateButton) {

        elements.emptyStateCreateButton.addEventListener(
            "click",
            navigateToCreateNote
        );
    }


    // ------------------------------------------------------------
    // Logout
    // ------------------------------------------------------------

    if (elements.logoutButton) {

        elements.logoutButton.addEventListener(
            "click",
            logout
        );
    }
}


// ================================================================
// FORMAT DATE
// ================================================================

function formatDate(date) {

    if (!date) {
        return "";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return "";
    }

    return parsedDate.toLocaleDateString();
}


// ================================================================
// ESCAPE HTML
// ------------------------------------------------
// Prevent HTML injection when inserting API data.
// ================================================================

function escapeHtml(value) {

    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");
}


// ================================================================
// START APPLICATION
// ================================================================

initializeDashboard();
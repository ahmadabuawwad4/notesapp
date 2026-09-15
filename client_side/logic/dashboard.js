import { loadNotes,deleteNote } from "../services/noteServices.js";

let notes = [];

const notesGrid = document.getElementById("notesGrid");
const notesCount = document.getElementById("notesCount");
const loadingState = document.getElementById("loadingState");
const errorState = document.getElementById("errorState");
const emptyState = document.getElementById("emptyState");


// ===============================
// Load Notes
// ===============================

async function getNotes() {

    try {

        showLoading();

        const result = await loadNotes();

        console.log("API Result:", result);

        // Check API response
        if (!Array.isArray(result)) {

            console.error(result);

            showError();

            return;
        }

        notes = result;
        
        displayNotes(notes);

    } catch (error) {

        console.error("Failed to load notes:", error);

        showError();
    }
}


// ===============================
// Display Notes
// ===============================

function displayNotes(notesToDisplay) {

    hideLoading();

    notesGrid.innerHTML = "";

    notesCount.textContent = notesToDisplay.length;

    // No notes
    if (notesToDisplay.length === 0) {

        notesGrid.classList.add("hidden");

        emptyState.classList.remove("hidden");

        return;
    }

    // Notes exist
    notesGrid.classList.remove("hidden");

    emptyState.classList.add("hidden");

    notesToDisplay.forEach(note => {

        const card = createNoteCard(note);
        notesGrid.appendChild(card);
    });

}


// ===============================
// Create Note Card
// ===============================

function createNoteCard(note) {

    const card = document.createElement("article");

    card.className = `
        group
        flex
        cursor-pointer
        flex-col
        rounded-xl
        bg-surface-container-lowest
        p-space-md
        shadow-[0_1px_3px_0_rgba(15,23,42,0.05)]
        transition-all
        hover:-translate-y-1
        hover:shadow-lg
    `;


    const noteId = note.noteId;

    const title = note.title ?? "Untitled Note";

    const content = note.content ?? "";

    const updatedAt = note.updatedAt;


    card.innerHTML = `

        <!-- Card Header -->

        <div class="mb-3 flex items-start justify-between gap-3">

            <h2
                class="
                    line-clamp-2
                    font-headline
                    text-headline-sm
                    text-on-surface
                "
            >
                ${escapeHtml(title)}
            </h2>


            <div class="flex shrink-0 items-center gap-1">

                <button
                    type="button"
                    class="
                        rounded-full
                        p-1.5
                        text-on-surface-variant
                        transition-colors
                        hover:bg-surface-container-high
                    "
                    title="Favorite"
                    data-action="favorite"
                >

                    <span class="material-symbols-outlined text-lg">
                        star
                    </span>

                </button>


                <button
                    type="button"
                    class="
                        rounded-full
                        p-1.5
                        text-on-surface-variant
                        transition-colors
                        hover:bg-surface-container-high
                    "
                    title="Edit"
                    data-action="edit"
                >

                    <span class="material-symbols-outlined text-lg">
                        edit
                    </span>

                </button>


                <button
                    type="button"
                    class="
                        rounded-full
                        p-1.5
                        text-on-surface-variant
                        transition-colors
                        hover:bg-error-container
                        hover:text-error
                    "
                    title="Delete"
                    data-action="delete"
                >

                    <span class="material-symbols-outlined text-lg">
                        delete
                    </span>

                </button>

            </div>

        </div>


        <!-- Content -->

        <p
            class="
                mb-5
                line-clamp-4
                flex-1
                text-body-md
                leading-relaxed
                text-on-surface-variant
            "
        >
            ${escapeHtml(content)}
        </p>


        <!-- Footer -->

        <div class="mt-auto">

            <p class="text-label-sm text-on-surface-variant">

                Updated ${formatDate(updatedAt)}

            </p>

        </div>

    `;


    // ==========================
    // Card Events
    // ==========================

    const editButton = card.querySelector('[data-action="edit"]');

    const deleteButton = card.querySelector('[data-action="delete"]');

    const favoriteButton = card.querySelector('[data-action="favorite"]');


    editButton.addEventListener("click", function (event) {

        event.stopPropagation();

        editNote(noteId);

    });


    deleteButton.addEventListener("click", function (event) {

        event.stopPropagation();

        handleDeleteNote(noteId);

    });


    favoriteButton.addEventListener("click", function (event) {

        event.stopPropagation();

        favoriteNote(noteId);

    });


    // Clicking the card opens the note
    card.addEventListener("click", function () {

        editNote(noteId);

    });


    return card;
}


// ===============================
// Search
// ===============================

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("input", function () {

        const searchValue = this.value.toLowerCase().trim();


        const filteredNotes = notes.filter(note => {

            const title = (note.title ?? "").toLowerCase();

            const content = (note.content ?? "").toLowerCase();


            return (
                title.includes(searchValue) ||
                content.includes(searchValue)
            );

        });


        displayNotes(filteredNotes);

    });

}


// ===============================
// New Note
// ===============================

const newNoteButton = document.getElementById("newNoteButton");

if (newNoteButton) {

    newNoteButton.addEventListener("click", function () {

        window.location.href = "./note-editor.html";

    });

}


// ===============================
// Empty State - Create Note
// ===============================

const emptyStateCreateButton =
    document.getElementById("emptyStateCreateButton");


if (emptyStateCreateButton) {

    emptyStateCreateButton.addEventListener("click", function () {

        window.location.href = "./note-editor.html";

    });

}


// ===============================
// Logout
// ===============================

const logoutButton =
    document.getElementById("logoutButton");


if (logoutButton) {

    logoutButton.addEventListener("click", function () {

        sessionStorage.removeItem("token");

        window.location.href = "./login.html";

    });

}


// ===============================
// Edit Note
// ===============================

function editNote(id) {

    window.location.href = `./note-editor.html?id=${id}`;

}


// ===============================
// Delete Note
// ===============================

async function handleDeleteNote(id) {

    const confirmed = confirm(
        "Are you sure you want to delete this note?"
    );


    if (!confirmed) {

        return;
    }
    console.log(id);

    const result = await deleteNote(id);

    if (result) {
        location.reload();
    } else {
        console.error("Failed to delete note:", result);
    }

}


// ===============================
// Favorite Note
// ===============================

function favoriteNote(id) {

    console.log("Favorite note:", id);

    // سيتم إضافة Favorite API لاحقاً
}


// ===============================
// Loading
// ===============================

function showLoading() {

    loadingState.classList.remove("hidden");

    errorState.classList.add("hidden");

    notesGrid.classList.add("hidden");

    emptyState.classList.add("hidden");

}


// ===============================
// Hide Loading
// ===============================

function hideLoading() {

    loadingState.classList.add("hidden");

}


// ===============================
// Error
// ===============================

function showError() {

    loadingState.classList.add("hidden");

    notesGrid.classList.add("hidden");

    emptyState.classList.add("hidden");

    errorState.classList.remove("hidden");

}


// ===============================
// Format Date
// ===============================

function formatDate(date) {

    if (!date) {

        return "";

    }


    return new Date(date).toLocaleDateString();

}


// ===============================
// Escape HTML
// ===============================

function escapeHtml(value) {

    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}


// ===============================
// Start
// ===============================

getNotes();
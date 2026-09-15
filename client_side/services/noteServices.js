const token = sessionStorage.getItem("token");
const domain = "http://notesapp.tryasp.net";


export async function addNote(newNote) {

    let result = "";
    const endpoint = "/api/Note/AddNote";


    let url = new URL(endpoint, domain);


    try {

        const response = await fetch(url, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body:JSON.stringify(newNote)
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        await response.text();
        return true;

    } catch (error) {

        console.log(`Failed: ${error.message}`);
        return false;

    }

    return result;
}

export async function deleteNote(noteId) {

    const endpoint = "/api/Note/DeleteNote";


    let url = new URL(endpoint, domain);
    url.searchParams.set("noteId",noteId);


    try {

        const response = await fetch(url, {
            method: "DELETE",

            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        await response.text();
        return true;

    } catch (error) {

        console.error(`Failed: ${error.message}`);
        return false

    }

}

export async function loadNotes() {

    let result = "";
    const endpoint = "/api/Note/GetAllNotes";


    let url = new URL(endpoint, domain);


    try {

        const response = await fetch(url, {
            method: "GET",

            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        result = await response.json();

    } catch (error) {

        result = `Failed: ${error.message}`;

    }

    return result;
}

export async function loadNote(id) {

    let result = "";
    const endpoint = "/api/Note/GetNote";


    let url = new URL(endpoint, domain);
    url.searchParams.set("noteId",id);


    try {

        const response = await fetch(url, {
            method: "GET",

            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        result = await response.json();

    } catch (error) {

        result = `Failed: ${error.message}`;

    }

    return result;
}


export async function editNote(editedNote) {
    let result = "";
    const endpoint = "/api/Note/EditNote";


    let url = new URL(endpoint, domain);

    try {

        const response = await fetch(url, {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body:JSON.stringify(editedNote)

        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        result = await response.json();

    } catch (error) {

        result = `Failed: ${error.message}`;

    }

    return result;
}
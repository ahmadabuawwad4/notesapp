import { domain, apiFetch } from "./apiFetch.js";

const token = sessionStorage.getItem("token");
const addNote_endpoint = "/api/Note/AddNote";
const delNote_endpoint = "/api/Note/DeleteNote";
const getAll_endpoint = "/api/Note/GetAllNotes";
const get_endpoint = "/api/Note/GetNote";
const edit_endpoint = "/api/Note/EditNote";
const improve_endpoint = "/api/Note/ImproveNote";

export async function addNote(newNote) {
  const url = new URL(addNote_endpoint, domain);

  const options = {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newNote),
  };

  try {
    const data = await apiFetch(url, options);
    if (data.id > 0) return true;
  } catch (error) {
    console.log(`Failed: ${error.message}`);
    return false;
  }
}

export async function deleteNote(noteId) {
  let url = new URL(delNote_endpoint, domain);
  url.searchParams.set("noteId", noteId);

  const options = {
    method: "DELETE",

    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const deleted = await apiFetch(url, options, "text");

    return deleted;
  } catch (error) {
    console.error(`Failed: ${error.message}`);
    return false;
  }
}

export async function loadNotes() {
  const url = new URL(getAll_endpoint, domain);
  const options = {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const data = await apiFetch(url, options);

    return data;
  } catch (error) {
    console.error(`Failed: ${error.message}`);
    return null;
  }

  return result;
}

export async function loadNote(id) {
  let url = new URL(get_endpoint, domain);
  url.searchParams.set("noteId", id);

  const options = {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const data = await apiFetch(url, options);

    return data;
  } catch (error) {
    console.error(`Failed: ${error.message}`);
    return null;
  }
}


export async function editNote(editedNote) {
  
  const url = new URL(edit_endpoint, domain);
  const options = {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(editedNote),
  };

  try {
    const updated = await apiFetch(url, options,"text");
    return updated === "true";
  } 
  catch (error) {
    console.error(`Failed: ${error.message}`);
    return false;
  }
}

export async function improveNote(Content) {
  const url = new URL(improve_endpoint, domain);

  const options = {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body:JSON.stringify({
      noteContent : Content
    })
  };

  try {
    const improvedContent = await apiFetch(url, options, "text");
    return improvedContent;
  } catch (error) {
    console.error(`Failed: ${error.message}`);
    return false;
  }
}

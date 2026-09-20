export const domain = "https://notesapp.tryasp.net";

export async function apiFetch(url, options = {}, returnType = "json") {
  try {
    const response = await fetch(url, options);

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    return returnType === "json"
      ? await response.json()
      : await response.text();
  } catch (err) {
    console.error(err);
    return err;
  }
}

export async function apiFetchWithRetry(
  url,
  options = {},
  returnType = "json",
  retries = 3,
  delay = 1000,
) {
  try {
    return await apiFetch(url, options, returnType);
  } catch (err) {
    if (retries === 0) throw err;

    await new Promise((r) => setTimeout(r, delay));
    return fetchWithRetry(url, retries - 1, delay * 2);
  }
}

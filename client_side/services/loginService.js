const domain = "http://notesapp.tryasp.net";
const endpoint = "/api/Auth/login";

export async function Login(email, password) {
  let result = "";

  const url = new URL(endpoint, domain);

  try {
    const response = await fetch(url, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      body: JSON.stringify({
        email: email,
        password: password,
      }),
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

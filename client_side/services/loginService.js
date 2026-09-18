const domain = "http://notesapp.tryasp.net";
const endpoint = "/api/Auth/login";

export async function Login(email, password) {
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
      return false;
    }

    const result = await response.json();

    if (!result.token) {
      return false;
    }

    sessionStorage.setItem("token", result.token);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

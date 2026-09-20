import { domain, apiFetch } from "./apiFetch.js";
const endpoint = "/api/Auth/login";

export async function Login(email, password) {
  const url = new URL(endpoint, domain);
  const reqBody = {
    email: email,
    password: password,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(reqBody),
  };

  try {
    const data = await apiFetch(url, options);

    if (!data.token) {
      return false;
    }

    sessionStorage.setItem("token", data.token);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

import { domain, apiFetch } from "./apiFetch.js";

export async function registration(FullName, Email, Password) {
  const endpoint = "/api/User/Register";
  const url = new URL(endpoint, domain);
  const options = {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },

    body: JSON.stringify({
      fullName: FullName,
      email: Email,
      password: Password,
    }),
  };

  try {
    const data = await apiFetch(url, options);

    return data ? data : null;
  } catch (error) {
    console.error(`Failed: ${error.message}`);
    return null;
  }
  
}

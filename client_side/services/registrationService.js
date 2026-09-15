const domain = "http://notesapp.tryasp.net";

export async function registration(FullName,Email, Password) {
  const endpoint = "/api/User/Register";
  const url = new URL(endpoint, domain);

  try {
    const response = await fetch(url, {
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
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return JSON.parse(await response.text());
     

  } catch (error) {
    result = `Failed: ${error.message}`;
    console.log(result);
    return result
  }

}

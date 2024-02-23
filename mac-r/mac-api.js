const base = "https://backend-mac.vercel.app";
const clicksApi = base + "/clicks";
const referencesApi = base + "/references";
const referenceRegister = base + "/references/get-id-by-reference/";

async function getReferenceByReference(reference) {
  if (reference === "/undefined") return;

  try {
    const response = await fetch(referenceRegister + reference, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = response.json();
    console.log("Success:", result);
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getLinkByReference(reference) {
  if (reference === "/undefined") return;

  const body = JSON.stringify({ reference: reference });

  try {
    const response = await fetch(referencesApi + "/get-link-by-reference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.text();
    console.log("Success:", result);
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function newIpClick(ip, reference) {
  const body = JSON.stringify({ reference: reference, ip: ip });

  const exists = await fetch(clicksApi + "/ip-already-clicked", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  return !exists;
}

async function addNewClick(ip, reference) {
  const body = JSON.stringify({ reference: reference, ip: ip });

  try {
    const response = await fetch(clicksApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}

export { addNewClick, getLinkByReference, getReferenceByReference, newIpClick };

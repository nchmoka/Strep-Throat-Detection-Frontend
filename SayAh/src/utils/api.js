const BASE_URL =
    "https://362b-2a06-c701-74f0-4900-1b2-cb1b-6917-1f1f.ngrok-free.app";

// A small helper to handle common fetch logic
async function handleResponse(response) {
    const data = await response.json().catch(() => ({}));
    console.log(data);

    if (!response.ok) {
        // Response not OK: Try to return error from data or a default message
        const error = data.error || "An error occurred. Please try again.";
        throw new Error(error);
    }
    return data;
}

/**
 * Register a new user.
 * @param {string} username
 * @param {string} password
 * @returns {Promise<object>} JSON response from server
 */
export async function registerUser(username, password) {
    const _body = `username=${username}&password=${password}`;
    const response = await fetch(`${BASE_URL}/register/`, {
        method: "POST",
        body: _body,
    }).catch((error) => {
        console.log(error);
    });
    return handleResponse(response);
}

/**
 * Login user with given credentials.
 * On success, a session cookie is set by the server.
 * @param {string} username
 * @param {string} password
 * @returns {Promise<object>} JSON response
 */
export async function loginUser(username, password) {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    console.log(formData);
    const response = await fetch(`${BASE_URL}/login/`, {
        method: "POST",
        body: formData,
        credentials: "include",
    });

    return handleResponse(response);
}

/**
 * Analyze throat image.
 * Requires the user to be authenticated (session cookie from login).
 * @param {string} uri Path to the image file
 * @returns {Promise<object>} JSON with prediction and probability
 */
export async function analyzeImage(uri) {
    const formData = new FormData();
    formData.append("image", {
        uri,
        type: "image/jpeg",
        name: "throat.jpg",
    });

    const response = await fetch(`${BASE_URL}/analyze/`, {
        method: "POST",
        body: formData,
        credentials: "include",
    });

    return handleResponse(response);
}

/**
 * Get a list of educational resources.
 * @returns {Promise<Array>} Array of resources (id, title, content, etc.)
 */
export async function getResources() {
    const response = await fetch(`${BASE_URL}/resources/`, {
        method: "GET",
        credentials: "include",
    });

    return handleResponse(response);
}

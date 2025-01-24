import axios from "axios";

const BASE_URL =
    "https://a337-2a06-c701-74df-e00-5495-e6f9-b7d5-a356.ngrok-free.app";

// Function to upload image to the backend
export const uploadImage = async (imageUri) => {
    try {
        const formData = new FormData();
        formData.append("image", {
            uri: imageUri,
            name: "throat_image.jpg",
            type: "image/jpeg",
        });

        const response = await axios.post(`${BASE_URL}/analyze/`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true, // To include cookies in the request
        });

        return response.data;
    } catch (error) {
        console.error("Error uploading image:", error);
        return { success: false, error: error.message };
    }
};

export const registerUser = async (username, password, navigation) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/register/`,
            new URLSearchParams({
                username,
                password,
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        if (response.status === 201) {
            alert("Registration successful! Logging in...");

            // Auto-login after successful registration
            const loginResponse = await loginUser(username, password);

            if (loginResponse.success) {
                alert("Login successful!");
                navigation.replace("HomeScreen"); // Redirect user to main app screen
            } else {
                alert("Login failed! Please log in manually.");
                navigation.navigate("LoginScreen"); // Redirect to login screen
            }
        }
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error);
        alert("Registration failed. Please try again.");
        return { success: false, error: error.message };
    }
};

// Function to log in a user and store session cookies
export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/login/`,
            new URLSearchParams({
                username,
                password,
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                withCredentials: true, // To include session cookies
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error);
        return { success: false, error: error.message };
    }
};

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL =
    "https://7bcf-2a06-c701-74df-e00-5d73-8f54-5cbe-d2ea.ngrok-free.app";

// Function to upload image to the backend
export const uploadImage = async (imageUri) => {
    try {
        const authToken = await AsyncStorage.getItem("authToken"); // Retrieve stored session ID

        if (!authToken) {
            throw new Error("User not authenticated");
        }

        const formData = new FormData();
        formData.append("image", {
            uri: imageUri,
            name: "throat_image.jpg",
            type: "image/jpeg",
        });

        const response = await axios.post(`${BASE_URL}/analyze/`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Cookie: `sessionid=${authToken}`, // Attach session ID
            },
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        console.error("Error uploading image:", error);
        return { success: false, error: error.message };
    }
};

// Function to register a user without auto-login
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

        if (response.message === "User registered successfully") {
            alert("Registration successful! Please log in.");
            navigation.navigate("LoginScreen"); // Redirect to login screen
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

        if (response.status === 200) {
            // Extract session ID from response headers
            const setCookieHeader = response.headers["set-cookie"];
            let sessionId = null;

            if (setCookieHeader && Array.isArray(setCookieHeader)) {
                // Join array into a single string, then split cookies by ", " (for multiple cookies)
                const cookieString = setCookieHeader.join(", ");

                // Find the sessionid in the cookie string
                const sessionCookie = cookieString
                    .split(", ") // Split cookies in case of multiple
                    .find((cookie) => cookie.includes("sessionid="));

                if (sessionCookie) {
                    sessionId = sessionCookie.split(";")[0].split("=")[1]; // Extract session ID
                }
            }

            if (!sessionId) {
                return { success: false, error: "Session ID missing." };
            }

            await AsyncStorage.setItem("authToken", sessionId); // Store session ID

            return { success: true, sessionId };
        }

        return { success: false, error: "Login failed." };
    } catch (error) {
        console.error("Error logging in:", error);
        return { success: false, error: error.message };
    }
};

// Function to check if the user is logged in
export const checkLoginStatus = async () => {
    try {
        const token = await AsyncStorage.getItem("authToken");
        return token ? true : false;
    } catch (error) {
        console.error("Error checking login status:", error);
        return false;
    }
};

// Function to log out a user
export const logoutUser = async (navigation) => {
    try {
        await AsyncStorage.removeItem("authToken"); // Remove saved session
        navigation.replace("LoginScreen"); // Redirect to login
    } catch (error) {
        console.error("Error logging out:", error);
    }
};

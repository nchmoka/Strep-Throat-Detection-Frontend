// Import necessary dependencies
import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { loginUser } from "../utils/api"; // Custom API utility for user authentication
import AsyncStorage from "@react-native-async-storage/async-storage"; // For persistent storage

/**
 * LoginScreen Component
 * Handles user authentication and session management
 * Provides interface for username/password login
 * @param {object} navigation - React Navigation prop for screen navigation
 */
const LoginScreen = ({ navigation }) => {
    // State management for form inputs
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    /**
     * Handles the login process
     * Validates inputs, makes API call, and manages session storage
     */
    const handleLogin = async () => {
        // Input validation
        if (!username || !password) {
            Alert.alert("Error", "Please enter both username and password.");
            return;
        }

        // Attempt login through API
        const response = await loginUser(username, password);

        if (response.success) {
            try {
                // Check for valid session ID
                if (response.sessionId) {
                    // Store session ID in AsyncStorage for persistent auth
                    await AsyncStorage.setItem("authToken", response.sessionId);

                    // Reset navigation stack and redirect to main app
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "Main" }], // Navigates to DrawerNavigator
                    });
                } else {
                    Alert.alert(
                        "Error",
                        "Session ID not found. Please try again."
                    );
                }
            } catch (error) {
                // Handle AsyncStorage errors
                Alert.alert(
                    "Error",
                    "Failed to save session. Please try again."
                );
            }
        } else {
            // Handle invalid credentials
            Alert.alert("Error", "Login failed. Wrong credentials");
        }
    };

    return (
        <View style={styles.container}>
            {/* Login form header */}
            <Text style={styles.header}>Login</Text>

            {/* Username input field */}
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />

            {/* Password input field with secure entry */}
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            {/* Login button */}
            <Button title="Login" onPress={handleLogin} />

            {/* Registration link */}
            <Text
                style={styles.switchText}
                onPress={() => navigation.navigate("Register")}
            >
                Don't have an account? Register
            </Text>
        </View>
    );
};

// Styles for the component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center", // Centers content vertically
        padding: 20,
        backgroundColor: "#f8f9fa",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 10,
        backgroundColor: "#fff", // White background for input fields
    },
    switchText: {
        marginTop: 15,
        textAlign: "center",
        color: "#007AFF", // iOS blue color for interactive text
    },
});

export default LoginScreen;

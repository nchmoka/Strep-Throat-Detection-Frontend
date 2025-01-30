// Import necessary dependencies
import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { registerUser } from "../utils/api"; // Custom API utility for user registration

/**
 * RegisterScreen Component
 * Handles new user registration with basic form validation
 * Provides navigation between registration and login screens
 * @param {object} navigation - React Navigation prop for screen navigation
 */
const RegisterScreen = ({ navigation }) => {
    // State management for form inputs
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    /**
     * Handles the registration process
     * Validates inputs and makes API call to register new user
     */
    const handleRegister = async () => {
        // Form validation
        if (!username || !password) {
            Alert.alert("Error", "Please enter both username and password.");
            return;
        }

        // Attempt to register user through API
        const response = await registerUser(username, password);

        if (response.message === "User registered successfully") {
            // Show success message and redirect to login
            Alert.alert("Success", "Registration successful! Please log in.");
            navigation.navigate("Login");
        } else {
            // Handle registration failure
            Alert.alert("Error", response.error || "Registration failed.");
        }
    };

    return (
        <View style={styles.container}>
            {/* Registration form header */}
            <Text style={styles.header}>Register</Text>

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

            {/* Registration button */}
            <Button title="Register" onPress={handleRegister} />

            {/* Login link for existing users */}
            <Text
                style={styles.switchText}
                onPress={() => navigation.navigate("Login")}
            >
                Already have an account? Log in
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
        backgroundColor: "#f8f9fa", // Light background color
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
        borderColor: "#ccc", // Light gray border
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

export default RegisterScreen;

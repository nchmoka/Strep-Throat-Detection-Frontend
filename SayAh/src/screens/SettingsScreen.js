// Import necessary dependencies
import React, { useState, useEffect } from "react";
import { View, Text, Switch, StyleSheet, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // For persistent storage
import { CommonActions } from "@react-navigation/native"; // For navigation reset

/**
 * SettingsScreen Component
 * Manages user preferences and provides logout functionality
 * Uses AsyncStorage for persistent settings storage
 * @param {object} navigation - React Navigation prop for screen navigation
 */
const SettingsScreen = ({ navigation }) => {
    // State management for notification preferences
    const [notifications, setNotifications] = useState(true);

    // Load saved settings when component mounts
    useEffect(() => {
        loadSettings();
    }, []);

    /**
     * Loads user settings from AsyncStorage
     * Initializes notification preferences from stored values
     */
    const loadSettings = async () => {
        try {
            const notificationsValue = await AsyncStorage.getItem(
                "notifications"
            );
            // Only update state if a stored value exists
            if (notificationsValue !== null)
                setNotifications(JSON.parse(notificationsValue));
        } catch (error) {
            console.error("Error loading settings:", error);
        }
    };

    /**
     * Saves a setting to AsyncStorage
     * @param {string} key - The setting key to save
     * @param {any} value - The value to store
     */
    const saveSetting = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Error saving setting:", error);
        }
    };

    /**
     * Handles user logout
     * Clears authentication token and resets navigation stack
     */
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem("authToken"); // Clear authentication
            Alert.alert("Logged Out", "You have been logged out successfully.");
            // Reset navigation stack to auth screen
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: "Auth" }], // Redirects to Login/Register
                })
            );
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <View style={styles.container}>
            {/* Settings header */}
            <Text style={styles.header}>Settings</Text>

            {/* Notification toggle setting */}
            <View style={styles.settingItem}>
                <Text style={styles.settingText}>Notifications</Text>
                <Switch
                    value={notifications}
                    onValueChange={(value) => {
                        setNotifications(value);
                        saveSetting("notifications", value);
                    }}
                />
            </View>

            {/* Logout button */}
            <Button title="Logout" onPress={handleLogout} color="#d9534f" />
        </View>
    );
};

// Styles for the component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f8f9fa", // Light background color
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    settingItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#ffffff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        // Card shadow styling
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2, // Android shadow
    },
    settingText: {
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default SettingsScreen;

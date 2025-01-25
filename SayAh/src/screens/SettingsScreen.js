import React, { useState, useEffect } from "react";
import { View, Text, Switch, StyleSheet, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";

const SettingsScreen = ({ navigation }) => {
    const [notifications, setNotifications] = useState(true);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const notificationsValue = await AsyncStorage.getItem(
                "notifications"
            );
            if (notificationsValue !== null)
                setNotifications(JSON.parse(notificationsValue));
        } catch (error) {
            console.error("Error loading settings:", error);
        }
    };

    const saveSetting = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Error saving setting:", error);
        }
    };

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem("authToken"); // Clear stored session
            Alert.alert("Logged Out", "You have been logged out successfully.");
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
            <Text style={styles.header}>Settings</Text>

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

            <Button title="Logout" onPress={handleLogout} color="#d9534f" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f8f9fa",
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
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    settingText: {
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default SettingsScreen;

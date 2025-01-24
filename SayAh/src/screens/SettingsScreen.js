import React, { useState, useEffect } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingsScreen = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const darkModeValue = await AsyncStorage.getItem("darkMode");
            const notificationsValue = await AsyncStorage.getItem(
                "notifications"
            );
            if (darkModeValue !== null) setDarkMode(JSON.parse(darkModeValue));
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

    return (
        <View style={[styles.container, darkMode && styles.darkContainer]}>
            <Text style={[styles.header, darkMode && styles.darkText]}>
                Settings
            </Text>

            <View style={styles.settingItem}>
                <Text style={[styles.settingText, darkMode && styles.darkText]}>
                    Dark Mode
                </Text>
                <Switch
                    value={darkMode}
                    onValueChange={(value) => {
                        setDarkMode(value);
                        saveSetting("darkMode", value);
                    }}
                />
            </View>

            <View style={styles.settingItem}>
                <Text style={[styles.settingText, darkMode && styles.darkText]}>
                    Notifications
                </Text>
                <Switch
                    value={notifications}
                    onValueChange={(value) => {
                        setNotifications(value);
                        saveSetting("notifications", value);
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f8f9fa",
    },
    darkContainer: {
        backgroundColor: "#121212",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    darkText: {
        color: "#ffffff",
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

import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { loginUser } from "../utils/api";

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert("Error", "Please enter both username and password.");
            return;
        }

        const response = await loginUser(username, password);
        if (response.message === "Login successful") {
            console.log(response.success);
            Alert.alert("Success", "Login successful!");
            navigation.replace("Main"); // Navigate to main screen
        } else {
            Alert.alert("Error", response.error || "Login failed.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Login" onPress={handleLogin} />
            <Text
                style={styles.switchText}
                onPress={() => navigation.navigate("RegisterScreen")}
            >
                Don't have an account? Register
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
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
        backgroundColor: "#fff",
    },
    switchText: {
        marginTop: 15,
        textAlign: "center",
        color: "#007AFF",
    },
});

export default LoginScreen;

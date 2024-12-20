import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { loginUser } from "../utils/api";

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin() {
        console.log("1");
        const response = await loginUser(username, password);
        if (response.message === "Login successful") {
            navigation.replace("Home");
        } else {
            alert(response.error || "Login failed");
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                placeholder="Username"
                onChangeText={setUsername}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
            <Button
                title="No account? Register"
                onPress={() => navigation.navigate("Register")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20 },
    title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
});

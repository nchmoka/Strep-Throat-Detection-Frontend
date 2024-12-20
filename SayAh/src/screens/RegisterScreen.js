import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { registerUser } from "../utils/api";

export default function RegisterScreen({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleRegister() {
        const response = await registerUser(username, password);
        if (response.message) {
            alert("Registration successful. You can now login.");
            navigation.replace("Login");
        } else {
            alert(response.error || "Registration failed");
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
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
            <Button title="Register" onPress={handleRegister} />
            <Button
                title="Already have an account? Login"
                onPress={() => navigation.navigate("Login")}
            />
        </View>
    );
}
// comment
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

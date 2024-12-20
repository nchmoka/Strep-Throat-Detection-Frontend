import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome!</Text>
            <Button
                title="Analyze Throat Image"
                onPress={() => navigation.navigate("Analyze")}
            />
            <Button
                title="View Educational Resources"
                onPress={() => navigation.navigate("Resources")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    title: { fontSize: 24, marginBottom: 20 },
});

import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const ResultScreen = ({ route, navigation }) => {
    const result = route.params?.result || {}; // Handle missing result object safely

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Diagnostic Result</Text>

            {result.probability !== undefined ? (
                <>
                    <Text style={styles.resultText}>
                        Probability of Strep Throat: {result.probability}%
                    </Text>
                    <Text style={styles.suggestion}>{result.suggestion}</Text>
                </>
            ) : (
                <Text style={styles.errorText}>No result data available.</Text>
            )}

            <Button
                title="Take Another Test"
                onPress={() => navigation.navigate("CaptureScreen")}
            />
            <Button
                title="View History"
                onPress={() => navigation.navigate("HistoryScreen")}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    resultText: {
        fontSize: 18,
        marginBottom: 10,
    },
    suggestion: {
        fontSize: 16,
        color: "gray",
        marginBottom: 20,
    },
    errorText: {
        fontSize: 18,
        color: "red",
        textAlign: "center",
        marginBottom: 20,
    },
});

export default ResultScreen;

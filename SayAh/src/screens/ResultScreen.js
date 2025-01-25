import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ResultScreen = ({ route, navigation }) => {
    const result = route.params?.result || {}; // Handle missing result safely
    const isStrep = result.prediction === "strep"; // Determine if user has strep

    const handleMedicalHelp = () => {
        Alert.alert(
            "Seek Medical Help",
            "Your test result suggests a possibility of strep throat. Please consult a healthcare professional.",
            [{ text: "OK" }]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>🩺 Diagnostic Result</Text>

            <View style={styles.resultCard}>
                {result.probability !== undefined ? (
                    <>
                        <Text style={styles.resultText}>
                            Probability of Strep Throat:{" "}
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    color: isStrep ? "#d9534f" : "#28a745",
                                }}
                            >
                                {Math.round(result.probability * 100)}%
                            </Text>
                        </Text>

                        <Text
                            style={[
                                styles.suggestion,
                                isStrep ? styles.strepText : styles.healthyText,
                            ]}
                        >
                            {isStrep
                                ? "⚠️ Your result suggests a high likelihood of strep throat. Please seek medical attention."
                                : "✅ You are in the clear! No signs of strep throat detected."}
                        </Text>

                        {isStrep && (
                            <TouchableOpacity
                                style={styles.helpButton}
                                onPress={handleMedicalHelp}
                            >
                                <Ionicons
                                    name="medkit-outline"
                                    size={24}
                                    color="#fff"
                                />
                                <Text style={styles.buttonText}>
                                    Get Medical Help
                                </Text>
                            </TouchableOpacity>
                        )}
                    </>
                ) : (
                    <Text style={styles.errorText}>
                        ❌ No result data available.
                    </Text>
                )}
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() =>
                        navigation.navigate("MainTabs", { screen: "Capture" })
                    }
                >
                    <Ionicons name="camera-outline" size={24} color="#fff" />
                    <Text style={styles.buttonText}>Take Another Test</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() =>
                        navigation.navigate("MainTabs", { screen: "History" })
                    }
                >
                    <Ionicons name="time-outline" size={24} color="#fff" />
                    <Text style={styles.buttonText}>View History</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8f9fa",
        padding: 20,
    },
    header: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#007AFF",
    },
    resultCard: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 15,
        width: "100%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    resultText: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: "center",
    },
    suggestion: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    strepText: {
        color: "#d9534f",
        fontWeight: "bold",
    },
    healthyText: {
        color: "#28a745",
        fontWeight: "bold",
    },
    errorText: {
        fontSize: 18,
        color: "red",
        textAlign: "center",
        marginBottom: 20,
    },
    helpButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#d9534f",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 10,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        width: "100%",
    },
    actionButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#007AFF",
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 10,
        flex: 1,
        justifyContent: "center",
        marginHorizontal: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        marginLeft: 8,
        fontWeight: "bold",
    },
});

export default ResultScreen;

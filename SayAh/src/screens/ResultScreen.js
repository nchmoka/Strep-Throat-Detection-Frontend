// Import necessary dependencies
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // For UI icons

/**
 * ResultScreen Component
 * Displays the diagnostic results for strep throat analysis
 * Shows probability, recommendations, and navigation options
 * @param {object} route - Contains navigation parameters including test results
 * @param {object} navigation - React Navigation prop for screen navigation
 */
const ResultScreen = ({ route, navigation }) => {
    // Safely extract result from navigation params
    const result = route.params?.result || {};

    // Determine if the result indicates strep throat
    var isStrep = result.prediction === "strep";
    // Additional check for historical results which use 'label' instead of 'prediction'
    if (result.label === "strep") {
        isStrep = true;
    }

    console.log(result);

    /**
     * Handles the medical help button press
     * Shows alert with recommendation to seek professional help
     */
    const handleMedicalHelp = () => {
        Alert.alert(
            "Seek Medical Help",
            "Your test result suggests a possibility of strep throat. Please consult a healthcare professional.",
            [{ text: "OK" }]
        );
    };

    return (
        <View style={styles.container}>
            {/* Screen header */}
            <Text style={styles.header}>🩺 Diagnostic Result</Text>

            {/* Results card */}
            <View style={styles.resultCard}>
                {/* Conditional rendering based on result availability */}
                {result.probability !== undefined ? (
                    <>
                        {/* Probability display */}
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

                        {/* Recommendation message */}
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

                        {/* Conditional medical help button for positive results */}
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
                    // Error message when no result data is available
                    <Text style={styles.errorText}>
                        ❌ No result data available.
                    </Text>
                )}
            </View>

            {/* Navigation buttons */}
            <View style={styles.buttonContainer}>
                {/* Return to capture screen button */}
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() =>
                        navigation.navigate("MainTabs", { screen: "Capture" })
                    }
                >
                    <Ionicons name="camera-outline" size={24} color="#fff" />
                    <Text style={styles.buttonText}>Back to home</Text>
                </TouchableOpacity>

                {/* View history button */}
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

// Styles for the component
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
        // Card shadow styling
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4, // Android shadow
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
        color: "#d9534f", // Red for positive strep results
        fontWeight: "bold",
    },
    healthyText: {
        color: "#28a745", // Green for negative results
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
        backgroundColor: "#d9534f", // Red background for urgency
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

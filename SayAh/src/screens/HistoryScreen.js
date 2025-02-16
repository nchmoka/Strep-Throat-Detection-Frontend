// Import necessary dependencies
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    Alert,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { fetchHistory } from "../utils/api"; // Custom API utility for fetching history
import { Ionicons } from "@expo/vector-icons"; // For UI icons

/**
 * HistoryScreen Component
 * Displays a list of past diagnoses with their results and timestamps
 * Does not show the numeric probability percentage
 * @param {object} navigation - React Navigation prop for screen navigation
 */
const HistoryScreen = ({ navigation }) => {
    // State management for history data and loading status
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load history data when component mounts
    useEffect(() => {
        loadHistory();
    }, []);

    /**
     * Fetches history data from the API
     * Handles loading states and error cases
     */
    const loadHistory = async () => {
        setLoading(true);
        try {
            const data = await fetchHistory();
            if (data.length > 0) {
                setHistory(data);
            } else {
                Alert.alert("No History", "You have no previous records.");
            }
        } catch (error) {
            Alert.alert("Error", "Could not retrieve history.");
        }
        setLoading(false);
    };

    /**
     * Renders individual history item
     * @param {object} item - History data item containing diagnosis details
     * @returns {JSX.Element} Rendered history card
     */
    const renderItem = ({ item }) => {
        const isStrep = item.label === "strep";
        return (
            <TouchableOpacity
                style={[
                    styles.card,
                    isStrep ? styles.strepCard : styles.healthyCard,
                ]}
                onPress={() => navigation.navigate("Result", { result: item })}
            >
                <View style={styles.details}>
                    <Text style={styles.label}>
                        Diagnosis:{" "}
                        <Text
                            style={
                                isStrep ? styles.strepText : styles.healthyText
                            }
                        >
                            {item.label.toUpperCase()}
                        </Text>
                    </Text>
                    {/* Remove the line showing the numeric probability */}
                    <Text style={styles.timestamp}>
                        Date: {new Date(item.timestamp).toLocaleString()}
                    </Text>
                </View>
                <Ionicons
                    name="chevron-forward"
                    size={24}
                    color="#555"
                    style={styles.icon}
                />
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>📜 Past Diagnoses</Text>
            {/* Conditional rendering based on loading and data state */}
            {loading ? (
                <ActivityIndicator size="large" color="#007AFF" />
            ) : history.length === 0 ? (
                <Text style={styles.noData}>No history found.</Text>
            ) : (
                <FlatList
                    data={history}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                />
            )}
        </View>
    );
};

// Styles for the component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f9fa",
        padding: 15,
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
        color: "#007AFF",
    },
    noData: {
        fontSize: 16,
        textAlign: "center",
        marginTop: 20,
        color: "#555",
    },
    card: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // Card shadow styling
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2, // Android shadow
    },
    strepCard: {
        borderLeftWidth: 5,
        borderLeftColor: "#d9534f", // Red indicator for strep diagnosis
    },
    healthyCard: {
        borderLeftWidth: 5,
        borderLeftColor: "#28a745", // Green indicator for healthy diagnosis
    },
    details: {
        flex: 1,
    },
    label: {
        fontSize: 18,
        fontWeight: "bold",
    },
    timestamp: {
        fontSize: 14,
        color: "#888", // Light gray for tertiary text
        marginTop: 4,
    },
    strepText: {
        color: "#d9534f", // Red text for strep diagnosis
        fontWeight: "bold",
    },
    healthyText: {
        color: "#28a745", // Green text for healthy diagnosis
        fontWeight: "bold",
    },
    icon: {
        marginLeft: 10,
    },
});

export default HistoryScreen;

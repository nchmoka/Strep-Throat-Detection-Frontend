import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    Alert,
    Button,
} from "react-native";
import { fetchHistory } from "../utils/api";

const HistoryScreen = ({ navigation }) => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        try {
            const data = await fetchHistory();
            if (data.success) {
                setHistory(data.history);
            } else {
                Alert.alert("Error", "Failed to fetch history");
            }
        } catch (error) {
            Alert.alert("Error", "An error occurred while fetching history");
        }
        setLoading(false);
    };

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.result}>Diagnosis: {item.result}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Diagnostic History</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={history}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                />
            )}
            <Button
                title="Back to Home"
                onPress={() => navigation.navigate("Capture")}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    item: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    date: {
        fontSize: 16,
        fontWeight: "bold",
    },
    result: {
        fontSize: 14,
        color: "gray",
    },
});

export default HistoryScreen;

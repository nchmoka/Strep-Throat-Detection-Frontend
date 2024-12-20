import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { getResources } from "../utils/api";

export default function ResourcesScreen() {
    const [resources, setResources] = useState([]);

    useEffect(() => {
        (async () => {
            const data = await getResources();
            setResources(data);
        })();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={resources}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text>{item.content}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    item: { marginBottom: 20 },
    title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
});

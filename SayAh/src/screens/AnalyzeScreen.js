import React, { useState } from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { analyzeImage } from "../utils/api";

export default function AnalyzeScreen() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [result, setResult] = useState(null);

    async function pickImage() {
        const permissionResult =
            await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult.status !== "granted") {
            alert("Permission to access camera is required!");
            return;
        }

        const pickerResult = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.7,
        });

        if (!pickerResult.canceled) {
            setSelectedImage(pickerResult.assets[0].uri);
        }
    }

    async function handleAnalyze() {
        if (!selectedImage) return;
        const response = await analyzeImage(selectedImage);
        setResult(response);
    }

    return (
        <View style={styles.container}>
            <Button title="Capture Image" onPress={pickImage} />
            {selectedImage && (
                <Image
                    source={{ uri: selectedImage }}
                    style={{ width: 200, height: 200, marginVertical: 20 }}
                />
            )}
            <Button
                title="Analyze Image"
                onPress={handleAnalyze}
                disabled={!selectedImage}
            />
            {result && (
                <View style={{ marginTop: 20 }}>
                    <Text>Prediction: {result.prediction}</Text>
                    <Text>Probability: {result.probability.toFixed(2)}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
});

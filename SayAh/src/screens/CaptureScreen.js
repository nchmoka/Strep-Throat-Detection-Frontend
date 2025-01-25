import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
    Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { uploadImage } from "../utils/api";
import { Ionicons } from "@expo/vector-icons";

const CaptureScreen = ({ navigation }) => {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const openCamera = async () => {
        const permissionResult =
            await ImagePicker.requestCameraPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert(
                "Permission Required",
                "You need to grant camera access to use this feature."
            );
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            flashMode: "on",
        });

        if (!result.canceled) {
            preprocessImage(result.assets[0].uri);
        }
    };

    const pickImageFromLibrary = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            preprocessImage(result.assets[0].uri);
        }
    };

    const preprocessImage = async (uri) => {
        try {
            const manipulatedImage = await ImageManipulator.manipulateAsync(
                uri,
                [{ resize: { width: 500 } }],
                { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
            );
            setImage(manipulatedImage.uri);
        } catch (error) {
            Alert.alert("Error", "Image processing failed");
        }
    };

    const handleSubmit = async () => {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) {
            Alert.alert(
                "Not Logged In",
                "You need to log in before submitting an image."
            );
            navigation.reset({
                index: 0,
                routes: [{ name: "Auth" }], // Redirects to Login/Register
            });
            return;
        }

        if (!image) {
            Alert.alert("No Image", "Please capture or upload an image first.");
            return;
        }

        setLoading(true);
        try {
            const response = await uploadImage(image);
            if (response.prediction) {
                navigation.navigate("Result", { result: response });
            } else {
                Alert.alert(
                    "Upload Failed",
                    "Could not analyze the image. Try again."
                );
            }
        } catch (error) {
            Alert.alert(
                "Error",
                "An error occurred while uploading the image."
            );
        }
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Capture Your Throat Image</Text>

            {/* Instruction Card */}
            <View style={styles.instructionsContainer}>
                <Text style={styles.instructionsTitle}>
                    📸 Image Guidelines:
                </Text>
                <Text style={styles.instructionsText}>
                    1. Use a well-lit environment.
                </Text>
                <Text style={styles.instructionsText}>
                    2. Hold the camera close to your throat.
                </Text>
                <Text style={styles.instructionsText}>
                    3. Say "Ahhh" to fully expose the throat.
                </Text>
                <Text style={styles.instructionsText}>
                    4. Avoid blocking the tonsils with your tongue.
                </Text>
                <Text style={styles.instructionsText}>
                    5. Keep the flash on for clarity.
                </Text>
            </View>

            {/* Capture & Upload Buttons */}
            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={styles.captureButton}
                    onPress={openCamera}
                >
                    <Ionicons name="camera" size={28} color="#fff" />
                    <Text style={styles.buttonText}>Capture Image</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={pickImageFromLibrary}
                >
                    <Ionicons name="image" size={28} color="#fff" />
                    <Text style={styles.buttonText}>Upload from Device</Text>
                </TouchableOpacity>
            </View>

            {/* Image Preview */}
            {image && <Image source={{ uri: image }} style={styles.preview} />}

            {/* Submit Button */}
            {image && (
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmit}
                    disabled={loading}
                >
                    <Ionicons name="cloud-upload" size={28} color="#fff" />
                    <Text style={styles.buttonText}>Submit for Analysis</Text>
                </TouchableOpacity>
            )}

            {loading && <ActivityIndicator size="large" color="#007AFF" />}
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
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        color: "#007AFF",
        marginBottom: 15,
    },
    instructionsContainer: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        marginBottom: 20,
        width: "100%",
    },
    instructionsTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
    },
    instructionsText: {
        fontSize: 16,
        color: "#555",
        marginBottom: 5,
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    captureButton: {
        flex: 1,
        backgroundColor: "#007AFF",
        paddingVertical: 12,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 5,
    },
    uploadButton: {
        flex: 1,
        backgroundColor: "#007AFF",
        paddingVertical: 12,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 5,
    },
    submitButton: {
        backgroundColor: "#007AFF",
        paddingVertical: 14,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
        marginLeft: 8,
    },
    preview: {
        width: 300,
        height: 300,
        marginVertical: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#ddd",
    },
});

export default CaptureScreen;

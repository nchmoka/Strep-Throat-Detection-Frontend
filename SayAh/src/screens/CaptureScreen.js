import React, { useState, useRef, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
    Text,
    Modal,
} from "react-native";
import { Camera } from "expo-camera"; // ✅ Ensure this is imported correctly
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { uploadImage } from "../utils/api";
import { Ionicons } from "@expo/vector-icons";

const CaptureScreen = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraOpen, setCameraOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const cameraRef = useRef(null);

    // Request Camera Permissions on Component Mount
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    // Open Camera with Live Preview
    const openCamera = () => {
        if (!hasPermission) {
            Alert.alert(
                "Permission Required",
                "You need to enable camera access in settings."
            );
            return;
        }
        setCameraOpen(true);
    };

    // Capture Image from Camera
    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync({
                quality: 1,
                flashMode: "on",
            });
            setCameraOpen(false);
            preprocessImage(photo.uri);
        }
    };

    // Pick Image from Library
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

    // Process Image Before Submission
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

    // Handle Image Submission
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

            {/* Instructions Card */}
            <View style={styles.instructionsContainer}>
                <Text style={styles.instructionsTitle}>
                    📸 Image Guidelines:
                </Text>
                <Text style={styles.instructionsText}>
                    ✔️ Use a **well-lit environment**.
                </Text>
                <Text style={styles.instructionsText}>
                    ✔️ Hold the camera **close to your throat**.
                </Text>
                <Text style={styles.instructionsText}>
                    ✔️ Say **"Ahhh"** to fully expose the throat.
                </Text>
                <Text style={styles.instructionsText}>
                    ✔️ Ensure **tonsils are visible** in the frame.
                </Text>
                <Text style={styles.instructionsText}>
                    ✔️ Keep the **flash on** for clarity.
                </Text>
            </View>

            {/* Capture & Upload Buttons */}
            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={styles.captureButton}
                    onPress={openCamera}
                >
                    <Ionicons name="camera" size={28} color="#fff" />
                    <Text style={styles.buttonText}>Open Camera</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={pickImageFromLibrary}
                >
                    <Ionicons name="image" size={28} color="#fff" />
                    <Text style={styles.buttonText}>Upload Image</Text>
                </TouchableOpacity>
            </View>

            {/* Image Preview & Retake Button */}
            {image && (
                <>
                    <Image source={{ uri: image }} style={styles.preview} />
                    <TouchableOpacity
                        style={styles.retakeButton}
                        onPress={() => setImage(null)}
                    >
                        <Ionicons name="refresh" size={28} color="#fff" />
                        <Text style={styles.buttonText}>Retake Image</Text>
                    </TouchableOpacity>
                </>
            )}

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

            {/* Camera Modal */}
            {cameraOpen && (
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={cameraOpen}
                >
                    <Camera style={styles.camera} ref={cameraRef}>
                        <View style={styles.overlay}>
                            <Text style={styles.overlayText}>
                                Position your throat inside the frame & say
                                "Ahhh"
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={styles.captureButton}
                            onPress={takePicture}
                        >
                            <Ionicons name="camera" size={40} color="#fff" />
                        </TouchableOpacity>
                    </Camera>
                </Modal>
            )}
        </View>
    );
};

export default CaptureScreen;

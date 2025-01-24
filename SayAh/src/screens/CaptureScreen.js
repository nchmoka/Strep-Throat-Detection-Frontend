import React, { useState } from "react";
import {
    View,
    Image,
    Button,
    StyleSheet,
    Alert,
    ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { uploadImage } from "../utils/api";

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
        if (!image) {
            Alert.alert("No Image", "Please capture an image first.");
            return;
        }

        setLoading(true);
        try {
            const response = await uploadImage(image);
            if (response.success) {
                navigation.navigate("ResultScreen", { result: response.data });
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
            <Button title="Capture Image" onPress={openCamera} />
            {image && <Image source={{ uri: image }} style={styles.preview} />}
            {image && (
                <Button
                    title="Submit for Analysis"
                    onPress={handleSubmit}
                    disabled={loading}
                />
            )}
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    preview: {
        width: 300,
        height: 300,
        marginVertical: 10,
        borderRadius: 10,
    },
});

export default CaptureScreen;

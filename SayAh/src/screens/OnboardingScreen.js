import React, { useRef, useEffect } from "react";
import {
    View,
    Text,
    Button,
    StyleSheet,
    Animated,
    ScrollView,
    Image,
} from "react-native";
import Swiper from "react-native-swiper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OnboardingScreen = ({ navigation }) => {
    const finishOnboarding = async () => {
        try {
            await AsyncStorage.setItem("hasSeenOnboarding", "true");
            navigation.replace("Auth");
        } catch (error) {
            console.error("Error saving onboarding status:", error);
        }
    };

    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <Swiper
                loop={false}
                showsPagination={true}
                dotColor="#ccc"
                activeDotColor="#007AFF"
            >
                <View style={styles.slide}>
                    <Image
                        source={require("../../assets/images/onboarding1.png")}
                        style={styles.image}
                    />
                    <Text style={styles.header}>Welcome to SayAh</Text>
                    <Text style={styles.description}>
                        SayAh is an AI-powered app that helps detect potential
                        strep throat infections using your phone's camera.
                    </Text>
                </View>
                <View style={styles.slide}>
                    <Image
                        source={require("../../assets/images/onboarding2.png")}
                        style={styles.image}
                    />
                    <Text style={styles.header}>How It Works</Text>
                    <Text style={styles.listItem}>
                        📸 Capture an image of your throat
                    </Text>
                    <Text style={styles.listItem}>
                        🤖 Our AI analyzes the image
                    </Text>
                    <Text style={styles.listItem}>
                        📊 Get instant results & recommendations
                    </Text>
                </View>
                <View style={styles.slide}>
                    <Image
                        source={require("../../assets/images/onboarding3.png")}
                        style={styles.image}
                    />
                    <Text style={styles.header}>Medical Disclaimer</Text>
                    <Text style={styles.description}>
                        If you experience severe sore throat, fever, or
                        difficulty swallowing, consult a healthcare
                        professional. SayAh is not a substitute for medical
                        advice.
                    </Text>
                    <Button
                        title="Get Started"
                        onPress={() => finishOnboarding()}
                        color="#007AFF"
                    />
                </View>
            </Swiper>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    slide: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: "contain",
        marginBottom: 20,
    },
    header: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 15,
        color: "#333",
        textAlign: "center",
    },
    description: {
        fontSize: 16,
        color: "#555",
        textAlign: "center",
        marginBottom: 10,
        paddingHorizontal: 15,
    },
    listItem: {
        fontSize: 18,
        color: "#222",
        marginBottom: 5,
        textAlign: "center",
    },
});

export default OnboardingScreen;

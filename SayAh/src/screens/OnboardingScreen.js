// Import necessary dependencies
import React, { useRef, useEffect, useState } from "react";
import {
    View,
    Text,
    Button,
    StyleSheet,
    Animated,
    Image,
    ActivityIndicator,
} from "react-native";
import Swiper from "react-native-swiper"; // For swipeable onboarding slides
import AsyncStorage from "@react-native-async-storage/async-storage"; // For persistent storage

/**
 * OnboardingScreen Component
 * Displays app introduction slides with animations
 * Handles first-time user experience and navigation flow
 * @param {object} navigation - React Navigation prop for screen navigation
 */
const OnboardingScreen = ({ navigation }) => {
    // State for loading indicator
    const [loading, setLoading] = useState(true);
    // Animation value for fade-in effect
    const fadeAnim = useRef(new Animated.Value(0)).current;

    /**
     * Check if user has already seen onboarding
     * Skip to Auth screen if onboarding was previously completed
     */
    useEffect(() => {
        const checkOnboardingStatus = async () => {
            try {
                const hasSeenOnboarding = await AsyncStorage.getItem(
                    "hasSeenOnboarding"
                );
                if (hasSeenOnboarding === "true") {
                    navigation.replace("Auth"); // Skip onboarding if already seen
                } else {
                    // Show onboarding with fade-in animation
                    setLoading(false);
                    Animated.timing(fadeAnim, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true,
                    }).start();
                }
            } catch (error) {
                console.error("Error checking onboarding status:", error);
                setLoading(false);
            }
        };

        checkOnboardingStatus();
    }, [navigation]);

    /**
     * Marks onboarding as completed and navigates to Auth screen
     * Called when user completes the onboarding flow
     */
    const finishOnboarding = async () => {
        try {
            await AsyncStorage.setItem("hasSeenOnboarding", "true");
            navigation.replace("Auth");
        } catch (error) {
            console.error("Error saving onboarding status:", error);
        }
    };

    // Show loading indicator while checking onboarding status
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    return (
        // Animated container for fade-in effect
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            {/* Swipeable slides container */}
            <Swiper
                loop={false}
                showsPagination
                dotColor="#ccc"
                activeDotColor="#007AFF"
            >
                {/* Welcome Slide */}
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

                {/* How It Works Slide */}
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

                {/* Medical Disclaimer Slide */}
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
                        onPress={finishOnboarding}
                        color="#007AFF"
                    />
                </View>
            </Swiper>
        </Animated.View>
    );
};

// Styles for the component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
        resizeMode: "contain", // Maintains aspect ratio
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

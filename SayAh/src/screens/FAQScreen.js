// Import necessary components from React and React Native
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

/**
 * FAQScreen Component
 * Displays a scrollable list of frequently asked questions about the SayAh app
 * Includes questions about strep throat, app functionality, and medical disclaimers
 */
const FAQScreen = () => {
    return (
        // ScrollView allows content to be scrollable when it exceeds screen height
        <ScrollView contentContainerStyle={styles.container}>
            {/* Main header for the FAQ section */}
            <Text style={styles.header}>Frequently Asked Questions</Text>

            {/* Individual FAQ items */}
            {/* Each item is wrapped in a View with consistent styling */}
            <View style={styles.faqItem}>
                <Text style={styles.question}>❓ What is strep throat?</Text>
                <Text style={styles.answer}>
                    Strep throat is a bacterial infection that causes a sore
                    throat and fever. It requires antibiotic treatment.
                </Text>
            </View>

            <View style={styles.faqItem}>
                <Text style={styles.question}>❓ How does SayAh work?</Text>
                <Text style={styles.answer}>
                    SayAh uses AI to analyze images of your throat and provide a
                    probability of infection.
                </Text>
            </View>

            <View style={styles.faqItem}>
                <Text style={styles.question}>
                    ❓ Is SayAh a replacement for a doctor?
                </Text>
                <Text style={styles.answer}>
                    No, SayAh is an AI-powered tool meant for preliminary
                    analysis. Always consult a healthcare professional for
                    medical advice.
                </Text>
            </View>

            <View style={styles.faqItem}>
                <Text style={styles.question}>
                    ❓ How accurate is the diagnosis?
                </Text>
                <Text style={styles.answer}>
                    While our AI is trained on a medical dataset, it is not 100%
                    accurate. It serves as an assistive tool, not a diagnostic
                    device.
                </Text>
            </View>
        </ScrollView>
    );
};

// StyleSheet for component styling
const styles = StyleSheet.create({
    container: {
        flexGrow: 1, // Allows content to grow within ScrollView
        padding: 20, // Adds spacing around all content
        backgroundColor: "#f8f9fa", // Light background color
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20, // Spacing between header and FAQ items
        textAlign: "center", // Centers the header text
    },
    faqItem: {
        marginBottom: 15, // Spacing between FAQ items
        padding: 15, // Internal spacing within FAQ items
        backgroundColor: "#ffffff", // White background for FAQ cards
        borderRadius: 10, // Rounded corners
        // Shadow styling for elevation effect
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2, // Android shadow elevation
    },
    question: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333", // Dark gray for questions
        marginBottom: 5, // Space between question and answer
    },
    answer: {
        fontSize: 16,
        color: "#555", // Medium gray for answers
    },
});

export default FAQScreen;

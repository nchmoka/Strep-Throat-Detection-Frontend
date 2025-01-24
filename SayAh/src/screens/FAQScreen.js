import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const FAQScreen = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Frequently Asked Questions</Text>
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

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#f8f9fa",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    faqItem: {
        marginBottom: 15,
        padding: 15,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    question: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
    },
    answer: {
        fontSize: 16,
        color: "#555",
    },
});

export default FAQScreen;

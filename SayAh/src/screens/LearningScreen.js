import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const LearningScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Understanding Strep Throat</Text>

            {/* Section: What is Strep Throat */}
            <Text style={styles.subHeader}>📌 What is Strep Throat?</Text>
            <Text style={styles.text}>
                Strep throat is a bacterial infection caused by{" "}
                <Text style={styles.bold}>
                    group A Streptococcus (GAS) bacteria
                </Text>
                . It primarily affects the throat and tonsils, leading to{" "}
                <Text style={styles.bold}>
                    pain, inflammation, and difficulty swallowing
                </Text>
                . Strep throat is{" "}
                <Text style={styles.bold}>highly contagious</Text> and spreads
                through respiratory droplets from coughing, sneezing, or
                touching contaminated surfaces.
            </Text>

            {/* Section: Symptoms */}
            <Text style={styles.subHeader}>🔍 Symptoms of Strep Throat</Text>
            <Text style={styles.text}>
                Strep throat symptoms usually appear{" "}
                <Text style={styles.bold}>within 2 to 5 days</Text> after
                exposure. Common symptoms include:
            </Text>
            <View style={styles.bulletList}>
                <Text style={styles.bulletItem}>
                    • Sudden and severe sore throat
                </Text>
                <Text style={styles.bulletItem}>• Pain when swallowing</Text>
                <Text style={styles.bulletItem}>
                    • Red and swollen tonsils, sometimes with white patches
                </Text>
                <Text style={styles.bulletItem}>
                    • Fever (often 101°F or higher)
                </Text>
                <Text style={styles.bulletItem}>
                    • Swollen lymph nodes in the neck
                </Text>
                <Text style={styles.bulletItem}>
                    • Headache, nausea, or vomiting (more common in children)
                </Text>
                <Text style={styles.bulletItem}>
                    • Rash (scarlet fever, in some cases)
                </Text>
            </View>

            {/* Section: Diagnosis */}
            <Text style={styles.subHeader}>🩺 Diagnosis of Strep Throat</Text>
            <Text style={styles.text}>
                A doctor can diagnose strep throat using:
            </Text>
            <View style={styles.bulletList}>
                <Text style={styles.bulletItem}>
                    • <Text style={styles.bold}>Rapid Strep Test (RST)</Text> –
                    A throat swab that provides results in minutes.
                </Text>
                <Text style={styles.bulletItem}>
                    • <Text style={styles.bold}>Throat Culture</Text> – A more
                    accurate test that takes 24-48 hours for confirmation.
                </Text>
            </View>

            {/* Section: Treatment */}
            <Text style={styles.subHeader}>💊 Treatment for Strep Throat</Text>
            <Text style={styles.text}>
                Since strep throat is caused by{" "}
                <Text style={styles.bold}>bacteria</Text>, it is treated with{" "}
                <Text style={styles.bold}>antibiotics</Text>, such as:
            </Text>
            <View style={styles.bulletList}>
                <Text style={styles.bulletItem}>
                    • <Text style={styles.bold}>Penicillin or Amoxicillin</Text>{" "}
                    – First-line treatment.
                </Text>
                <Text style={styles.bulletItem}>
                    •{" "}
                    <Text style={styles.bold}>
                        Cephalosporins or Macrolides
                    </Text>{" "}
                    – For those allergic to penicillin.
                </Text>
            </View>
            <Text style={styles.text}>
                It is essential to{" "}
                <Text style={styles.bold}>
                    complete the full course of antibiotics
                </Text>{" "}
                even if symptoms improve early. This prevents complications and
                reduces the risk of{" "}
                <Text style={styles.bold}>rheumatic fever</Text> or{" "}
                <Text style={styles.bold}>kidney inflammation</Text>.
            </Text>

            {/* Section: Home Remedies */}
            <Text style={styles.subHeader}>
                🏠 Home Care and Symptom Relief
            </Text>
            <Text style={styles.text}>
                In addition to antibiotics, these measures can{" "}
                <Text style={styles.bold}>ease discomfort</Text> and support
                recovery:
            </Text>
            <View style={styles.bulletList}>
                <Text style={styles.bulletItem}>
                    • Drink warm fluids (tea, broth, honey water).
                </Text>
                <Text style={styles.bulletItem}>
                    • Gargle with warm salt water.
                </Text>
                <Text style={styles.bulletItem}>
                    • Use throat lozenges or hard candies.
                </Text>
                <Text style={styles.bulletItem}>
                    • Take over-the-counter pain relievers (ibuprofen,
                    acetaminophen).
                </Text>
                <Text style={styles.bulletItem}>
                    • Rest and avoid strenuous activities.
                </Text>
            </View>

            {/* Section: Prevention */}
            <Text style={styles.subHeader}>🛡️ How to Prevent Strep Throat</Text>
            <Text style={styles.text}>
                Strep throat is contagious, but you can reduce the risk by
                following{" "}
                <Text style={styles.bold}>proper hygiene practices</Text>:
            </Text>
            <View style={styles.bulletList}>
                <Text style={styles.bulletItem}>
                    • Wash hands frequently with soap and water.
                </Text>
                <Text style={styles.bulletItem}>
                    • Avoid sharing eating utensils, drinks, or personal items.
                </Text>
                <Text style={styles.bulletItem}>
                    • Cover mouth when coughing or sneezing.
                </Text>
                <Text style={styles.bulletItem}>
                    • Clean and disinfect commonly touched surfaces.
                </Text>
                <Text style={styles.bulletItem}>
                    • Stay home if experiencing symptoms to prevent spreading
                    the infection.
                </Text>
            </View>

            {/* Final Message */}
            <Text style={styles.footer}>
                If you suspect <Text style={styles.bold}>strep throat</Text>,
                seek medical attention for diagnosis and treatment. Proper care
                helps prevent complications and ensures a{" "}
                <Text style={styles.bold}>faster recovery</Text>.
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f8f9fa",
    },
    header: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#007AFF",
    },
    subHeader: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
    },
    text: {
        fontSize: 16,
        marginBottom: 15,
        lineHeight: 24,
        color: "#555",
    },
    bulletList: {
        marginLeft: 10,
        marginBottom: 15,
    },
    bulletItem: {
        fontSize: 16,
        lineHeight: 24,
        color: "#444",
    },
    footer: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 20,
        color: "#28a745",
    },
    bold: {
        fontWeight: "bold",
    },
});

export default LearningScreen;

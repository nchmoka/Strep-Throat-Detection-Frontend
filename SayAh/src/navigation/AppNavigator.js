import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OnboardingScreen from "../screens/OnboardingScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import CaptureScreen from "../screens/CaptureScreen";
import ResultScreen from "../screens/ResultScreen";
import HistoryScreen from "../screens/HistoryScreen";
import FAQScreen from "../screens/FAQScreen";
import SettingsScreen from "../screens/SettingsScreen";
import LearningScreen from "../screens/LearningScreen";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Bottom Tabs for Main App
const MainTabs = () => (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
            name="Capture"
            component={CaptureScreen}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="camera" color={color} size={size} />
                ),
            }}
        />
        <Tab.Screen
            name="History"
            component={HistoryScreen}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="time" color={color} size={size} />
                ),
            }}
        />
    </Tab.Navigator>
);

// Main Stack (Tabs + Additional Screens)
const MainStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="Result" component={ResultScreen} />
    </Stack.Navigator>
);

// Drawer Navigation for Additional Screens
const DrawerNavigator = () => (
    <Drawer.Navigator>
        <Drawer.Screen name="Home" component={MainStack} />
        <Drawer.Screen name="FAQ" component={FAQScreen} />
        <Drawer.Screen name="Learning" component={LearningScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
);

// Authentication Flow (Login & Register)
const AuthStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
);

// Root Navigation
const AppNavigator = () => {
    const [hasSeenOnboarding, setHasSeenOnboarding] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkOnboardingStatus = async () => {
            const onboardingStatus = await AsyncStorage.getItem(
                "hasSeenOnboarding"
            );
            setHasSeenOnboarding(onboardingStatus === "true");
            setLoading(false);
        };

        checkOnboardingStatus();
    }, []);

    if (loading) return null; // Prevent UI flickering

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!hasSeenOnboarding && (
                    <Stack.Screen
                        name="Onboarding"
                        component={OnboardingScreen}
                    />
                )}
                <Stack.Screen name="Auth" component={AuthStack} />
                <Stack.Screen name="Main" component={DrawerNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;

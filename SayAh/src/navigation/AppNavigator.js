import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import OnboardingScreen from "../screens/OnboardingScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import CaptureScreen from "../screens/CaptureScreen";
import ResultScreen from "../screens/ResultScreen";
import HistoryScreen from "../screens/HistoryScreen";
import FAQScreen from "../screens/FAQScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const MainTabs = () => {
    return (
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
};

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={MainTabs} />
            <Drawer.Screen name="Results" component={ResultScreen} />
            <Drawer.Screen name="FAQ" component={FAQScreen} />
            <Drawer.Screen name="Settings" component={SettingsScreen} />
        </Drawer.Navigator>
    );
};

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="OnboardingScreen"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen
                    name="OnboardingScreen"
                    component={OnboardingScreen}
                />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen
                    name="RegisterScreen"
                    component={RegisterScreen}
                />
                <Stack.Screen name="Main" component={DrawerNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;

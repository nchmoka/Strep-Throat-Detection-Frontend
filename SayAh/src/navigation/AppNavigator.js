import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import AnalyzeScreen from "../screens/AnalyzeScreen";
import ResourcesScreen from "../screens/ResourcesScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Analyze" component={AnalyzeScreen} />
            <Stack.Screen name="Resources" component={ResourcesScreen} />
        </Stack.Navigator>
    );
}

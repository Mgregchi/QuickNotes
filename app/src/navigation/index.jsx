import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
// import DetailScreen from "../screens/DetailScreen";
// import SettingsScreen from "../screens/SettingsScreen";

import { Text } from "react-native-paper";

const DetailScreen = () => {
    return (
        <Text>Home</Text>
    )
}
const SettingsScreen = () => {
    return (
        <Text>Home</Text>
    )
}

const Stack = createNativeStackNavigator();
export default function Navigation() {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="DetailScreen"
                    component={DetailScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SettingsScreen"
                    component={SettingsScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

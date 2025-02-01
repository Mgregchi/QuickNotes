import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import DetailScreen from "../screens/DetailScreen";

const Stack = createNativeStackNavigator();

export default function Navigation() {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{ headerShown: false }} // Show Appbar on this screen
                />

                <Stack.Screen
                    name="DetailScreen"
                    component={DetailScreen}
                    options={{ headerShown: false }} // Show header for detail screen
                />

                <Stack.Screen
                    name="ProfileScreen"
                    component={ProfileScreen}
                    options={{ headerShown: false }} // Show header for detail screen
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

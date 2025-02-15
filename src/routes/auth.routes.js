import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/Login/login";

const AuthenticationRoutesStack = createNativeStackNavigator()

export default function AuthRoutes() {

    return (
        <AuthenticationRoutesStack.Navigator>
            <AuthenticationRoutesStack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        </AuthenticationRoutesStack.Navigator>
    )
}
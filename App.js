import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";
import { StatusBar } from "react-native";
import AuthProvider from "./src/context/auth.context";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor={'#000000DB'} barStyle={"light-content"} translucent={false} />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  )
}
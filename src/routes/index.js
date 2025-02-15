import React, { useContext } from "react";
import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";
import { ActivityIndicator, View } from "react-native";

import { AuthContext } from "../context/auth.context";

export default function Routes() {

    const { signed, loading } = useContext(AuthContext)

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", backgroundColor: '#000000DB' }}>
                <ActivityIndicator size={75} color={'#c9c3c3'} />
            </View>
        )
    }
    return (
        signed ? <AppRoutes /> : <AuthRoutes />
    )
}
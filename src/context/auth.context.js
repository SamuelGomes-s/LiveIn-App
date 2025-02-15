import React, { createContext, useEffect, useState } from "react";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

    const [loadingAuth, setLoadingAuth] = useState(false)
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        async function loadStorage() {
            const storageUserApp = await AsyncStorage.getItem('@userApp')
            if (storageUserApp) {
                setUser(JSON.parse(storageUserApp))
                setLoading(false)
            }
            setLoading(false)
        }
        loadStorage()
    }, [])

    async function signUp(email, password, name) {
        setLoadingAuth(true)
        await auth().createUserWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid = value.user.uid;
                await firestore().collection('users').doc(uid).set({
                    name: name,
                    createdAt: new Date(),
                })
                    .then(() => {
                        let data = {
                            uid: uid,
                            name: name,
                            email: value.user.email
                        }
                        setUser(data)
                        storageUser(data)
                        setLoadingAuth(false)
                    })
                    .catch((error) => {
                        console.log(error)
                        setLoadingAuth(false)
                    })
            })
    }

    async function signIn(email, password,) {
        setLoadingAuth(true)
        await auth().signInWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid = value.user.uid;
                const userProfile = await firestore().collection('users').doc(uid).get()
                let data = {
                    uid: uid,
                    name: userProfile.data().name,
                    email: value.user.email
                }
                setUser(data)
                storageUser(data)
                setLoadingAuth(false)
            })
            .catch((error) => {
                setLoadingAuth(false)
                console.log(error)
            })
    }

    async function signOut() {
        await auth().signOut()
        await AsyncStorage.clear().then(() => {
            setUser(null)
        })
    }

    async function storageUser(data) {
        try {
            await AsyncStorage.setItem('@userApp', JSON.stringify(data))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AuthContext.Provider
            value={{
                signed: !!user,
                signUp,
                signIn,
                loadingAuth,
                loading,
                signOut,
                user,
                setUser,
                storageUser
            }}>
            {children}
        </AuthContext.Provider>
    )

}
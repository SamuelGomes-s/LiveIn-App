import React, { useState, useContext } from "react";
import {
    Background,
    ContentTitle,
    TitleApp,
    SubmmitButton,
    SubmmitText,
    AccountButton,
    AccountButtonText,
    AccountInput,
    ContentAccount
} from "../../styles/auth.styles";
import { AuthContext } from "../../context/auth.context";
import { ActivityIndicator } from "react-native";

export default function Login() {

    const { signUp, signIn, loadingAuth } = useContext(AuthContext)
    const [login, setLogin] = useState(true)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function toggleLogin() {
        setName('')
        setEmail('')
        setPassword('')
        setLogin(!login)
    }

    async function handleSignIn() {
        if (email === ' ' || password === '') {
            alert("Preencha todos os campos")
            return
        }
        await signIn(email, password)
    }

    async function handleSignUp() {
        if (email === ' ' || password === '' || name === '') {
            alert("Preencha todos os campos")
            return
        }
        await signUp(email, password, name)
    }

    if (login) {
        return (
            <Background>
                <ContentTitle>
                    <TitleApp color={"#dff6d8"}>Live</TitleApp>
                    <TitleApp color={"#27ebb3"}>IN</TitleApp>
                </ContentTitle>
                <ContentAccount>
                    <AccountInput
                        placeholder="email@email.com"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                </ContentAccount>
                <ContentAccount>
                    <AccountInput
                        placeholder="**********"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                </ContentAccount>
                <SubmmitButton onPress={handleSignIn}>
                    {loadingAuth ? (<ActivityIndicator size={20} color={"#fff"} />) : (<SubmmitText> Acessar </SubmmitText>)}
                </SubmmitButton>
                <AccountButton onPress={toggleLogin} >
                    <AccountButtonText> Criar uma conta</AccountButtonText>
                </AccountButton>
            </Background>
        )
    }

    return (
        <Background>
            <ContentTitle>
                <TitleApp color={"#dff6d8"}>Live</TitleApp>
                <TitleApp color={"#27ebb3"}>IN</TitleApp>
            </ContentTitle>
            <ContentAccount>
                <AccountInput
                    placeholder="Nome"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
            </ContentAccount>
            <ContentAccount>
                <AccountInput
                    placeholder="email@email.com"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
            </ContentAccount>
            <ContentAccount>
                <AccountInput
                    placeholder="**********"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
            </ContentAccount>
            <SubmmitButton onPress={handleSignUp}>
                {loadingAuth ? (
                    <ActivityIndicator size={20} color={"#fff"} />
                ) : (
                    <SubmmitText> Cadastrar </SubmmitText>)
                }
            </SubmmitButton>
            <AccountButton onPress={toggleLogin}>
                <AccountButtonText> já possuo uma conta</AccountButtonText>
            </AccountButton>
        </Background>
    )
}
import { useNavigation } from "@react-navigation/native";
import React from "react";
import styled from "styled-components/native";

export default function UserSearchList({ data }) {

    const navigation = useNavigation()

    return (
        <Contaneir activeOpacity={0.6} onPress={() => navigation.navigate('PostUser', { title: data.name, userId: data.id })}>
            <NameUser> {data.name}</NameUser>
        </Contaneir>
    )
}

const Contaneir = styled.TouchableOpacity`
    width: 90%;
    height: 55px;
    margin-left: 5%;
    margin-right: 5%;
    border-radius: 8px;
    margin-top: 5%;
    align-items:center;
    flex-direction: row;
    background-color: #127774;
    padding:5px 15px;
`;

const NameUser = styled.Text`
    font-size: 18px;
    color: #fff;
`;

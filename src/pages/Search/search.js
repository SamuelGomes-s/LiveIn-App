import { Background, Contaneir, AreaInput, Input, ListUsers } from "../../styles/search.styles";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React, { useState, useEffect } from "react";
import firestore from '@react-native-firebase/firestore'
import UserSearchList from "../../components/UserSearchList/userSearchList";

export default function Search() {

    const [searchInput, setSearchInput] = useState()
    const [users, setUsers] = useState([])

    useEffect(() => {
        if (searchInput === '' || searchInput === undefined) {
            setUsers([])
            return
        }
        const subScriber = firestore().collection('users')
            .where('name', '>=', searchInput)
            .where('name', '<=', searchInput + "\uf8ff")
            .onSnapshot(snapshot => {
                const listUsers = []
                snapshot.forEach(doc => {
                    listUsers.push({
                        ...doc.data(),
                        id: doc.id
                    })
                }
                )
                setUsers(listUsers)
            })
        return () => subScriber()
    }, [searchInput])

    return (
        <Background>
            <Contaneir>
                <AreaInput>
                    <MaterialIcons name='search' color={'#f00'} size={30} />
                    <Input
                        placeholder="Procurando alguem?"
                        value={searchInput}
                        onChangeText={(text) => setSearchInput(text)}
                        placeholderTextColor={'#000'}
                    />
                </AreaInput>
                <ListUsers
                    data={users}
                    renderItem={({ item }) => <UserSearchList data={item} />}
                />
            </Contaneir>
        </Background>
    )
}
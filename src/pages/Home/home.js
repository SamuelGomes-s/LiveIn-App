import React, { useCallback, useContext, useState } from "react";
import Header from "../../components/Header/header";
import { Background, ButtonPost, PostsUsers } from "../../styles/home.styles";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ActivityIndicator, View } from "react-native";
import { AuthContext } from "../../context/auth.context";
import firestore from "@react-native-firebase/firestore";
import PostList from "../../components/PostList/postList";

export default function Home() {

    const { user } = useContext(AuthContext)
    const navigation = useNavigation()
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadingRefresh, setLoadingRefresh] = useState(false)
    const [lastItem, setLastItem] = useState('');
    const [emptyList, setEmptyList] = useState(false);

    useFocusEffect(
        useCallback(() => {
            let isActive = true;
            function fetchPosts() {
                firestore().collection('posts').orderBy('created', 'desc').limit(5).get().then((snapshot) => {
                    if (isActive) {
                        setPosts([])
                        const postList = [];
                        snapshot.docs.map(u => {
                            postList.push({
                                ...u.data(),
                                id: u.id,
                            })
                        })
                        setEmptyList(!!snapshot.empty)
                        setPosts(postList)
                        setLastItem(snapshot.docs[snapshot.docs.length - 1]) // ultimo post
                        setLoading(false)
                    }
                })
            }
            fetchPosts()
            return () => { isActive = false } //Desmontando o componente
        }, [])
    )

    async function handleRefreshPosts() {
        setLoadingRefresh(true)
        firestore().collection('posts').orderBy('created', 'desc').limit(5).get().then((snapshot) => {
            setPosts([])
            const postList = [];
            snapshot.docs.map(u => {
                postList.push({
                    ...u.data(),
                    id: u.id,
                })
            })
            setEmptyList(false)
            setPosts(postList)
            setLastItem(snapshot.docs[snapshot.docs.length - 1]) // ultimo post
            setLoading(false)
        })
        setLoadingRefresh(false)
    }

    async function getListPosts() {
        if (emptyList) {
            // se buscou toda  lista tiramos o loading.
            setLoading(false);
            return null;
        }
        if (loading) return;
        firestore().collection('posts')
            .orderBy('created', 'desc')
            .limit(5)
            .startAfter(lastItem)
            .get()
            .then((snapshot) => {
                const postList = [];
                snapshot.docs.map(u => {
                    postList.push({
                        ...u.data(),
                        id: u.id,
                    })
                })
                setEmptyList(!!snapshot.empty)
                setLastItem(snapshot.docs[snapshot.docs.length - 1])
                setPosts(oldPosts => [...oldPosts, ...postList]);
                setLoading(false);
            })
    }

    return (
        <Background>
            <Header />
            {loading ? (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size={75} color={'#c9c3c3'} />
                </View>
            ) : (
                <PostsUsers
                    data={posts}
                    renderItem={({ item }) => <PostList data={item} userId={user.uid} />}
                    showsVerticalScrollIndicator={false}
                    refreshing={loadingRefresh}
                    onRefresh={handleRefreshPosts}
                    onEndReached={() => getListPosts()}
                    onEndReachedThreshold={0.1}
                />
            )
            }
            <ButtonPost onPress={() => navigation.navigate('NewPost')}>
                <MaterialIcon name='draw' color={'#fff'} size={30} />
            </ButtonPost>
        </Background>
    )
}
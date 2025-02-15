import { ActivityIndicator, FlatList, View } from "react-native";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useContext, useLayoutEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import PostList from "../../components/PostList/postList";
import { AuthContext } from "../../context/auth.context";

export default function PostsUser() {

    const route = useRoute()
    const navigation = useNavigation()
    const [title, setTitle] = useState(route.params?.title)
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const { user } = useContext(AuthContext)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: title === '' ? '' : title
        })
    }, [navigation, title])

    useFocusEffect(
        useCallback(() => {
            let isActive = true;
            firestore()
                .collection('posts')
                .where('userId', '==', route.params?.userId)
                .orderBy('created', 'desc')
                .get()
                .then((snapshot) => {
                    const postList = [];
                    snapshot.docs.map(u => {
                        postList.push({
                            ...u.data(),
                            id: u.id
                        })
                    })
                    if (isActive) {
                        setPosts(postList);
                        setLoading(false);
                    }
                })
            return () => {
                isActive = false;
            }
        }, [])
    )

    return (
        <View style={{ flex: 1 }}>
            {loading ? (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size={75} color={'#c9c3c3'} />
                </View>)
                : (<FlatList
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1 }}
                    data={posts}
                    renderItem={({ item }) =>
                        <PostList data={item} userId={user.uid} />}
                />)}
        </View>
    )
}
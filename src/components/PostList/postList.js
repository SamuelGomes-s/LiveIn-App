import {
    Container,
    ContentText,
    AuthorPost,
    ImgPerfil,
    ContentAuthorInfo,
    LikeButton,
    TimePost,
    PostFooterInfo,
    Like,
    ContentPost
} from "../../styles/postList.styles"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState } from "react";
import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export default function PostList({ data, userId }) {

    const navigation = useNavigation()
    const [likePost, setLikesPost] = useState(data?.likes)

    async function handleLikePost(id, likes) {
        const docId = `${userId}_${id}`
        const doc = await firestore().collection('likes').doc(docId).get()
        if (doc.exists) {
            await firestore().collection('posts').doc(id).update({
                likes: likes - 1
            })
            await firestore().collection('likes').doc(docId).delete().then(() => {
                setLikesPost(likes - 1)
            })
            return
        }
        await firestore().collection('likes').doc(docId).set({
            postId: id,
            userId: userId
        })
        await firestore().collection('likes').doc(docId).update({
            likes: likes + 1
        }).then(() => {
            setLikesPost(likes + 1)
        })
    }

    function formatTimePost() {
        const datePost = new Date(data.created.seconds * 1000) // criando uma data
        return formatDistance(
            new Date(),
            datePost,
            { locale: ptBR }
        )
    }

    return (
        <Container>
            <ContentAuthorInfo onPress={() => navigation.navigate('PostUser', { title: data.autor, userId: data.userId })}>
                {data.avatarUrl ? (<ImgPerfil source={{ uri: data.avatarUrl }} />)
                    : <ImgPerfil source={require('../../assets/avatar.png')} />}
                <AuthorPost numberOfLines={1}> {data?.autor}</AuthorPost>
            </ContentAuthorInfo>
            <ContentPost>
                <ContentText>{data.content}</ContentText>
            </ContentPost>
            <PostFooterInfo>
                <LikeButton onPress={() => handleLikePost(data.id, likePost)}>
                    <Like>
                        {likePost === 0 ? '' : likePost}
                    </Like>
                    <MaterialCommunityIcons name={likePost === 0 ? 'heart-plus-outline' : "cards-heart"} color={'#f00'} size={20} />
                </LikeButton>
                <TimePost> {formatTimePost()}</TimePost>
            </PostFooterInfo>
        </Container>
    )

}
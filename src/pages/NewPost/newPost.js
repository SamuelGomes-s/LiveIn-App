import { useState, useLayoutEffect, useContext } from "react";
import { Background, InputPost, ButtonShare, ButtonShareText } from "../../styles/newPost.styles";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/auth.context";
import storage from "@react-native-firebase/storage";
import firestore from "@react-native-firebase/firestore";

export default function NewPost() {

    const { user } = useContext(AuthContext)
    const [postUser, setPostUser] = useState()
    const navigation = useNavigation()

    useLayoutEffect(() => {
        const options = navigation.setOptions({
            headerRight: () => (
                <ButtonShare onPress={() => handlePost()}>
                    <ButtonShareText> Compartilhar </ButtonShareText>
                </ButtonShare>
            )
        })
    }, [navigation, postUser])

    async function handlePost() {
        if (postUser === '') {
            return
        }
        let avatarUrl = null
        try {
            let response = await storage().ref('users').child(user.uid).getDownloadURL()
            avatarUrl = response
        } catch (error) {
            avatarUrl = null
            console.log("Erro ao tentar procurar o avatar ", error)
        }
        await firestore().collection('posts')
            .add({
                created: new Date(),
                avatarUrl: avatarUrl,
                content: postUser,
                autor: user?.name,
                userId: user?.uid,
                likes: 0,
            }).then(() => {
                setPostUser('')
            }).catch((error) => { console.log(error) })
        navigation.goBack()
    }

    return (
        <Background>
            <InputPost
                value={postUser}
                onChangeText={(text) => setPostUser(text)}
                placeholder="Oque está acontecendo?"
                autoCorrect={false}
                multiline={true}
                placeholderTextColor={'#dddd'}
                maxLength={300}
            />
        </Background>
    )
}


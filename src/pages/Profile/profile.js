import { AuthContext } from "../../context/auth.context";
import { useContext, useEffect, useState } from "react";
import {
    Background,
    Container,
    SignOutButton,
    AvatarImg,
    SignOutText,
    UserName,
    UserEmail,
    UpdateProfileButton,
    UpdateProfileText,
    ProfileModal,
    ModalContainer,
    UploadButton,
    UploadText,
    ButtonBack,
    ButtonBackText,
    NameUpdateInput,
} from "../../styles/profile.styles";
import Header from "../../components/Header/header";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons"
import firestore from "@react-native-firebase/firestore";
import { launchImageLibrary } from "react-native-image-picker";
import storage from "@react-native-firebase/storage";

export default function Profile() {

    const { signOut, user, setUser, storageUser } = useContext(AuthContext)
    const [modalVisible, setModalVisible] = useState(false)
    const [name, setName] = useState(user?.name)
    const [url, setUrl] = useState(null)

    useEffect(() => {
        async function loadAvatar() {
            try {
                let response = await storage().ref('users').child(user?.uid).getDownloadURL()
                setUrl(response)
            } catch (error) {
                console.log(error)
            }
        }
        loadAvatar()
        return () => loadAvatar()
    }, [])

    async function handleSignOut() {
        await signOut()
    }

    async function updateProfile() {
        if (name === '') {
            return
        }
        await firestore().collection('users').doc(user?.uid).update({
            name: name
        })
        const postDocs = await firestore().collection('posts').where('userId', "==", user?.uid).get()
        postDocs.forEach(async doc => {
            await firestore().collection('posts').doc(doc.id).update({
                autor: name
            })
        })
        let data = {
            uid: user.uid,
            name: name,
            email: user.email
        }
        setUser(data)
        storageUser(data)
        setModalVisible(false)
    }

    function updateFile() {
        const options = {
            noData: true,
            mediaType: 'photo'
        }
        launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('Solicitação cancelada!')
            } else if (response.error) {
                console.log('Deu algum erro!')
            } else {
                updateAvatarStorage(response).then(() => {
                    updateAvatarPosts()
                })
                setUrl(response.assets[0].uri)
            }
        })
    }

    function getFileLocalPatch(response) {
        return response.assets[0].uri
    }

    async function updateAvatarStorage(response) {
        const fileSource = getFileLocalPatch(response)
        const storageRef = storage().ref('users').child(user?.uid)
        return storageRef.putFile(fileSource)
    }

    async function updateAvatarPosts() {
        const storageRef = storage().ref('users').child(user?.uid)
        const url = await storageRef.getDownloadURL().then(async (image) => {
            const postDocs = await firestore().collection('posts').where('userId', "==", user.uid).get()
            postDocs.forEach(async doc => {
                await firestore().collection('posts').doc(doc.id).update({
                    avatarUrl: image
                })
            })
        }).catch((error) => {
            console.log("Erro ao atualizar avatar ", error)
        })
    }


    return (
        <Background>
            <Header />
            <Container>
                {url ? (<UploadButton onPress={() => updateFile()}>
                    <UploadText> + </UploadText>
                    <AvatarImg
                        source={{ uri: url }}
                    />
                </UploadButton>) : (<UploadButton onPress={() => updateFile()} >
                    <UploadText> + </UploadText>
                </UploadButton>
                )}
                <UserName numberOfLines={1}> {user.name} </UserName>
                <UserEmail numberOfLines={1}> {user.email} </UserEmail>
                <UpdateProfileButton onPress={() => setModalVisible(true)}>
                    <UpdateProfileText> Atualizar perfil</UpdateProfileText>
                </UpdateProfileButton>
                <SignOutButton onPress={handleSignOut}>
                    <SignOutText> Sair </SignOutText>
                </SignOutButton>
            </Container>
            <ProfileModal animationType="slide" transparent={true} visible={modalVisible}>
                <ModalContainer>
                    <ButtonBack onPress={() => setModalVisible(false)}>
                        <MaterialIcons name='arrow-left' color={'#000'} size={25} />
                        <ButtonBackText> Voltar</ButtonBackText>
                    </ButtonBack>
                    <NameUpdateInput
                        placeholder={user?.name}
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                    <UpdateProfileButton onPress={updateProfile}>
                        <UpdateProfileText>
                            Salvar
                        </UpdateProfileText>
                    </UpdateProfileButton>
                </ModalContainer>
            </ProfileModal>
        </Background>
    )
}

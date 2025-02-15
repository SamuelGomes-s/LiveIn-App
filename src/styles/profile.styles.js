import styled from "styled-components/native";

const Background = styled.View`
    flex: 1;
    background-color: #000000DB;
    border-bottom-width: 1px;
    border-color: #fff;
`;

const Container = styled.View`
    flex: 1;
    align-items: center;
`;

const UploadButton = styled.TouchableOpacity`
    margin-top: 20%;
    width: 165px;
    height: 165px;
    border-radius: 90px;
    background-color: #fff;
    justify-content: center;
    align-items: center;
    z-index: 9;
`;

const UploadText = styled.Text`
    font-size: 40px;
    color: #e52200;
    opacity: 0.6;
    position: absolute;
    z-index: 99;
`;

const AvatarImg = styled.Image`
    width: 160px;
    height: 160px;
    border-radius: 80px;
`;

const UserName = styled.Text`
    font-size: 25px;
    font-weight: bold;
    padding: 5px;
    color: #fff;
`;

const UserEmail = styled.Text`
    font-size: 18px;
    color: #fff;
    padding-bottom: 5px;
`;

const SignOutButton = styled.TouchableOpacity`
    width: 90%;
    height: 55px;
    background-color: #e7e7e7;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    margin-top: 15px;
`;

const UpdateProfileButton = styled.TouchableOpacity`
    width: 90%;
    height: 55px;
    background-color: #2C2CE4D6;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    margin-top: 15px;
`;

const SignOutText = styled.Text`
    font-size: 18px;
    color: #000;
    font-weight: bold;
`;

const UpdateProfileText = styled.Text`
    font-size: 18px;
    color: #fff;
    font-weight: bold;
`;

const ProfileModal = styled.Modal`
`;

const ModalContainer = styled.View`
    width: 100%;
    height: 58%;
    bottom: 0;
    justify-content: center;
    align-items: center;
    position: absolute;
    background-color: #fff;
`;

const ButtonBack = styled.TouchableOpacity`
    width: 90%;
    height: 60px;
    flex-direction: row;
    align-items: center;
    position: absolute;
    top: 0;
`;

const ButtonBackText = styled.Text`
    color: #000;
    font-size: 18px;
`;

const NameUpdateInput = styled.TextInput`
    width: 90%;
    background-color: #e7e7e7;
    text-align: center;
    border-radius: 8px;
    color:#000;
    font-size: 20px;
`;

export {
    Background,
    Container,
    SignOutButton,
    AvatarImg,
    SignOutText,
    UserName,
    UserEmail,
    UpdateProfileText,
    UpdateProfileButton,
    ProfileModal,
    ModalContainer,
    UploadButton,
    UploadText,
    ButtonBack,
    ButtonBackText,
    NameUpdateInput,
}
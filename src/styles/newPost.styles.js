import styled from "styled-components/native";

const Background = styled.View`
    flex: 1;
    background-color: #000000DB;
`;

const InputPost = styled.TextInput`
    background-color: transparent;
    font-size: 23px;
    margin: 10px;
    padding: 15px;
    color: #fff;
`;

const ButtonShare = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    padding: 7px 12px;
    background-color: #2C2CE4D6;
    border-radius: 8px;
`;

const ButtonShareText = styled.Text`
color: #fff;
`;

export {
    Background,
    InputPost,
    ButtonShare,
    ButtonShareText
}
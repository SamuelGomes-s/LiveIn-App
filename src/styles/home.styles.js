import styled from "styled-components/native";

const Background = styled.View`
    flex: 1;
    background-color: #000000DB;
`;

const ButtonPost = styled.TouchableOpacity`
    position: absolute;
    z-index: 99;
    bottom: 5%;
    right: 6%;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    background-color: #2C2CE4D6;
    border-radius: 30px;
`;

const PostsUsers = styled.FlatList`
    flex:  1;
    background-color: #f001;
`;

export {
    Background,
    ButtonPost,
    PostsUsers
}

import styled from "styled-components/native";

const Container = styled.View`
    margin-right: 3%;
    margin-left: 3%;
    margin-top: 2%;
    margin-bottom: 2%;
    background-color: #fff;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 1px 1px 3px rgba(18,18,18,0.2);
`;

const ContentText = styled.Text`
    text-align: justify;
    color: #000;
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 15px;
    padding:10px;
`;

const ContentPost = styled.View`
`;

const AuthorPost = styled.Text`
    font-size: 18px;
    color: #000;
    padding-left: 5px;
`;

const ImgPerfil = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 20px;
`;

const ContentAuthorInfo = styled.TouchableOpacity`
    margin-bottom: 5px;
    flex-direction: row;
    align-items: center;  
`;

const PostFooterInfo = styled.View`
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;  
`;

const LikeButton = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;

const TimePost = styled.Text``;

const Like = styled.Text`
    margin-right: 3px;
    font-size: 16px;
    color: #f00;
`;

export {
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
}
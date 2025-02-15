import styled from "styled-components/native";

const Background = styled.View`
    flex:1;
    background-color:  #000000DB;
    border-bottom-width: 1px ;
    border-color: #fff;
`;

const Contaneir = styled.View`
`;

const AreaInput = styled.View`
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
    border-radius: 8px;
    margin-top: 10%;
    align-items:center;
    flex-direction: row;
    background-color: #fff;
    padding:5px 15px;
`;

const Input = styled.TextInput`
    font-size: 18px;
    width: 90%;
    color: #000;
    padding-left: 10px;
`;

const ListUsers = styled.FlatList``;

export {
    Background,
    Contaneir,
    AreaInput,
    Input,
    ListUsers
}
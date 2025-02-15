import styled from "styled-components/native";

const Background = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
    background-color:rgba(0, 0, 0, 0.86);   
`;

const ContentTitle = styled.View`
    flex-direction: row;
`;

const TitleApp = styled.Text` 
    color:  ${(props) => props.color};
    font-size: 50px;
    margin-bottom: 40px;
`;

const SubmmitButton = styled.TouchableOpacity`
    width: 90%;
    height: 45px;
    justify-content: center;
    align-items: center;
    margin-left: 5%;
    margin-right: 5%;
    background-color: #2C2CE4D6;  
    margin-bottom: 15px;
    border-radius: 8px;
`;

const SubmmitText = styled.Text`
    padding:5px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
`;

const AccountButton = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
`;

const AccountButtonText = styled.Text`
    font-weight: bold;
    color: #c9c3c3;
`;

const AccountInput = styled.TextInput`
    font-weight: 500;  
    width: 90%;
    height: 45px;
    margin-left: 5%;
    margin-right: 5%;
    margin-bottom: 15px;
    border-radius: 8px;
    background-color: #fff;
    justify-content: center;
    align-items: center;
    padding-left: 10px;
    font-size: 18px;
    color: #000;
`;

const ContentAccount = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export {
    Background,
    TitleApp,
    SubmmitButton,
    SubmmitText,
    AccountButton,
    AccountButtonText,
    AccountInput,
    ContentAccount,
    ContentTitle
}
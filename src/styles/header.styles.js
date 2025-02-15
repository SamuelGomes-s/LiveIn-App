import styled from "styled-components/native";

const ContainerHeader = styled.View`
    
    justify-content: center;
    align-items: center;
    height: 65px;
    background-color:transparent;
    border-bottom-width: 1px;
    border-color: #c9c3c3;
`;

const ContentTitle = styled.View`
    flex-direction: row;
`;

const TitleApp = styled.Text` 
    color:  ${(props) => props.color};
    font-size: 22px;
`;

export{
    ContainerHeader,
    ContentTitle,
    TitleApp
}
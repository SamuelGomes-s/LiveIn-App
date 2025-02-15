import { ContainerHeader, ContentTitle, TitleApp } from "../../styles/header.styles";

export default function Header() {
    return (
        <ContainerHeader>
            <ContentTitle>
                <TitleApp color={"#dff6d8"}>Live</TitleApp>
                <TitleApp color={"#27ebb3"}>IN</TitleApp>
            </ContentTitle>
        </ContainerHeader>
    )
}
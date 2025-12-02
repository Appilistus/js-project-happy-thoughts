import { styled } from "styled-components";
import { Paragraph } from "../styling/typography.js";

type Props = {
    text: string;
}

export const Footer = ({text}:Props) => {
    return (
        <FooterSection>
            <FooterText>{text}</FooterText>
        </FooterSection>
    )
}

const FooterSection = styled.footer`
    padding: 20px 0;
    background-color: #ffadad;
    position: absolute;
    bottom: 0;
    width: 100%;
`
const FooterText = styled(Paragraph)`
    display: flex;
    align-items: center;
    justify-content: center;
`
import { styled } from "styled-components";
import { Heading1 } from "../styling/typography.js";

type Props = {
    text: string;
}

export const Hero = ({ text }: Props) => {
    return (
        <HeroSection>
            <Heading1>{text}</Heading1>
        </HeroSection>
    )
}

const HeroSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
`
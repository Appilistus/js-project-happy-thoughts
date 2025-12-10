import { styled } from "styled-components";
import { AnimatedTitle } from "../../styling/animatedTitle.jsx";

type Props = {
    text: string;
}

export const Hero = ({ text }: Props) => {
    return (
        <HeaderSection>
            <AnimatedTitle text={text} />
        </HeaderSection>
    )
}

const HeaderSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
`
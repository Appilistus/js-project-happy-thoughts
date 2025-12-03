import styled, { keyframes } from "styled-components"

export const AnimatedTitle = ({ text }) => {
    return (
        <Title>
            {text.split("").map((char, index) => (
                <Letter 
                    key={index}
                    delay={index}
                >
                    {char === " " ? "\u00A0" : char}
                </Letter>
            ))}
        </Title>
    )
}

const bounce = keyframes`
0% { transform: translateY(0); }
20% { transform: translateY(-10px); }
40% { transform: translateY(0); }
80% { transform: translateY(0); }
100% { transform: translateY(0); }
`

const Title = styled.h1`
    font-size: 48px;
    font-weight: 700;
    display: flex;
    gap: 2px;
    justify-content: center;
    margin: 0;

    @media ${({ theme }) => theme.breakpoints.mobile} {
        font-size: 32px;
    }
`

const Letter = styled.span`
    display: inline-block;
    animation: ${bounce} 1.3s ease-in-out infinite;
    animation-delay: ${({ delay }) => delay * 0.05}s;
`
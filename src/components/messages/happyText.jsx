import styled from "styled-components"

export const HappyText = ({ text }) => {
    return (
        <StyledText>{text}</StyledText>
    )
}

const StyledText = styled.p`
    white-space: normal;
    overflow-wrap: break-word;
    word-break: break-word;
    line-height: 1.5;
`
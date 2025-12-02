import styled from "styled-components";

export const SubmitButton = () => {
    return (
        <StyledButton type="submit">
            ❤️ Send Happy Thought ❤️
        </StyledButton>
    )
}

const StyledButton = styled.button`
    background-color: ${({ theme }) => theme.colors.primary};
    border: none;
    border-radius: 50px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    
    &:hover {
        background-color:${({ theme }) => theme.colors.secondary};
    }
`
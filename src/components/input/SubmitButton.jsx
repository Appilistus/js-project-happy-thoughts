import styled from "styled-components";

export const SubmitButton = ( textInput ) => {
    return (
        <StyledButton 
            type="submit"
            disabled={textInput.length === 0 || textInput.length > 140}
        >
            ❤️ Send Happy Thought ❤️
        </StyledButton>
    )
}

const StyledButton = styled.button`
    background-color: ${({ theme }) => theme.colors.primary};
    border: none;
    border-radius: 50px;
    width: 50%;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    
    &:hover {
        background-color:${({ theme }) => theme.colors.secondary};
    }

    @media ${({ theme }) => theme.breakpoints.mobile} {
        width: 100%;
    }   
`
import styled from "styled-components"
import { Title } from "./InputTitle.jsx"
import { InputForm } from "./InputForm.jsx"

export const InputCard = ({onSubmit}) => {
    return (
        <InputCardSection>
            <StyledInputCard>
                <Title />

                <InputForm onSubmit={onSubmit} />

            </StyledInputCard>
        </InputCardSection>
    )
}

const InputCardSection = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
`

const StyledInputCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border: 2px solid ${({ theme }) => theme.colors.border };
    width: 50%;
    height: auto;
    padding: 20px;
    background-color: ${({ theme }) => theme.colors.formBackground };
    box-shadow: 7px 7px ${({ theme }) => theme.colors.border };

    @media ${({ theme }) => theme.breakpoints.mobile} {
        width: 90%;
    }   

    @media ${({ theme }) => theme.breakpoints.tablet} {
        width: 70%;
    }  
`
import styled from "styled-components"
import { InputForm } from "./InputForm.jsx"

export const InputCard = ({onSubmit}) => {
    return (
        <InputCardSection>
            <StyledInputCard>
                <p>What's making you happy right now?</p>

                <InputForm onSubmit={onSubmit} />

            </StyledInputCard>
        </InputCardSection>
    )
}

const InputCardSection = styled.section`
    /* width: 100%; */
`

const StyledInputCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border: 2px solid ${({ theme }) => theme.colors.border };
    height: auto;
    padding: 20px;
    background-color: ${({ theme }) => theme.colors.formBackground };
    box-shadow: 7px 7px ${({ theme }) => theme.colors.border };
`

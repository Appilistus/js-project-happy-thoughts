import styled from "styled-components"
import { Title } from "./inputTitle.jsx"
import { InputForm } from "./inputForm.jsx"

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
    border: 2px solid #000000;
    width: 50%;
    height: auto;
    padding: 20px;
    background-color: #f2f0f0;
    box-shadow: 7px 7px #1a1a1a;

    @media ${({ theme }) => theme.breakpoints.mobile} {
        width: 90%;
    }   

    @media ${({ theme }) => theme.breakpoints.tablet} {
        width: 70%;
    }  
`
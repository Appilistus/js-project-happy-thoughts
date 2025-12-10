import { useState } from "react"
import styled, { useTheme } from "styled-components"
import { SubmitButton } from "./SubmitButton.jsx"


export const InputForm = ({ onSubmit }) => {
    const [textInput, setTextInput] = useState("")
    const theme = useTheme()

    const isValid = textInput.length >= 5 && textInput.length <= 140
    const showError = textInput.length > 0 && !isValid
    
    const handleSubmit = (event) => {
        event.preventDefault()
        if (!isValid) return

        onSubmit(textInput)
        setTextInput("") // Clear the input after submission
    }

    // Change color of character count based on length
    const getColor = () => {
        const length = textInput.length
        if (length >= 130) return theme.colors.inputLimit
        return theme.colors.text
    }

    return (
        <StyledForm onSubmit={handleSubmit}>
            <textarea
                onChange={event => setTextInput(event.target.value)}
                value={textInput}
                placeholder="React is making me happy!"
            />
                <StyledP style={{ color: getColor() }}>{textInput.length} / 140</StyledP>
                {showError && (
                    <ErrorText>
                        Message must be between 5 and 140 characters
                    </ErrorText>
                )}

            <SubmitButton type="submit" disabled={!isValid}/>
        </StyledForm>
    )
}

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 10px;
    width: 100%;
    height: 150px;

    textarea {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100%;
        padding: 5px 10px;
        border: 2px solid #ccc;
        border-radius: 5px;
        white-space: pre-wrap;
        word-wrap: break-word;
    }
`

const StyledP = styled.p`
    font-size: 12px;
    margin-bottom: 10px;
    padding: 0;
`
const ErrorText = styled.p`
    font-size: 12px;
    color: ${({ theme }) => theme.colors.inputLimit };
    margin-bottom: 10px;
`
import { useState } from "react"
import styled from "styled-components"
import { SubmitButton } from "./SubmitButton.jsx"


export const InputForm = ({ onSubmit }) => {
    const [textInput, setTextInput] = useState("")
    
    const handleSubmit = (event) => {
        event.preventDefault()
        if (textInput.trim() === "") return

        onSubmit(textInput)
        setTextInput("") // Clear the input after submission
    }

    return (
        <StyledForm onSubmit={handleSubmit}>
            <textarea
                onChange={event => setTextInput(event.target.value)}
                value={textInput}
                placeholder="React is making me happy!"
                maxLength={140}
            />
            <StyledP>{textInput.length} / 140</StyledP>
            <SubmitButton type="submit" />
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
    color: ${({ theme }) => theme.colors.textSecondary };
    margin-bottom: 10px;
    padding: 0;
`
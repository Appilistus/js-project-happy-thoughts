import { useState } from "react";
import styled from "styled-components";

export const InputForm = () => {
    const [textInput, setTextInput] = useState("")
    
    return (
        <StyledForm>
            <input
                type="text"
                onChange={event => setTextInput(event.target.value)}
                value={textInput}
                placeholder="React is making me happy!"
            />
        </StyledForm>
    )
}

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 10px;
    width: 100%;
    height: 100px;

    input {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100px;
        padding: 5px 10px;
        border: 2px solid #ccc;
        border-radius: 5px;
        margin-bottom: 15px;
    }
`
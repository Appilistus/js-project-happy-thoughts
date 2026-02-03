import { useState } from "react"
import styled from "styled-components"

const API_URL = import.meta.env.VITE_API_URL

export const SignupForm = ({ onSignupSuccess }) => {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSignup = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setIsSubmitting(true)

    try {
      const response = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password})
      })

      const data = await response.json()

      if(!response.ok) {
        throw new Error(data.message || "Signup failed")
      }
        setSuccess("Account created! Please log in")
        onSignupSuccess()

    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Form onSubmit={handleSignup}>
        <Label>
          <Input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)} />
        </Label>

        <Label>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </Label>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          aria-label="Sign up button"
        >
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </Button>

        {error && <ErrorText>{error}</ErrorText>}
        {success && <SuccessText>{success}</SuccessText>}
      </Form>
    </>
  )
}

const Form = styled.form`
  display: grid;
  gap: 8px;
`

const Label = styled.label`
  display: grid;
  gap: 6px;
`

const Input = styled.input`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border };
  background: ${({ theme }) => theme.colors.inputBackground };
  color: ${({ theme }) => theme.colors.text };

  &::placeholder {
    color: ${({ theme }) => theme.colors.placeholder };
  }
`

const Button = styled.button`
  padding: 10px;
  border-radius: 6px;
  border: none;
  background: ${({ theme }) => theme.colors.primary };
  color: ${({ theme }) => theme.colors.buttonText };
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;

  &:hover:enabled {
    background: ${({ theme }) => theme.colors.secondary };
  }
`

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.inputLimit };
`

const SuccessText = styled.p`
  color: ${({ theme }) => theme.colors.success };
`
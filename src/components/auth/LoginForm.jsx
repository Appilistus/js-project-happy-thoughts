import { useState } from "react"
import styled from "styled-components"

const API_URL = import.meta.env.VITE_API_URL

export const LoginForm = ({ onLoginSuccess}) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      const response= await fetch(`${API_URL}/users/login`, { 
        method: 'POST',
        body: JSON.stringify({ 
          email, 
          password 
        }),
        headers: {'Content-Type': 'application/json'},
      })

      const data = await response.json()
  
      if (!response.ok) {
        throw new Error("Login failed")
      }

      const token = data.response.accessToken
      const userId = data.response.id

      localStorage.setItem("token", token)
      localStorage.setItem("userid", userId)

      onLoginSuccess({ token, userId })

    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <Form onSubmit={handleLogin}>
      <Input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <Button
        type="submit"
        aria-label="Login button"
      >
        Login
      </Button>
      {error && <p>{error}</p>}
    </Form>
  )
}

const Form = styled.form`
  display: grid;
  gap: 8px;
`

const Input = styled.input`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.inputBackground};
  color: ${({ theme }) => theme.colors.text};

  &::placeholder {
    color: ${({ theme }) => theme.colors.placeholder};
  }
`

const Button = styled.button`
  padding: 10px;
  border-radius: 6px;
  border: none;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.buttonText};
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`
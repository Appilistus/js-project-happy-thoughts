import { useState } from "react"
import styled from "styled-components"

const API_URL = import.meta.env.VITE_API_URL

export const LoginForm = () => {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const response= await fetch(`${API_URL}/login`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          name, 
          password 
        })
      })

      const data = await response.json()
  
      if (!response.ok) {
        throw new Error("Login failed")
      }

      localStorage.setItem("token", data.token)
      localStorage.setItem("userid", data.userId)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <Form onSubmit={handleLogin}>
      <Input
        type="text"
        placeholder="Username"
        value={name}
        onChange={(e) => setName(e.target.value)}
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
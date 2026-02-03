import { useState } from "react"
import styled from "styled-components"
import { LoginForm } from "../components/auth/LoginForm.jsx"
import { SignupForm } from "../components/auth/SignupForm.jsx"

export const AuthPage = ({ onLoginSuccess}) => {
  const [mode, setMode] = useState("login") // "login" or "signup"

  return (
    <>
      <StyledSection>
        <Card>
          <Tabs>
            <TabBtn
              type="button"
              $active={mode === "login"}
              onClick={() => setMode("login")}
              aria-label="Login tab"
            >
              Login
            </TabBtn>
            <TabBtn
              type="button"
              $active={mode === "signup"}
              onClick={() => setMode("signup")}
              aria-label="Signup tab"
            >
              Sign Up
            </TabBtn>
          </Tabs>
          {mode === "login" ? (
            <LoginForm onLoginSuccess={onLoginSuccess} />
          ) : (
            <SignupForm onSignupSuccess={() => setMode("login")} />
          )}
        </Card>
      </StyledSection>
    </>
  )
}

const StyledSection = styled.section`
  display: grid;
  place-items: center;
  padding: 40px 16px;
`

const Card = styled.div`
  width: 520px;
  max-width: 100%;
  padding: 20px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.cardBackground };
`

const Tabs = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`

const TabBtn = styled.button`
  flex: 1;
  padding: 10px 12px;
  border-radius: 999px;
  border: 1px solid ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.border) };
  background-color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.background) };
  color: ${({ theme, $active }) => ($active ? theme.colors.background : theme.colors.text) };
  font-weight: bold;
  cursor: pointer;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary };
    color: ${({ theme }) => theme.colors.background };
  }
`
import { useState, useEffect } from "react"
import styled from "styled-components"

import { ThemeProvider } from "styled-components"
import { GlobalStyles } from "./styling/globalStyles.js"
import { theme } from "./styling/theme.js"
import { Header } from "./components/layout/Header.js"
import { Footer } from "./components/layout/Footer.js"
import { InputCard } from "./components/input/InputCard.jsx"
import { MessageList } from "./components/messages/MessageList.jsx"

export const App = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  // fetch messages from API
  useEffect(() => {
    fetch("https://happy-thoughts-api-4ful.onrender.com/thoughts")
    .then(res => res.json())
    .then(data => {
      setMessages(data)
      setLoading(false)
    })
  },[])

  // Post new message to API
  const addMessage = async (newText) => {
    const response = await fetch("https://happy-thoughts-api-4ful.onrender.com/thoughts", 
      {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ message: newText})
      }
    )

    const data = await response.json()

    setMessages(prev => [data, ...prev])
  }

  // Send like to API
  const increaseHeart = async (id) => {
    const message = messages.find(msg => msg._id === id)

    await fetch(
      `https://happy-thoughts-api-4ful.onrender.com/thoughts/${message._id}/like`,
      { method: "POST"}
    )

    const updated = messages.map(msg =>
      msg._id === id 
        ? { ...msg, hearts: msg.hearts + 1 } 
        : msg
    )
    setMessages(updated)
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
          <AppContainer>

            <Header text="Happy Thoughts"/>

                <InputCard onSubmit={addMessage} />

                {loading ? (
                  <LoadingWrapper>Loading Happy Thoughts...</LoadingWrapper>
                ) : (
                  <ScrollArea>
                    <MessageList 
                      messages={messages}
                      onLike={increaseHeart}
                    />
                  </ScrollArea>
                )}
                

            <Footer text="&copy; ❤️ Happy Thoughts ❤️"/>

          </AppContainer>
      </ThemeProvider>
    </>
  )
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.text };
`

const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
`
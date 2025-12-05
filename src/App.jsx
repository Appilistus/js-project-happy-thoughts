import { useState } from "react"
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

  const addMessage = (newText) => {
    const newMessage = {
      text: newText,
      hearts: 0,
      createdAt: Date.now(),
    }

    setMessages([newMessage, ...messages]) // Add new message on top of the list
  }

  const increaseHeart = (index) => {
    const updated = [...messages]
    updated[index].hearts += 1
    setMessages(updated)
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
          <AppContainer>

            <Header text="Happy Thoughts"/>

                <InputCard onSubmit={addMessage} />
                
                <ScrollArea>
                  <MessageList 
                    messages={messages}
                    onLike={increaseHeart}
                  />
                </ScrollArea>

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

const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
`
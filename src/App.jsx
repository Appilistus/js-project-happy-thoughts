import { useState } from "react"

import { ThemeProvider } from "styled-components"
import { GlobalStyles } from "./styling/globalStyles.js"
import { theme } from "./styling/theme.js"
import { Header } from "./components/header.js"
import { Footer } from "./components/footer.js"
import { InputCard } from "./components/input/inputCard.jsx"
import { MessageList } from "./components/messages/messageList.jsx"

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

          <Header text="Happy Thoughts"/>
        <main>

          <InputCard onSubmit={addMessage} />

          <MessageList 
            messages={messages}
            onLike={increaseHeart}
          />

        </main>
          <Footer text="Happy Thoughts by Asako"/>
      </ThemeProvider>
    </>
  )
}

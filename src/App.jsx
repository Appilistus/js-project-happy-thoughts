import { useState } from "react"

import { GlobalStyles } from "./styling/globalStyles.js"
import { theme } from "./styling/theme.js"
import { Header } from "./components/header.js"
import { Footer } from "./components/footer.js"
import { InputCard } from "./components/input/inputCard.jsx"
import { MessageCard } from "./components/messages/messageCard.jsx"
import { ThemeProvider } from "styled-components"

export const App = () => {
  const [messages, setMessages] = useState([])

  const addMessage = (newText) => {
    const newMessage = {
      text: newText,
      hearts: 0,
      createdAt: Date.now(),
    }

    setMessages([...messages, newMessage])
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />

        <main>
          <Header text="Happy Thoughts"/>

          <InputCard onSubmit={addMessage} />

          <MessageCard />

          <Footer text="Happy Thoughts by Asako"/>
        </main>
      </ThemeProvider>
    </>
  )
}

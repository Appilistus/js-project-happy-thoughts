import { GlobalStyles } from "./styling/globalStyles.js"
import { theme } from "./styling/theme.js"
import { Hero } from "./ts-practice/hero"
import { Footer } from "./ts-practice/footer"
import { InputCard } from "./components/input/inputCard.jsx"
import { MessageCard } from "./components/messages/messageCard.jsx"
import { ThemeProvider } from "styled-components"

export const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />

        <main>
          <Hero text="Happy Thoughts"/>

          <InputCard />

          <MessageCard />

          <Footer text="Happy Thoughts by Asako"/>
        </main>
      </ThemeProvider>
    </>
  )
}

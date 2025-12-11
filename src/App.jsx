import { useState, useEffect, useRef } from "react"
import styled from "styled-components"

import { ThemeProvider } from "styled-components"
import { GlobalStyles } from "./styling/globalStyles.js"
import { theme } from "./styling/theme.js"
import { Header } from "./components/layout/Header.js"
import { Hero } from "./components/layout/Hero.js"
import { Footer } from "./components/layout/Footer.js"
import { InputCard } from "./components/input/InputCard.jsx"
import { MessageList } from "./components/messages/MessageList.jsx"
import { HeartLoader } from "./styling/LoadingAnime.jsx"

export const App = () => {

  const scrollRef = useRef(null)

  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // State to track liked posts in local storage
  const [likedPosts, setLikedPosts] = useState(() => {
    const saved = localStorage.getItem("likedPosts")
    return saved ? JSON.parse(saved) : []
  })

  // fetch messages from API + interval polling
  useEffect(() => {
    const fetchMessages = () => {
      fetch("https://happy-thoughts-api-4ful.onrender.com/thoughts")
      .then(res => {
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`)
        }
        return res.json()
    })
      .then(data => {
        setMessages(data)
        setLoading(false)
        setError(null)
      })
      .catch(error => {
        console.error("Error fetching messages:", error)
        setError("Something went wrong. Please try again ❤️")
        setLoading(false)
      })
    }

    fetchMessages() // Initial fetch

    // Set interval to fetch messages every 30 seconds
    const intervalID = setInterval(fetchMessages, 30000)

    // Cleanup interval on component unmount
    return () => clearInterval(intervalID)
  },[])

  // Update local storage when likedPosts changes
  useEffect(() => {
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts))
  }, [likedPosts])

  // Post new message to API
  const addMessage = async (newText) => {
    try {
      const response = await fetch("https://happy-thoughts-api-4ful.onrender.com/thoughts", 
        {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({ message: newText})
        })

      if (!response.ok) {
        throw new Error("Failed to post your message 💔")
      }

      const data = await response.json()
      setMessages(prev => [data, ...prev])
    
    } catch (error) {
      console.error("Error posting message:", error)
      setError("Something went wrong. Please try again ❤️")
    }
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    }
  },[messages])

  // Send like to API
  const increaseHeart = async (id) => {
    const message = messages.find(msg => msg._id === id)

    try {
      const response = await fetch(`https://happy-thoughts-api-4ful.onrender.com/thoughts/${message._id}/like`,
        { method: "POST"}
      )

      if (!response.ok) {
        throw new Error("Failed to send like 💔")
      }
  
      const updated = messages.map(msg =>
        msg._id === id 
          ? { ...msg, hearts: msg.hearts + 1 } 
          : msg
      )
      setMessages(updated)
  
      // Update likedPosts state
      setLikedPosts(prev =>
        prev.includes(id) ? prev : [...prev, id]
      )

    } catch (error) {
      console.error("Error liking message:", error)
      setError("Failed to send like ❤️‍🩹 Try again!")
    }
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
          <AppContainer>

            <Header likedCount={likedPosts.length} />

            <Hero text="Happy Thoughts"/>

            <CardWrapper>
              <InputCard onSubmit={addMessage} />
            </CardWrapper>

            {error && <ErrorBox>{error}</ErrorBox>}

            {loading ? (
              <LoadingWrapper>
                <HeartLoader />
                <p>Loading Happy Thoughts...</p>
              </LoadingWrapper>
            ) : (
              <ScrollArea ref={scrollRef}>
                <CardWrapper>
                  <MessageList 
                    messages={messages}
                    onLike={increaseHeart}
                  />
                </CardWrapper>
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
const CardWrapper = styled.div`
  width: 600px;
  max-width: 85%;
  margin: 0 auto;
`
const ErrorBox = styled.div`
  margin: 50px auto 10px;
  border-radius: 6px;
  width: fit-content;
  text-align: center;
`

const LoadingWrapper = styled.div`
  display: flex;
  overflow-y: auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.text };
`

const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0 50px;
  padding-left: 12px;

  /* Scrollbar Styling */
  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary };
    border-radius: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.colors.formBackground };
  }
`
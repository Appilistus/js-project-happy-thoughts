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

// const API_URL = "http://localhost:8080"
const API_URL = import.meta.env.VITE_API_URL


export const App = () => {

  const scrollRef = useRef(null)

  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [scroll, setScroll] = useState(false)

  // State to track liked posts in local storage
  const [likedPosts, setLikedPosts] = useState(() => {
    const saved = localStorage.getItem("likedPosts")
    return saved ? JSON.parse(saved) : []
  })


  const fetchMessages = async () => {
    try {
      const res = await fetch(`${API_URL}/messages`)
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`)
    }
    const data = await res.json()
    setMessages(data.response)
    setError(null)
  } catch (error) {
    console.error("Error fetching messages:", error)
    setError("Something went wrong. Please try again ❤️")
  } finally {
    setLoading(false)
  }
}

// fetch messages from API
  useEffect(() => {
      fetchMessages()
  },[])

  // Update local storage when likedPosts changes
  useEffect(() => {
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts))
  }, [likedPosts])

  // Post new message to API
  const addMessage = async (newText) => {
    try {
      const response = await fetch(`${API_URL}/messages`, 
        {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({ message: newText})
        })

        const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to post your message 💔")
      }

      // setMessages(prev => [data.response, ...prev])
      await fetchMessages()
      setScroll(true)
    
    } catch (error) {
      console.error("Error posting message:", error)
      setError("Something went wrong. Please try again ❤️")
    }
  }

  useEffect(() => {
    if (scroll && scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: "smooth"
      })
      setScroll(false)
    }
  },[messages, scroll])

  // Send like to API
  const increaseHeart = async (id) => {
    try {
      const response = await fetch(`${API_URL}/messages/${id}/like`,
        { method: "PATCH"}
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to send like 💔")
      }

      setMessages((prev) =>
        prev.map((msg) => (msg._id === id ? data.response : msg))
      )
      // Update likedPosts state
      setLikedPosts(prev =>
        prev.includes(id) ? prev : [...prev, id]
      )

    } catch (error) {
      console.error("Error liking message:", error)
      setError("Failed to send like ❤️‍🩹 Try again!")
    }
  }

  const deleteMessage = async (id) => {
    try {
      const response = await fetch(`${API_URL}/messages/${id}`, 
        {
          method: "DELETE",
      })

      const data = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(data?.message || " Failed to delete message 💔")
      }

      setMessages((prev) => prev.filter((msg) => msg._id !== id)) // delete from screen
      setLikedPosts((prev) => prev.filter((likedId) => likedId !== id)) // delete from liked posts
    } catch (error) {
      setError(error.message || "Failed to delete message❤️‍🩹 Try again!")
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
                    onDelete={deleteMessage}
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
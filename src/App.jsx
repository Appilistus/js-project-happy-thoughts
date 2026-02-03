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
import { SortTabs } from "./components/layout/SortTabs.jsx"
import { FilterTabs } from "./components/layout/FilterTabs.jsx"
import { AuthPage } from "./pages/AuthPage.jsx"

const API_URL = import.meta.env.VITE_API_URL

export const App = () => {

  const scrollRef = useRef(null)

  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [scroll, setScroll] = useState(false)
  const [sortMode, setSortMode] = useState("new") // "new" or "popular"
  const [heartsFilter, setHeartsFilter] = useState("all") // "all", "with" or "without"
  const [isFading, setIsFading] = useState(false)
  const [newPostId, setNewPostId] = useState(null)
  
  const [showAuth, setShowAuth] = useState(false)
  const [auth, setAuth] = useState(() => ({
    token: localStorage.getItem("token"),
    userId: localStorage.getItem("userId")
  }))

  const isLoggedIn = Boolean(auth.token)
  const currentUserId = auth.userId

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    setAuth({ token: null, userId: null})
  }

  // State to track liked posts in local storage
  const [likedPosts, setLikedPosts] = useState(() => {
    const saved = localStorage.getItem("likedPosts")
    return saved ? JSON.parse(saved) : []
  })


  const fetchMessages = async () => {
    setLoading(true)
    try {
      const sortQuery = sortMode === "popular" ? "sort=hearts" : "sort=createdAt"

      const filterQuery = 
        heartsFilter === "with" ? "hasHearts=true"
        : heartsFilter === "without" ? "hasHearts=false"
        : ""

      const queryString = [sortQuery, filterQuery].filter(Boolean).join("&")
      const url = `${API_URL}/messages${queryString ? `?${queryString}` : ""}`

      const res = await fetch(url)
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`)
    }
    const data = await res.json()

    setMessages(data.response)
    setError(null)

    // Trigger fade-in effect
    requestAnimationFrame(() => {
      setIsFading(false)
      setScroll(true)
    })
  } catch (error) {
    console.error("Error fetching messages:", error)
    setError("Something went wrong. Please try again ❤️")
    setIsFading(false)
  } finally {
    setLoading(false)
  }
}

// fetch messages from API
  useEffect(() => {
    fetchMessages()
  },[sortMode, heartsFilter])

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

      setSortMode("new") // Switch to "new" sort mode after posting
      setScroll(true)

      // Highlight the new post
      setNewPostId(data.response._id)
      setTimeout(() => setNewPostId(null), 800) // Clear highlight after 800ms

      await fetchMessages()
    
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
    const token = localStorage.getItem("token")

    if (!token) {
      setError("You must be logged in to delete a message ❤️‍🩹")
      setShowAuth(true)
      return
    }

    try {
      const response = await fetch(`${API_URL}/messages/${id}`, 
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          }
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

  // Handle sort mode change with fade effect
  const handleSortChange = (mode) => {
    setIsFading(true)
    setTimeout(() => {
      setSortMode(mode)
    },400)
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
          <AppContainer>

            <Header 
              likedCount={likedPosts.length} 
              isLoggedIn={isLoggedIn}
              onLoginClick={() => setShowAuth(true)}
              onLogoutClick={logout}
            />

            {showAuth && (
              <AuthPage
                onLoginSuccess={(authData) => {
                  setAuth(authData)
                  setShowAuth(false)
                }}
              />
            )}

            <Hero text="Happy Thoughts"/>
            
            <CardWrapper>
              <InputCard onSubmit={addMessage} />
            </CardWrapper>
            <SortTabs
              sortMode={sortMode}
              onChange={handleSortChange}
            />
            <FilterTabs
              heartsFilter={heartsFilter}
              onChange={(filter) => {
                setIsFading(true)
                setHeartsFilter(filter)
                setScroll(true)
              }}
            />

            {error && <ErrorBox>{error}</ErrorBox>}

            {loading ? (
              <LoadingWrapper>
                <HeartLoader />
                <p>Loading Happy Thoughts...</p>
              </LoadingWrapper>
            ) : (
              <ScrollArea ref={scrollRef}>
                <CardWrapper>
                  <FadeWrapper $isFading={isFading}>
                    <MessageList 
                      messages={messages}
                      onLike={increaseHeart}
                      onDelete={deleteMessage}
                      newPostId={newPostId}
                      currentUserId={currentUserId}
                    />
                  </FadeWrapper>
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
  padding: 20px 0 50px;
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

const FadeWrapper = styled.div`
  opacity: ${({ $isFading }) => ($isFading ? 0 : 1)};
  transition: opacity 400ms ease;
`
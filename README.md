# Happy Thoughts Project

A Twitter-like application where users can view, post, and like "happy thoughts". This project was built as part of the Technigo Web Development Bootcamp.

## 🚀 The Project

The main goal of this project was to practice React state management (`useState`, `useEffect`), handling API requests (GET, POST), and creating a responsive UI using Styled Components.

**Live Demo:** [Happy Thoughts on Netlify](https://happy-thoughts-25.netlify.app/)

### Features
- **View Thoughts:** Fetches and displays the most recent happy thoughts from an API.
- **Post Thoughts:** Users can type and send their own happy message.
- **Like Thoughts:** Users can "heart" messages they like.
- **Auto-Update:** The feed refreshes automatically every 30 seconds.
- **Persistence:** Liked posts are saved in Local Storage so the user remembers what they liked.

## 🛠 Tech Stack
- **React** (created with Vite)
- **Styled Components** (for CSS-in-JS styling)
- **Day.js** (for date formatting)
- **Rest API** (Technigo provided API: `https://happy-thoughts-api-4ful.onrender.com/thoughts`)

## 🏃‍♀️ How to Run Locally

1. **Clone the repo**
   ```bash
   git clone <repo-url>
   cd js-project-happy-thoughts
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

## 📚 What I Learned
- Structuring a React application with components.
- Managing side effects with `useEffect`.
- Making asynchronous API calls with `fetch`.
- Polling data with `setInterval`.
- Using `useRef` for scrolling behavior.
- Theming and global styles with Styled Components.

## 👩‍💻 Author
**Asako K**  
(Student at Technigo)
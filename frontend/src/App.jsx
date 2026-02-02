import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore'
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from "./store/useThemeStore";

const App = () => {
    const { theme } = useThemeStore();
  const { authUser, checkAuth, isCheckingAuth,onlineUsers } = useAuthStore()
  console.log("onlient users are:",onlineUsers)

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  console.log("authUser:", authUser)
  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} /> {/*if user authenticated then he can see the home page if not authenticated then navigate to login page*/}
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />{/*if user notauthenticated then he can see the signup page if  authenticated then navigate to home page*/}
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />{/*setting page is open for both authenticated user and unathonticated user also*/}
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App

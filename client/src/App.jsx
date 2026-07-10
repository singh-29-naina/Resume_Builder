import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import ResumeBuilder from './pages/ResumeBuilder'
import Preview from './pages/Preview'
import LogIn from './pages/Login'
import AIResumeCoach from "./pages/AIResumeCoach";
import api from './configs/api'
import { login, setLoading } from './app/features/authSlice'
import ChooseTemplate from "./pages/chooseTemplate";

const App = () => {
  const dispatch = useDispatch()

  const getUserData = async () => {
  const token = localStorage.getItem("token");

  try {
    if (!token) {
      dispatch(setLoading(false));
      return;
    }

    const { data } = await api.get("/api/users/data", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (data.success) {
      dispatch(
        login({
          token,
          user: data.user,
        })
      );
    }
  } catch (error) {
    console.log(error.response?.data || error.message);
    localStorage.removeItem("token");
  } finally {
    dispatch(setLoading(false));
  }
};
  useEffect(() => {
    getUserData()
  }, [])

  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='app' element={<Layout />}>
          <Route index element={<Dashboard />} />
          
          <Route path='builder/:resumeId' element={<ResumeBuilder />} />
          <Route path='ai-resume-coach' element={<AIResumeCoach />} />
          <Route
                path="choose-template/:resumeId"
                element={<ChooseTemplate />}
          />
        </Route>
        <Route path='view/:resumeId' element={<Preview />} />
        <Route path='login' element={<LogIn />} />
        <Route path='signup' element={<LogIn />} />
      </Routes>
    </>
  )
}

export default App
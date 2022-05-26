import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Loader from './components/Loader'

const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Profile = lazy(() => import('./pages/Profile'))
const Redeem = lazy(() => import('./pages/Redeem'))
const Register = lazy(() => import('./pages/Register'))
const Settings = lazy(() => import('./pages/Settings'))

const App = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/home' element={<Home />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/redeem' element={<Redeem />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App

//Pages and routes
import PrivateRoute from './routes/PrivateRoute'
import PublicRoute from './routes/PublicRoute'
import About from './routes/About'
import ErrorPage from './routes/ErrorPage'
import Home from './routes/Home'
import Product from './routes/Product'
import SignUp from './routes/SignUp'
import Login from './routes/Login'
import ResetPassword from './routes/ResetPassword'
import Store from './routes/Store'
import UpdateProfile from './routes/UpdateProfile'
import HandleAccess from './routes/HandleAccess'

//Components
import Nav from './components/Nav'
import Footer from './components/Footer'

import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { Routes, Route } from 'react-router-dom'
import { ShoppingCartProvider } from './context/ShoppingCartContext'

function App() {
  useEffect(() => {
    if (localStorage.theme === 'night') {
      document.documentElement.dataset.theme = 'night'
    } else {
      document.documentElement.dataset.theme = 'light'
    }
  }, [])

  return (
    <ShoppingCartProvider>
      <Toaster />
      <main className='flex flex-col min-h-screen justify-center'>
        <Nav />
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Home />} />
          <Route path='store' element={<Store />} />
          <Route
            path='connect/google/redirect'
            element={<HandleAccess provider='google' />}
          />
          <Route
            path='connect/github/redirect'
            element={<HandleAccess provider='github' />}
          />
          <Route path='store/:id' element={<Product />} />
          <Route path='about' element={<About />} />

          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route path='update-profile' element={<UpdateProfile />} />
          </Route>

          {/* Only unAuthorized Routes */}
          <Route element={<PublicRoute />}>
            <Route path='signup' element={<SignUp />} />
            <Route path='login' element={<Login />} />
            {/* <Route path='reset-password' element={<ResetPassword />} /> */}
          </Route>

          <Route path='*' element={<ErrorPage />} />
        </Routes>
        <Footer />
      </main>
    </ShoppingCartProvider>
  )
}

export default App

//Pages and routes
import About from './routes/About'
import ErrorPage from './routes/ErrorPage'
import Home from './routes/Home'
import Product from './routes/Product'
import SignUp from './routes/SignUp/SignUp'
import Login from './routes/Login/Login'
import SignUp from './routes/SignUp'
import Store from './routes/Store'
import PublicRoute from './routes/PublicRoute'

//Components
import Nav from './components/Nav'
import Footer from './components/Footer'

import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { Routes, Route } from 'react-router-dom'
import { ShoppingCartProvider } from './context/ShoppingCartContext'
import PrivateRoute from './routes/PrivateRoute'
import UpdateProfile from './routes/UpdateProfile'

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
      <main className='flex flex-col min-h-screen'>
        <Nav />
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Home />} />
          <Route path='store' element={<Store />} />
          <Route path='store/:id' element={<Product />} />
          <Route path='about' element={<About />} />

          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route path='/update-profile' element={<UpdateProfile />} />
          </Route>

          {/* Only unAuthorized Routes */}
          <Route element={<PublicRoute />}>
            <Route path='signup' element={<SignUp />} />
            <Route path='login' element={<Login />} />
          </Route>

          <Route path='*' element={<ErrorPage />} />
        </Routes>
        <Footer />
      </main>
    </ShoppingCartProvider>
  )
}

export default App

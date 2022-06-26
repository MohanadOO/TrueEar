//Pages and routes
import About from './routes/About'
import ErrorPage from './routes/ErrorPage'
import Home from './routes/Home'
import Product from './routes/Product'
import SignUp from './routes/SignUp'
import Store from './routes/Store'

//Components
import Nav from './components/Nav'
import Footer from './components/Footer'

import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { Routes, Route } from 'react-router-dom'
import { ShoppingCartProvider } from './context/ShoppingCartContext'

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache(),
})

function App() {
  useEffect(() => {
    if (localStorage.theme === 'night') {
      document.documentElement.dataset.theme = 'night'
    } else {
      document.documentElement.dataset.theme = 'light'
    }
  }, [])

  return (
    <ApolloProvider client={client}>
      <ShoppingCartProvider>
        <Toaster />
        <Nav />
        <div className='mt-28'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='store' element={<Store />} />
            <Route path='store/:id' element={<Product />} />
            <Route path='about' element={<About />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
          <Footer />
        </div>
      </ShoppingCartProvider>
    </ApolloProvider>
  )
}

export default App

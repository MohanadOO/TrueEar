import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Home() {
  const { currentUser } = useAuth()

  return (
    <section
      aria-label='Home Page'
      className='pb-4 px-4 sm:px-8 flex flex-col lg:flex-row justify-between items-center self-center mt-36 lg:mt-0 lg:gap-24'
    >
      <div className='lg:max-w-xl'>
        <header className='text-center lg:text-left space-y-4'>
          <h1 className='font-bold text-4xl md:text-5xl lg:text-6xl'>
            Only
            <span className='text-primary'> The Best </span>
            True wireless earbuds
          </h1>
          <p className='max-w-lg mx-auto lg:text-lg lg:mx-0 leading-relaxed text-primary font-semibold'>
            Get Rid of annoying Wires and Embrace the feel of premium True
            Wireless Earbuds
          </p>
        </header>
        <div className='mt-12 justify-center items-center lg:justify-start space-y-3 sm:space-x-6 sm:space-y-0 sm:flex'>
          <Link
            to='/store'
            className='px-10 py-3.5 w-full btn btn-primary sm:w-auto'
          >
            Store Page
          </Link>
          {!currentUser && (
            <Link
              to='/signup'
              className='px-10 py-3.5 w-full btn btn-outline sm:w-auto'
            >
              Sign Up
            </Link>
          )}
        </div>
      </div>
      <div className='max-w-sm w-full my-24'>
        <img
          className='aspect-square object-cover bg-primary/40 max-w-sm w-full mask mask-hexagon'
          src='/home.png'
          alt='Home Illustration'
        />
      </div>
    </section>
  )
}

export default Home

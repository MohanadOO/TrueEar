import { Link } from 'react-router-dom'

function Home() {
  return (
    <section className='mt-32 mx-auto max-w-screen-xl pb-4 px-4 sm:px-8'>
      <div className='text-center space-y-4'>
        <h1 className=' font-bold text-4xl md:text-5xl'>
          The Best
          <span className='text-primary'> True Wireless Earbuds </span>
          start with us
        </h1>
        <p className=' max-w-xl mx-auto leading-relaxed'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio
          aperiam commodi accusamus dolor reiciendis obcaecati.
        </p>
      </div>
      <div className='mt-12 justify-center items-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex'>
        <Link
          to='/store'
          className='px-10 py-3.5 w-full btn btn-primary sm:w-auto'
        >
          Store Page
        </Link>
        <Link
          to='/signup'
          className='px-10 py-3.5 w-full btn btn-outline sm:w-auto'
        >
          Sign Up
        </Link>
      </div>
    </section>
  )
}

export default Home

import {
  AiFillGithub,
  AiFillHeart,
  AiFillProfile,
  AiFillTwitterCircle,
} from 'react-icons/ai'

function Footer() {
  return (
    <footer className='absolute bottom-0 py-3 px-5 md:px-10 w-full bg-gradient-to-r from-primary/70 to-secondary/60 shadow-md flex items-center justify-around  font-semibold text-sm'>
      <p className='flex items-center gap-2'>
        Made By Mohanad <AiFillHeart className='w-5 h-5 fill-red-500 inline' />
      </p>
      <ul className='flex gap-5'>
        <li>
          <a href='https://github.com/MohanadOO' target='_blank'>
            <AiFillGithub className=' w-6 h-6 hover:fill-secondary transition-colors' />
          </a>
        </li>
        <li>
          <a href='https://twitter.com/MohanadOO_' target='_blank'>
            <AiFillTwitterCircle className=' w-6 h-6 hover:fill-secondary transition-colors' />
          </a>
        </li>
        <li>
          <a href='https://portfolio-mohanadoo.vercel.app/' target='_blank'>
            <AiFillProfile className=' w-6 h-6 hover:fill-secondary transition-colors' />
          </a>
        </li>
      </ul>
    </footer>
  )
}

export default Footer

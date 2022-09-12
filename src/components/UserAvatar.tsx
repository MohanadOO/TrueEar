import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import { HiOutlineLogout, HiOutlinePencilAlt } from 'react-icons/hi'
import toast from 'react-hot-toast'
import { AiOutlineFormatPainter } from 'react-icons/ai'

function UserAvatar() {
  const { currentUser, logOut } = useAuth()

  function signOut() {
    logOut()
    toast.success(<b>You Signed Out</b>)
  }

  function toggleTheme() {
    if (localStorage.theme === 'night') {
      localStorage.theme = 'light'
      return (document.documentElement.dataset.theme = 'light')
    }
    localStorage.theme = 'night'
    return (document.documentElement.dataset.theme = 'night')
  }

  return (
    <>
      {!currentUser ? (
        <li className='ml-auto'>
          <Link
            className='btn btn-primary btn-outline btn-sm md:btn-md mr-2'
            to='/login'
          >
            Log In
          </Link>
        </li>
      ) : (
        <li className='ml-auto dropdown dropdown-end mr-2'>
          <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
            <div aria-label='User Profile Menu' className='w-10 rounded-full'>
              {currentUser?.avatar ? (
                <img src={currentUser.avatar} alt='User Profile' />
              ) : (
                <div className='avatar placeholder'>
                  <div className='bg-neutral-focus text-neutral-content rounded-full w-10'>
                    <span className='text-lg'>
                      {currentUser?.username?.split('')[0]}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </label>
          <ul
            tabIndex={0}
            className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'
          >
            <li className='menu-title mb-3'>
              <span aria-label='Username'>{currentUser.username}</span>
              <span aria-label='Email'>{currentUser.email}</span>
            </li>
            <li>
              <Link to='/update-profile'>
                <HiOutlinePencilAlt /> Update Profile
              </Link>
            </li>
            <li onClick={toggleTheme}>
              <button>
                <AiOutlineFormatPainter /> Toggle Theme
              </button>
            </li>
            <hr className='border-base-content my-2' />
            <li>
              <button onClick={signOut}>
                <HiOutlineLogout /> Logout
              </button>
            </li>
          </ul>
        </li>
      )}
    </>
  )
}

export default UserAvatar

import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import { HiOutlineLogout, HiOutlinePencilAlt } from 'react-icons/hi'
import toast from 'react-hot-toast'

function UserAvatar() {
  const { currentUser, logOut } = useAuth()

  function signOut() {
    logOut()
    toast.success(<b>You Signed Out</b>)
  }

  return (
    <>
      {!currentUser ? (
        <li className='ml-auto '>
          <Link className='btn btn-primary btn-outline' to='/login'>
            Log In
          </Link>
        </li>
      ) : (
        <li className='ml-auto dropdown dropdown-end'>
          <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
            <div className='w-10 rounded-full'>
              {currentUser?.avatar ? (
                <img src={currentUser.avatar} />
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
              <span>{currentUser.username}</span>
              <span>{currentUser.email}</span>
            </li>
            <li>
              <Link to='/update-profile'>
                <HiOutlinePencilAlt /> Update Profile
              </Link>
            </li>
            <li>
              <a onClick={signOut}>
                <HiOutlineLogout /> Logout
              </a>
            </li>
          </ul>
        </li>
      )}
    </>
  )
}

export default UserAvatar

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Navigate, useSearchParams } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { useAuth } from '../context/AuthContext'

function HandleAccess({ provider }: { provider: String }) {
  const [isLoading, setIsLoading] = useState(true)
  const [success, setSuccess] = useState<undefined | boolean>(undefined)

  const [searchParams, setSearchParams] = useSearchParams()

  const access_token = searchParams.get('access_token')
  const backendURL = `${
    import.meta.env.VITE_SERVER_URL
  }/api/auth/${provider}/callback`

  const { setCurrentUser } = useAuth()

  useEffect(() => {
    const requestResponse = async () => {
      const response = await fetch(
        `${backendURL}?access_token=${access_token}`,
        {
          credentials: 'include',
        }
      )
      const data = await response.json()
      if (data?.error) {
        toast.error(
          <>
            <b>{data.error.status}</b>
            <span className='ml-2'>{data.error.message}</span>
          </>
        )
        setIsLoading(false)
        setSuccess(false)
      } else {
        const token = data.jwt
        const user = data.user
        localStorage.setItem('token', token)
        setCurrentUser(user)
        setIsLoading(false)
        setSuccess(true)
        toast.success(`Welcome Back ${user.username} 👋`)
      }
      try {
        console.log('Success Response')
      } catch (error) {
        console.error(error)
      }
    }
    requestResponse()
  }, [])

  return (
    <>
      {isLoading ? (
        <div className='my-32 mx-5 md:mx-10 lg:mx-32 flex flex-col items-center justify-center'>
          <ClipLoader size='75px' color='blue' />
        </div>
      ) : (
        <>
          {success ? (
            <Navigate to='/store' replace />
          ) : (
            <Navigate to='/login' replace />
          )}
        </>
      )}
    </>
  )
}

export default HandleAccess

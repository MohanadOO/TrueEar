import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'

import { useMutation } from '@apollo/client'
import { useAuth } from '../../context/AuthContext'

import LOGIN from './LoginQueries'

type Inputs = {
  username: string
  password: string
}

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/store'

  const [isLoading, setIsLoading] = useState(false)

  const [loginUserFunction] = useMutation(LOGIN)
  const { login, setCurrentUser } = useAuth()

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<Inputs>()

  //Focus on Username input field on Load.
  useEffect(() => {
    setFocus('username')
  }, [])

  const onSubmit: SubmitHandler<Inputs> = (inputData) => {
    const { username, password } = inputData
    setIsLoading(true)

    toast
      .promise(
        loginUserFunction({
          variables: {
            input: login(username, password),
          },
        }),
        {
          loading: <b>Log In...</b>,
          error: <b>Invalid name or password</b>,
          success: <b>You are logged In</b>,
        }
      )
      .then(({ data }) => {
        setIsLoading(false)

        const user = data.login.user
        const token = data.login.jwt

        localStorage.setItem('token', token)
        setCurrentUser(user)

        navigate(from, { replace: true })
      })
      .catch(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className='w-full max-w-sm card card-bordered bg-primary/5 py-10 px-6 self-center my-auto'>
      <h1 className='card-title text-center mb-3 mx-auto'>Log in</h1>
      <div className='flex w-full justify-around mb-5'>
        <a
          className='btn btn-sm btn-outline capitalize'
          target='_blank'
          href='https://516f-151-255-198-186.eu.ngrok.io/api/connect/google'
        >
          Google
        </a>
        <a
          className='btn btn-sm btn-outline capitalize'
          target='_blank'
          href='https://516f-151-255-198-186.eu.ngrok.io/api/connect/github'
        >
          GitHub
        </a>
      </div>
      <form
        className='form-control mx-auto mt-auto self-center w-full max-w-md gap-5'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='flex flex-col gap-2'>
          <label htmlFor='username'>
            <span className='label-text'>Email or Username</span>
          </label>

          <input
            {...register('username', { required: true, minLength: 4 })}
            className={`input ${
              errors.username ? 'input-error' : 'input-primary'
            }`}
            id='username'
            aria-invalid={errors.username ? 'false' : 'true'}
            aria-describedby='usernameNote'
            placeholder='Enter Your Email or Username'
            type='username'
          />

          {errors.username && (
            <p id='usernameNote' className='label-text text-error'>
              Email or Username Is Required
            </p>
          )}
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor='password'>
            <span className='label-text'>Password</span>
          </label>
          <input
            {...register('password', { required: true, minLength: 7 })}
            className={`input ${
              errors.password ? 'input-error' : 'input-primary'
            }`}
            id='password'
            aria-invalid={errors.password ? 'false' : 'true'}
            aria-describedby='passwordNote'
            placeholder='Password'
            type='password'
          />

          {errors.password && (
            <p className='label-text text-error'>
              {errors.password.type === 'required'
                ? 'Password Is Required'
                : 'Password must be more than 7 characters'}
            </p>
          )}
        </div>
        <input
          disabled={isLoading}
          value='Login'
          type='submit'
          className='btn btn-primary'
        />
      </form>
      <div className='mt-5 text-center'>
        <span>Don't have an Account 👉 </span>
        <Link className='text-primary' to='/signup'>
          Sign Up
        </Link>
      </div>
      <div className='mt-2 text-center'>
        <Link className='text-primary' to='/forgot-password'>
          Forgot Your Password
        </Link>
      </div>
    </div>
  )
}

export default Login

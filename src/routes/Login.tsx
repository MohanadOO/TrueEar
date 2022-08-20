import { SubmitHandler, useForm } from 'react-hook-form'
import {
  Link,
  useNavigate,
  useLocation,
  NavigateFunction,
} from 'react-router-dom'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'

import { useMutation } from '@apollo/client'
import { LOGIN } from '../Graphql/LoginQueries'

import { useAuth } from '../context/AuthContext'
import { AiFillGithub, AiFillGoogleCircle } from 'react-icons/ai'

type Inputs = {
  username: string
  password: string
}

function Login() {
  let navigate = useNavigate()
  let location = useLocation()
  const from = location?.state?.from?.pathname || '/store'

  const [isLoading, setIsLoading] = useState(false)
  const [loginUserFunction] = useMutation(LOGIN)
  const { login, setCurrentUser } = useAuth()

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<Inputs>()

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

        const token = data.login.jwt
        const user = data.login.user

        localStorage.setItem('token', token)
        setCurrentUser(user)

        navigate(from, { replace: true })
      })
      .catch(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className='w-full max-w-xs md:max-w-sm card card-bordered bg-primary/5 py-10 px-6 self-center my-auto'>
      <h1 className='card-title text-center mb-3 mx-auto'>Log in</h1>
      <div className='flex justify-evenly w-full mb-3'>
        <a
          className='btn btn-sm md:btn-md btn-outline capitalize flex gap-2'
          href={`${import.meta.env.VITE_SERVER_URL}/api/connect/google`}
        >
          <AiFillGoogleCircle />
          <span>Google</span>
        </a>
        <a
          className='btn btn-sm md:btn-md btn-outline capitalize flex gap-2'
          href={`${import.meta.env.VITE_SERVER_URL}/api/connect/github`}
        >
          <AiFillGithub />
          <span>GitHub</span>
        </a>
      </div>
      <form
        className='form-control mx-auto mt-auto self-center w-full max-w-md gap-2 md:gap-5'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='flex flex-col gap-2'>
          <label htmlFor='username'>
            <span className='label-text'>Email or Username</span>
          </label>

          <input
            {...register('username', { required: true, minLength: 4 })}
            className={`input input-sm md:input-md ${
              errors.username ? 'input-error' : 'input-primary'
            }`}
            id='username'
            aria-invalid={errors.username ? 'false' : 'true'}
            aria-describedby='usernameNote'
            placeholder='Enter Your Email or Username'
            type='username'
          />

          {errors.username && (
            <p
              id='usernameNote'
              className='label-text text-error text-xs md:text-sm'
            >
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
            className={`input input-sm md:input-md ${
              errors.password ? 'input-error' : 'input-primary'
            }`}
            id='password'
            aria-invalid={errors.password ? 'false' : 'true'}
            aria-describedby='passwordNote'
            placeholder='Password'
            type='password'
          />

          {errors.password && (
            <p className='label-text text-error text-xs md:text-sm'>
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
          className='btn btn-sm md:btn-md btn-primary mt-3 md:mt-0'
        />
      </form>
      <div className='mt-5 text-center text-sm md:text-base'>
        <span>Don't have an Account 👉 </span>
        <Link className='text-primary' to='/signup'>
          Sign Up
        </Link>
      </div>
      <div className='mt-2 text-center text-sm md:text-base'>
        <Link className='text-primary' to='/reset-password'>
          Forgot Your Password
        </Link>
      </div>
    </div>
  )
}

export default Login

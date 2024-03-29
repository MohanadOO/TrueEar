import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { useMutation } from '@apollo/client'
import REGISTER from '../Graphql/SignUpQueries'

import { useAuth } from '../context/AuthContext'
import { AiFillGithub, AiFillGoogleCircle } from 'react-icons/ai'

type Inputs = {
  username: string
  email: string
  password: string
  confirmPassword: string
}

function SignUp() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathName || '/store'

  const [isLoading, setIsLoading] = useState(false)
  const [registerUserFunction] = useMutation(REGISTER)
  const { signUp, setCurrentUser } = useAuth()

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
    const { username, email, password } = inputData
    setIsLoading(true)
    if (inputData.password !== inputData.confirmPassword) {
      setIsLoading(false)
      return toast.error(<b>Passwords do not match</b>)
    } else {
      toast
        .promise(
          registerUserFunction({
            variables: {
              input: signUp(username, email, password),
            },
          }),
          {
            loading: <b>Register User...</b>,
            error: <b>Can't Register User</b>,
            success: <b>Register Success</b>,
          }
        )
        .then(({ data }) => {
          setIsLoading(false)

          const token = data.register.jwt
          const user = data.register.user

          localStorage.setItem('token', token)
          setCurrentUser(user)

          navigate(from, { replace: true })
        })
        .catch((error) => {
          console.log(error)
          toast.error(
            <>
              <b>{error.message}</b>
              <Link to='login' className='ml-1 text-accent underline'>
                Login
              </Link>
            </>
          )
          setIsLoading(false)
        })
    }
  }

  return (
    <section className='w-full max-w-xs md:max-w-sm card card-bordered bg-primary/5 py-5 px-8  md:p-10 mx-5 self-center my-auto max-h-[70vh] overflow-y-auto'>
      <h1 className='card-title text-center mb-3 mx-auto'>Sign Up</h1>
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
        className='form-control mx-auto self-center w-full max-w-md  gap-1'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='flex flex-col gap-1'>
          <label htmlFor='username'>
            <span className='label-text'>Username</span>
          </label>
          <input
            {...register('username', { required: true, minLength: 4 })}
            className={`input input-sm  ${
              errors.username ? 'input-error' : 'input-primary'
            }`}
            id='username'
            autoComplete='off'
            placeholder='Username'
            aria-invalid={errors.username ? 'false' : 'true'}
            aria-describedby='usernameNote'
            type='username'
          />

          {errors.username && (
            <p
              id='usernameNote'
              className='label-text text-error text-xs md:text-sm'
            >
              {errors.username.type === 'required'
                ? 'Username Is Required'
                : 'Username must be more than 4 characters'}
            </p>
          )}
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor='email'>
            <span className='label-text'>Email</span>
          </label>
          <input
            {...register('email', { required: true })}
            className={`input input-sm  ${
              errors.email ? 'input-error' : 'input-primary'
            }`}
            id='email'
            placeholder='Email'
            type='email'
            autoComplete='off'
            aria-invalid={errors.email ? 'false' : 'true'}
            aria-describedby='emailNote'
          />

          {errors.email && (
            <p
              id='emailNote'
              className='label-text text-error text-xs md:text-sm'
            >
              Email Is Required
            </p>
          )}
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor='password'>
            <span className='label-text'>Password</span>
          </label>
          <input
            {...register('password', { required: true, minLength: 7 })}
            className={`input input-sm  ${
              errors.password ? 'input-error' : 'input-primary'
            }`}
            id='password'
            placeholder='Password'
            type='password'
            aria-invalid={errors.password ? 'false' : 'true'}
            aria-describedby='passwordNote'
          />

          {errors.password && (
            <p className='label-text text-error text-xs md:text-sm'>
              {errors.password.type === 'required'
                ? 'Password Is Required'
                : 'Password must be more than 7 characters'}
            </p>
          )}
        </div>

        <div className='flex flex-col gap-1 mb-5'>
          <label htmlFor='confirmPassword'>
            <span className='label-text'>Confirm Password</span>
          </label>
          <input
            {...register('confirmPassword', {
              required: true,
              minLength: 7,
            })}
            className={`input input-sm  ${
              errors.confirmPassword ? 'input-error' : 'input-primary'
            }`}
            id='confirmPassword'
            placeholder='Confirm Password'
            type='password'
            aria-invalid={errors.confirmPassword ? 'false' : 'true'}
            aria-describedby='confirmPasswordNote'
          />

          {errors.confirmPassword && (
            <p
              id='confirmPasswordNote'
              className='label-text text-error text-xs md:text-sm'
            >
              {errors.confirmPassword.type === 'required'
                ? 'Confirm password Is Required'
                : 'Password must be more than 7 characters'}
            </p>
          )}
        </div>

        <input
          disabled={isLoading}
          value='Signup'
          type='submit'
          className='btn btn-sm md:btn-md btn-primary'
        />
      </form>

      <div className='mt-3 text-cetner text-sm md:text-base'>
        <span>Have An account Already 👉 </span>
        <Link className='text-primary ' to='/login'>
          Login
        </Link>
      </div>
    </section>
  )
}

export default SignUp

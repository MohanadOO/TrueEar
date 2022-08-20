import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useState } from 'react'

import { useAuth } from '../context/AuthContext'
import axios from 'axios'

type Inputs = {
  email: string
}

function ResetPassword() {
  const { resetPassword } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // setLoading(true)

    axios
      .post(`${import.meta.env.VITE_SERVER_URL}/api/auth/forgot-password`, {
        email: data.email,
      })
      .then((response) => {
        console.log('Your user received an email')
      })
      .catch((error) => {
        console.log('An error occurred:', error.response)
      })
  }

  return (
    <div className='w-full max-w-xs md:max-w-sm card card-bordered bg-primary/5 py-10 px-6 self-center my-auto'>
      <h1 className='card-title text-center mb-3 mx-auto'>Reset Password</h1>
      <form
        className='form-control mx-auto mt-auto self-center w-full max-w-md gap-5'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='flex flex-col gap-2'>
          <label htmlFor='email'>
            <span className='label-text'>Email</span>
          </label>
          <input
            {...register('email', { required: true })}
            className={`input ${
              errors.email ? 'input-error' : 'input-primary'
            }`}
            id='email'
            placeholder='Email'
            type='email'
            aria-describedby='emailNote'
            aria-invalid={errors.email ? 'false' : 'true'}
          />

          {errors.email && (
            <p id='emailNote' className='label-text text-error'>
              Email Is Required
            </p>
          )}
        </div>

        <input
          disabled={loading}
          value='Reset Password'
          type='submit'
          className='btn btn-sm md:btn-md btn-primary'
        />
      </form>
      <div className='mt-5 text-center'>
        <span>Go Back to Login Page 👉 </span>
        <Link className='text-primary' to='/signup'>
          Login
        </Link>
      </div>
    </div>
  )
}

export default ResetPassword

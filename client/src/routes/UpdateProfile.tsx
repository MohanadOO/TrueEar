import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { HiOutlinePhotograph } from 'react-icons/hi'

import { useMutation } from '@apollo/client'
import UPDATE_AVATAR from '../Graphql/UpdateProfileQueries'

type Inputs = {
  email: String
}

function UpdateProfile() {
  const [previewImage, setPreviewImage] = useState<any>(null)
  const [image, setImage] = useState<any>('')
  const [isLoading, setIsLoading] = useState(false)

  const { currentUser, setCurrentUser } = useAuth()

  const [handleUpdateUserInfo, { data }] = useMutation(UPDATE_AVATAR)

  useEffect(() => {
    if (data) {
      const { id, attributes } = data.updateUsersPermissionsUser.data
      const { username, avatar, confirmed, email } = attributes
      const userInfo = { id, username, avatar, confirmed, email }
      setCurrentUser(userInfo)
    }
  }, [data])

  const { register, handleSubmit, setFocus } = useForm<Inputs>()

  //Focus on Username input field on Load.
  useEffect(() => {
    setFocus('email')
  }, [])

  const handleFileChange = (e: HTMLInputElement | any) => {
    const extension = e.target.files[0].type.split('/')[1]
    const file = new File(
      [e.target.files[0]],
      `AvatarId_${currentUser.id}.${extension}`,
      {
        type: `image/${extension}`,
      }
    )
    setImage(file)

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewImage(reader.result)
    }
  }

  const onSubmit: SubmitHandler<Inputs> = () => {
    // Update User Details
    // setIsLoading(true)
  }

  function handleAvatarChange(e: HTMLInputElement | any): void {
    e.preventDefault()
    setIsLoading(true)

    if (previewImage) uploadImage()
  }

  async function uploadImage() {
    const formData = new FormData()
    const file = image

    formData.append('files', file)

    try {
      const upload = await fetch('http://localhost:1330/api/upload', {
        method: 'POST',
        body: formData,
        headers: new Headers({
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }),
      })
      const data = await upload.json()
      const thumbnailImage = data[0].formats?.thumbnail.url || data[0].url
      handleUpdateUserInfo({
        variables: {
          id: currentUser.id,
          data: { avatar: thumbnailImage },
        },
      })

      setIsLoading(false)
      setPreviewImage('')
      setImage('')
      toast.success(<b>Avatar changed</b>)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
      toast.error(<b>Couldn't Upload Picture</b>)
    }
  }

  return (
    <div className='w-full max-w-xs md:max-w-sm card card-bordered bg-primary/5 py-10 px-6 self-center my-auto'>
      <h1 className='card-title text-center mb-3 mx-auto'>Update Profile</h1>

      <form
        className='form-control mx-auto mt-auto self-center w-full max-w-md gap-5'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='flex flex-col gap-2'>
          <label htmlFor='email'>
            <span className='label-text'>New Email</span>
          </label>
          <input
            {...register('email')}
            className='input input-sm md:input-md input-primary'
            id='email'
            placeholder='Email'
            type='email'
          />
        </div>

        <input
          disabled={isLoading}
          value='Update Profile'
          type='submit'
          className='btn btn-sm md:btn-md btn-primary'
        />
      </form>

      <div className='flex flex-col mt-7'>
        {previewImage && (
          <div className='avatar self-center mb-5 flex gap-5'>
            <div className='w-16 rounded-xl'>
              <img src={previewImage} alt='chosen_avatar' />
            </div>
            <div className='w-16 rounded-full'>
              <img src={previewImage} alt='chosen_avatar' />
            </div>
          </div>
        )}

        <div className='flex flex-col gap-3'>
          <label
            className='flex btn btn-sm md:btn-md btn-outline gap-2'
            htmlFor='avatar'
          >
            <span>Change Avatar</span>
            <HiOutlinePhotograph className='w-5 h-5 fill-secondary' />
          </label>
          {previewImage && (
            <input
              onClick={handleAvatarChange}
              disabled={isLoading}
              value='Submit Avatar'
              type='submit'
              className='btn btn-primary inline self-center'
            />
          )}
        </div>
        <input
          className='input-primary w-0 hidden'
          id='avatar'
          name='files'
          type='file'
          onChange={handleFileChange}
          accept='.png, .jpg, .jpeg'
        />
      </div>

      <div className='mt-5 text-center'>
        <span>Go Back to </span>
        <Link className='text-primary' to='/store'>
          Store
        </Link>
      </div>
    </div>
  )
}

export default UpdateProfile

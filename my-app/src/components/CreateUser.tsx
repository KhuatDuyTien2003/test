import React, { Fragment, useEffect, useState } from 'react'
import UserList from './UserList'
import { User } from 'userType/user.type'
import { nanoid } from '@reduxjs/toolkit'
import { RootState, useAppDispatch } from 'store'
import { addUser, getUsersHoKhuat, editUser, getEditId, delUser } from './user.reducer'
import { useSelector } from 'react-redux'

export default function CreateUser() {
  const initalUser = {
    name: '',
    website: '',
    email: '',
    link: '',
    id: ''
  }
  const dispatch = useAppDispatch()
  const [newUser, setNewUser] = useState<User>(initalUser)
  const [valueEditUser, setValueEditUser] = useState<User | undefined>(undefined)
  const edittingUser = useSelector((state: RootState) => state.editPost)
  let newUserID: User
  useEffect(() => {
    setNewUser(edittingUser || initalUser)
  }, [edittingUser])
  useEffect(() => {
    newUserID = { ...newUser, id: nanoid() }
  }, [newUser])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (edittingUser) {
      if (edittingUser) dispatch(editUser({ id: edittingUser?.id, body: newUser }))
    } else {
      dispatch(addUser(newUserID))
      setNewUser(initalUser)
    }
  }

  const handleGetUserHoKhuat = () => {
    dispatch(getUsersHoKhuat())
  }
  return (
    <form className='w-full max-w-lg' onSubmit={handleSubmit}>
      <div className='flex flex-wrap -mx-3 mb-6'>
        <div className='w-full px-3'>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-email'>
            Name
          </label>
          <input
            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            id='grid-password'
            type='text'
            value={newUser.name}
            onChange={(e) => {
              setNewUser((prev) => {
                return { ...prev, name: e.target.value }
              })
            }}
            placeholder='Nhập Họ Và Tên '
          />
        </div>
      </div>
      <div className='flex flex-wrap -mx-3 mb-6'>
        <div className='w-full px-3'>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-email'>
            Website
          </label>
          <input
            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            id='grid-password'
            type='text'
            placeholder='Tên Website '
            value={newUser.website}
            onChange={(e) => {
              setNewUser((prev) => {
                return { ...prev, website: e.target.value }
              })
            }}
          />
        </div>
      </div>
      <div className='flex flex-wrap -mx-3 mb-6'>
        <div className='w-full px-3'>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-email'>
            Link
          </label>
          <input
            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            id='grid-password'
            type='text'
            placeholder='Mời nhập đường dẫn'
            value={newUser.link}
            onChange={(e) => {
              setNewUser((prev) => {
                return { ...prev, link: e.target.value }
              })
            }}
          />
        </div>
      </div>
      <div className='flex flex-wrap -mx-3 mb-6'>
        <div className='w-full px-3'>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-email'>
            Email
          </label>
          <input
            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            id='grid-password'
            type='email'
            placeholder='@gmail.com'
            value={newUser.email}
            onChange={(e) => {
              setNewUser((prev) => {
                return { ...prev, email: e.target.value }
              })
            }}
          />
        </div>
      </div>
      {!edittingUser && (
        <div className='flex flex-wrap -mx-3 mb-6'>
          <button
            type='submit'
            className='ml-2 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
          >
            Submit
          </button>
          <button
            type='button'
            onClick={() => handleGetUserHoKhuat()}
            className='ml-2 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
          >
            Get Họ Khuất
          </button>
        </div>
      )}
      {edittingUser && (
        <div className='flex flex-wrap -mx-3 mb-6'>
          <button
            type='submit'
            className='ml-2 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
          >
            Edit
          </button>
          <button
            type='button'
            className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
          >
            Cancel
          </button>
        </div>
      )}
    </form>
  )
}

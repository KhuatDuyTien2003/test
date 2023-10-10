import React, { Fragment, useEffect } from 'react'
import { useAppDispatch } from 'store'
import { User } from 'userType/user.type'
import { delUser, getEditId } from './user.reducer'
interface UserItem {
  user: User
}
export default function UserItem({ user }: UserItem) {
  const dispatch = useAppDispatch()
  const handleGetEditId = (user: User) => {
    dispatch(getEditId(user))
  }
  const handleDel = (id: string) => {
    dispatch(delUser(id))
  }
  return (
    <Fragment>
      <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
        <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
          {user.website}
        </th>
        <td className='px-6 py-4'>{user.name}</td>
        <td className='px-6 py-4'>{user.email}</td>
        <td className='px-6 py-4'>
          <a
            href={user.link}
            className='text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center'
          >
            {user.link}
          </a>
        </td>
        <td className='px-6 py-4'>
          <button
            type='button'
            onClick={() => handleGetEditId(user)}
            className='text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
          >
            Edit
          </button>
        </td>
        <td className='px-6 py-4'>
          <button
            type='button'
            className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
            onClick={() => handleDel(user.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    </Fragment>
  )
}

import { useSelector } from 'react-redux'
import UserItem from './UserItem'
import { RootState, useAppDispatch } from 'store'
import { Fragment, useEffect } from 'react'
import { getUsers } from './user.reducer'
import Skeleton from './Skeleton'

export default function UserList() {
  const userLists = useSelector((state: RootState) => state.userData)
  const loading = useSelector((state: RootState) => state.loading)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  return (
    <div className='w-4/5 m-auto'>
      <h1 className='text-5xl text-red-500 pb-10 text-center'>Danh sách website của user</h1>

      <div className='relative overflow-x-auto'>
        {!loading && <Skeleton />}
        {loading && (
          <Fragment>
            <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th scope='col' className='px-6 py-3'>
                    Tên Website
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Author
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Email
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    WebSite
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Edit
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {userLists.map((user) => (
                  <UserItem user={user} />
                ))}
              </tbody>
            </table>
          </Fragment>
        )}
      </div>
    </div>
  )
}

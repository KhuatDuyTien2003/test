import { PayloadAction, createAsyncThunk, createSlice, AsyncThunk } from '@reduxjs/toolkit'
import { userData } from 'init/user'
import { User } from 'userType/user.type'
import http from 'util/http'

interface stateType {
  userData: User[]
  editPost: User | undefined
  loading: boolean
}

const initialState: stateType = {
  userData: [],
  editPost: undefined,
  loading: false
}
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>
type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

export const getUsers = createAsyncThunk('getUsers', async (_, thunkApi) => {
  const res = await http.get<User[]>('user', {
    signal: thunkApi.signal
  })
  return res.data
})
export const editUser = createAsyncThunk('editUser', async ({ id, body }: { id: string; body: User }, thunkApi) => {
  const res = await http.put<User>(`user/${id}`, body, {
    signal: thunkApi.signal
  })
  return res.data
})
export const getUsersHoKhuat = createAsyncThunk('getUsersHoKhuat', async (_, thunkApi) => {
  const res = await http.get<User[]>('user', {
    signal: thunkApi.signal
  })
  return res.data
})
export const addUser = createAsyncThunk('addUser', async (body: User, thunkApi) => {
  const res = await http.post<User>('user', body, {
    signal: thunkApi.signal
  })
  return res.data
})
export const delUser = createAsyncThunk('delUser', async (id: string, thunkApi) => {
  const res = await http.delete<User>(`user/${id}`, {
    signal: thunkApi.signal
  })
  return res.data
})

const userSlide = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getEditId: (state, action: PayloadAction<User>) => {
      state.editPost = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.userData = action.payload
    })
    builder.addCase(editUser.fulfilled, (state, action) => {
      console.log(action.meta.arg.id)
      state.userData.map((user, index) => {
        if (user.id === action.meta.arg.id) {
          state.userData[index] = action.payload
        }
      })
      state.editPost = undefined
    })
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.userData.push(action.payload)
    })
    builder.addCase(getUsersHoKhuat.fulfilled, (state, action) => {
      state.userData = []
      action.payload.map((user) => {
        if (user.name.includes('Khuất ')) {
          state.userData.push(user)
        }
      })
    })
    builder.addCase(delUser.fulfilled, (state, action) => {
      state.userData.map((user, index) => {
        if (user.id === action.meta.arg) {
          state.userData.splice(index, 1)
        }
      })
    })
    builder.addMatcher(
      // matcher can be defined inline as a type predicate function
      (action): action is PendingAction => action.type.endsWith('/pending'),
      (state) => {
        if (state.userData.length === 0) state.loading = false
      }
    )
    builder.addMatcher(
      // matcher can be defined inline as a type predicate function
      (action): action is RejectedAction => action.type.endsWith('/rejected'),
      (state) => {
        if (state.userData.length > 0) state.loading = true
      }
    )
    builder.addMatcher(
      // matcher can be defined inline as a type predicate function
      (action): action is FulfilledAction => action.type.endsWith('/fulfilled'),
      (state) => {
        if (state.userData.length > 0) state.loading = true
      }
    )
  }
})
export const { getEditId } = userSlide.actions
const userReducer = userSlide.reducer
export default userReducer

import { configureStore } from '@reduxjs/toolkit'
import resourceReducer from './modules/resourceSlice'

const store = configureStore({
  reducer: {
    resource: resourceReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export default store

import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

type TResource = { type: 'url'; data: string } | { type: 'image'; data: File }

interface ResourceState {
  resources: TResource[]
}

const initialState: ResourceState = {
  resources: [],
}

export const resourceSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
})

export const {} = resourceSlice.actions
export const selectResources = (state: RootState) => state.resource.resources

export default resourceSlice.reducer

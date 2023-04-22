import { Template } from '@/interfaces/editor'
import { createAsyncThunk, createAction } from '@reduxjs/toolkit'
import api from '@services/api'
import { AxiosError } from 'axios'

export const setCreations = createAction<Template[]>('creations/setCreations')
export const updateCreationsList = createAction<Template>('creations/updateCreationList')

export const getCreations = createAsyncThunk<void, never, { rejectValue: Record<string, string[]> }>(
  'creations/getCreations',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const creations = await api.getCreations()
      dispatch(setCreations(creations))
    } catch (err) {
      return rejectWithValue((err as AxiosError).response?.data?.error.data || null)
    }
  }
)

export const createCreation = createAsyncThunk<void, { creation: Template }, any>(
  'creations/createCreation',
  async (args, { dispatch }) => {
    const savedCreation = await api.createCreation(args.creation)
    dispatch(setCreations([savedCreation]))
  }
)

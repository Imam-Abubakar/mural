import { Template } from '@/interfaces/editor'
import { createAsyncThunk, createAction } from '@reduxjs/toolkit'
import api from '@services/api'
import { AxiosError } from 'axios'

export const setTemplates = createAction<Template[]>('templates/setTemplates')

export const getTemplates = createAsyncThunk<void, never, { rejectValue: Record<string, string[]> }>(
  'templates/getTemplates',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const templates = await api.getTemplates()
      dispatch(setTemplates(templates))
    } catch (err) {
      return rejectWithValue((err as AxiosError).response?.data?.error.data || null)
    }
  }
)

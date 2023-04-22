import { IElement } from '@/interfaces/editor'
import { createAsyncThunk, createAction } from '@reduxjs/toolkit'
import api from '@services/api'
import { AxiosError } from 'axios'

export const setElements = createAction<IElement[]>('elements/setlements')

export const getElements = createAsyncThunk<void, never, { rejectValue: Record<string, string[]> }>(
  'elements/getElements',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const elements = await api.getElements()
      dispatch(setElements(elements))
    } catch (err) {
      return rejectWithValue((err as AxiosError).response?.data?.error.data || null)
    }
  }
)

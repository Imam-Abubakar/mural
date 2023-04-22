import { RootState } from '@store/rootReducer'

export const selectUploads = (state: RootState) => state.editor.uploads.uploads
export const selectUploading = (state: RootState) => state.editor.uploads.uploading

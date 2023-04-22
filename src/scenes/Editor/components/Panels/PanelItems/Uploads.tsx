import { useRef, useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { useEditor } from '@nkyo/scenify-sdk'
import DropZone from '@components/Dropzone'

import { uniqueFilename } from '@/utils/unique'
import { useSelector } from 'react-redux'
import { selectUploading, selectUploads } from '@/store/slices/uploads/selectors'
import { useAppDispatch } from '@/store/store'
import { setUploading, uploadFile } from '@/store/slices/uploads/actions'

function Uploads() {
  const [currentFile, setCurrentFile] = useState<any>(null)
  const inputFileRef = useRef<HTMLInputElement>(null)
  const uploads = useSelector(selectUploads)
  const uploading = useSelector(selectUploading)
  const editor = useEditor()
  const dispatch = useAppDispatch()
  const handleDropFiles = (files: FileList) => {
    const file = files[0]
    handleUploadFile(file)
    const reader = new FileReader()
    reader.addEventListener(
      'load',
      function () {
        setCurrentFile(reader.result)
      },
      false
    )

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const handleUploadFile = async (file: File) => {
    try {
      const updatedFileName = uniqueFilename(file.name)
      const updatedFile = new File([file], updatedFileName)
      dispatch(
        setUploading({
          progress: 0,
          status: 'IN_PROGRESS',
        })
      )
      dispatch(uploadFile({ file: updatedFile }))
      // const response = await api.getSignedURLForUpload({ name: updatedFileName })
      // await axios.put(response.url, updatedFile, {
      //   headers: { 'Content-Type': 'image/png' },
      // })
      // await api.updateUploadFile({ name: updatedFileName })
    } catch (err) {
      console.log({ err })
    }
  }

  const addImageToCanvas = url => {
    const options = {
      type: 'StaticImage',
      metadata: { src: url },
    }
    editor.add(options)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDropFiles(e.target.files)
  }

  const handleInputFileRefClick = () => {
    inputFileRef.current?.click()
  }

  return (
    <DropZone handleDropFiles={handleDropFiles}>
      <div style={{ display: 'flex', height: '100%', flexDirection: 'column', width: '100%' }}>
        <div style={{ padding: '2rem 2rem', display: 'flex' }}>
          <div
            style={{
              display: 'flex',
              paddingLeft: '1rem',
              fontSize: '1rem',
              alignItems: 'center',
              background: 'rgba(0,0,0,0.045)',
              cursor: 'pointer',
              height: '50px',
              width: '100%',
            }}
            onClick={handleInputFileRefClick}
          >
            Upload file
          </div>
          <input
            onChange={handleFileInput}
            type="file"
            id="file"
            ref={inputFileRef}
            style={{ display: 'none' }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <Scrollbars>
            <div
              style={{
                display: 'grid',
                gap: '0.5rem',
                padding: '0 2rem 2rem',
                gridTemplateColumns: '1fr 1fr',
              }}
            >
              {uploading && <img width="100%" src={currentFile} alt="uploaded" />}

              {uploads.map(upload => (
                <div
                  key={upload.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={() => addImageToCanvas(upload.url)}
                >
                  <div>
                    <img width="100%" src={upload.url} alt="preview" />
                  </div>
                </div>
              ))}
            </div>
          </Scrollbars>
        </div>
      </div>
    </DropZone>
  )
}

export default Uploads

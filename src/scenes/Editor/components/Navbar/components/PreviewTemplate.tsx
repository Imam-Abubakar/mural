import { Button, KIND } from 'baseui/button'
import { Modal, ModalBody, SIZE } from 'baseui/modal'
import { useEffect, useState } from 'react'
import { ThemeProvider, LightTheme } from 'baseui'
import { flatten, uniq } from 'lodash'
import { useEditor } from '@nkyo/scenify-sdk'
import { FormControl } from 'baseui/form-control'
import { Input } from 'baseui/input'

function PreviewTemplate() {
  const [isOpen, setIsOpen] = useState(false)
  const editor = useEditor()
  const [options, setOptions] = useState<any>({})
  const [previewImage, setPreviewImage] = useState<any>(null)

  useEffect(() => {
    if (isOpen && editor) {
      const template = editor.exportToJSON()
      const keys = template.objects.map(object => {
        return object.metadata && object.metadata.keys ? object.metadata.keys : []
      })

      const params: Record<string, string> = {}
      const uniqElements = uniq(flatten(keys))
      uniqElements.forEach(key => {
        params[key] = ''
      })

      setOptions(params)
      if (uniqElements.length === 0) {
        handleBuildImage()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, editor])

  const handleBuildImage = async () => {
    // @ts-ignore
    const image = await editor.toPNG(options)
    setPreviewImage(image)
  }

  const close = () => {
    setIsOpen(false)
    setPreviewImage(null)
    setOptions({})
  }

  const handleDownloadImage = () => {
    if (editor) {
      if (previewImage) {
        const a = document.createElement('a')
        a.href = previewImage
        a.download = 'drawing.png'
        a.click()
      }
    }
  }

  return (
    <>
      <Button kind={KIND.primary} onClick={() => setIsOpen(true)}>
        Preview
      </Button>
      <ThemeProvider theme={LightTheme}>
        <Modal
          unstable_ModalBackdropScroll={true}
          overrides={{
            Dialog: {
              style: {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                backgroundColor: '#F9F9F9',
              },
            },
          }}
          onClose={close}
          isOpen={isOpen}
          size={SIZE.auto}
        >
          <ModalBody>
            <div>
              {previewImage ? (
                <div
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}
                >
                  <div style={{ fontWeight: 600, fontSize: '1rem', flex: 1, width: '100%' }}>
                    Preview Image
                  </div>
                  <img style={{ maxWidth: '1200px' }} src={previewImage} alt="preview" />
                  <Button onClick={() => handleDownloadImage()}>Download image</Button>
                </div>
              ) : (
                <div>
                  <div style={{ fontWeight: 500, fontSize: '1.2rem', paddingBottom: '1rem' }}>Params</div>
                  {Object.keys(options).map(option => {
                    return (
                      <FormControl key={option} label={option}>
                        <Input
                          key={option}
                          value={options[option]}
                          onChange={(e: any) => setOptions({ ...options, [option]: e.target.value })}
                        />
                      </FormControl>
                    )
                  })}
                  <Button onClick={() => handleBuildImage()}>Build Image</Button>
                </div>
              )}
            </div>
          </ModalBody>
        </Modal>
      </ThemeProvider>
    </>
  )
}

export default PreviewTemplate

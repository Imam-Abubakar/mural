import { useActiveObject, useEditor } from '@nkyo/scenify-sdk'
import { Button, KIND, SIZE } from 'baseui/button'
import { useEffect, useState } from 'react'

interface Options {
  isGroup: boolean
  multiple: boolean
}

function Locked() {
  const [options, setOptions] = useState<Options>({ isGroup: false, multiple: false })

  const editor = useEditor()
  const activeObject = useActiveObject()

  useEffect(() => {
    if (activeObject) {
      updateOptions(activeObject)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeObject])

  const updateOptions = (object: any) => {
    const { type } = object
    // @ts-ignore
    setOptions({ ...options, isGroup: type === 'group', multiple: !!activeObject._objects })
  }

  return (
    <>
      {options.multiple && (
        <>
          {options.isGroup ? (
            <Button
              onClick={() => {
                editor.ungroup()
                setOptions({ ...options, isGroup: false })
              }}
              size={SIZE.compact}
              kind={KIND.tertiary}
            >
              Ungroup
            </Button>
          ) : (
            <Button
              onClick={() => {
                editor.group()
                setOptions({ ...options, isGroup: true })
              }}
              size={SIZE.compact}
              kind={KIND.tertiary}
            >
              Group
            </Button>
          )}
        </>
      )}
    </>
  )
}

export default Locked

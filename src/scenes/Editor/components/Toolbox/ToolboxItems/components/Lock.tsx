import { useActiveObject, useEditor } from '@nkyo/scenify-sdk'
import { Button, SHAPE, KIND, SIZE } from 'baseui/button'
import { useEffect, useState } from 'react'
import Icons from '../../../Icons'

interface Options {
  locked: boolean
}

function Locked() {
  const [options, setOptions] = useState<Options>({ locked: false })

  const editor = useEditor()
  const activeObject = useActiveObject()

  useEffect(() => {
    if (activeObject) {
      updateOptions(activeObject)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeObject])

  const updateOptions = (object: any) => {
    const { locked } = object
    setOptions({ ...options, locked: !!locked })
  }

  return (
    <>
      {options.locked ? (
        <Button
          onClick={() => {
            setOptions({ ...options, locked: false })
            editor.unlock()
          }}
          size={SIZE.default}
          kind={KIND.tertiary}
          shape={SHAPE.square}
        >
          <Icons.Locked size={24} />
        </Button>
      ) : (
        <Button
          onClick={() => {
            setOptions({ ...options, locked: true })
            editor.lock()
          }}
          size={SIZE.default}
          kind={KIND.tertiary}
          shape={SHAPE.square}
        >
          <Icons.UnLocked size={24} />
        </Button>
      )}
    </>
  )
}

export default Locked

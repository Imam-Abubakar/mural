import { useEditor } from '@nkyo/scenify-sdk'
import { Button, SHAPE, KIND, SIZE } from 'baseui/button'
import Icons from '../../../Icons'

function Duplicate() {
  const editor = useEditor()
  return (
    <Button
      onClick={() => {
        editor.clone()
      }}
      size={SIZE.default}
      kind={KIND.tertiary}
      shape={SHAPE.square}
    >
      <Icons.Duplicate size={24} />
    </Button>
  )
}

export default Duplicate

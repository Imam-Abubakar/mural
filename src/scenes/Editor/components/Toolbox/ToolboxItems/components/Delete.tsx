import { useEditor } from '@nkyo/scenify-sdk'
import { Button, SHAPE, KIND, SIZE } from 'baseui/button'
import Icons from '../../../Icons'

function Delete() {
  const editor = useEditor()
  return (
    <Button onClick={() => editor.delete()} size={SIZE.default} kind={KIND.tertiary} shape={SHAPE.square}>
      <Icons.Delete size={24} />
    </Button>
  )
}

export default Delete

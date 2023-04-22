import { useEditor } from '@nkyo/scenify-sdk'
import { Button, SHAPE, KIND, SIZE } from 'baseui/button'
import Icons from '../../../Icons'

function CopyStyle() {
  const editor = useEditor()
  return (
    <Button onClick={() => editor.copyStyle()} size={SIZE.default} kind={KIND.tertiary} shape={SHAPE.square}>
      <Icons.CopyStyle size={24} />
    </Button>
  )
}

export default CopyStyle

import Icons from '../../Icons'
import { Button, SHAPE, KIND, SIZE } from 'baseui/button'
import useAppContext from '@/hooks/useAppContext'
import { SubMenuType } from '@/constants/editor'
import Common from './components/Common'
import Animate from './components/Animate'

function Image() {
  const { setActiveSubMenu } = useAppContext()

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1rem',
      }}
    >
      <div>
        <Button
          onClick={() => setActiveSubMenu(SubMenuType.COLOR)}
          size={SIZE.compact}
          kind={KIND.tertiary}
          shape={SHAPE.square}
        >
          <Icons.FillColor size={24} color="#000000" />
        </Button>
        <Animate />
      </div>
      <Common />
    </div>
  )
}

export default Image

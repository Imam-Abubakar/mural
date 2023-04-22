import { Button, KIND, SIZE } from 'baseui/button'
import useAppContext from '@/hooks/useAppContext'
import Icons from '../../../Icons'
import { SubMenuType } from '@/constants/editor'

function Animate() {
  const { setActiveSubMenu } = useAppContext()

  return (
    <Button
      overrides={{
        StartEnhancer: {
          style: {
            marginRight: '8px',
          },
        },
      }}
      startEnhancer={() => <Icons.TimeFast size={24} />}
      onClick={() => setActiveSubMenu(SubMenuType.ANIMATIONS)}
      size={SIZE.compact}
      kind={KIND.tertiary}
    >
      Animate
    </Button>
  )
}

export default Animate

import { SubMenuType } from '@/constants/editor'
import useAppContext from '@/hooks/useAppContext'
import { useEditorContext } from '@nkyo/scenify-sdk'
import { styled } from 'baseui'
import { useEffect } from 'react'
import PanelItems from './PanelItems'

const Container = styled('div', props => ({
  background: '#ffffff',
  width: '360px',
  flex: 'none',
  boxShadow: '1px 0px 1px rgba(0, 0, 0, 0.15)',
}))

function PanelsList() {
  const { activePanel, activeSubMenu, setActiveSubMenu } = useAppContext()
  const { activeObject } = useEditorContext()

  useEffect(() => {
    setActiveSubMenu(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeObject])

  const Component =
    (activeObject && activeSubMenu) || (!activeObject && activeSubMenu === SubMenuType.COLOR)
      ? PanelItems[activeSubMenu]
      : PanelItems[activePanel]

  return <Container>{Component && <Component />}</Container>
}

export default PanelsList

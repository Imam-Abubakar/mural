import { panelListItems } from '@/constants/app-options'
import useAppContext from '@/hooks/useAppContext'
import { styled } from 'baseui'
import PanelListItem from './PanelListItem'

const Container = styled('div', props => ({
  width: '84px',
  backgroundColor: props.$theme.colors.primary100,
}))

function PanelsList() {
  const { activePanel } = useAppContext()
  return (
    <Container>
      {panelListItems.map(panelListItem => (
        <PanelListItem
          label={panelListItem.name}
          name={panelListItem.name}
          key={panelListItem.name}
          icon={panelListItem.name}
          activePanel={activePanel}
        />
      ))}
    </Container>
  )
}

export default PanelsList

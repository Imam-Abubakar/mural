import Icons from '../../../Icons'
import { Button, KIND, SIZE } from 'baseui/button'
import { StatefulPopover, PLACEMENT } from 'baseui/popover'
import { useStyletron } from 'baseui'
import { useEditor } from '@nkyo/scenify-sdk'

function Position() {
  const editor = useEditor()
  return (
    <StatefulPopover
      focusLock
      placement={PLACEMENT.bottomRight}
      content={({ close }) => (
        <div>
          <div
            style={{
              width: '280px',
              background: '#ffffff',
              fontFamily: 'system-ui',
              fontSize: '0.875rem',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              padding: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <PositionItem onClick={editor.bringForward} icon="Forward" label="Forward" />
              <PositionItem onClick={editor.bringToFront} icon="ToFront" label="To Front" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <PositionItem onClick={editor.sendBackwards} icon="Backward" label="Backward" />
              <PositionItem onClick={editor.sendToBack} icon="ToBack" label="To Back" />
            </div>
          </div>
        </div>
      )}
    >
      <Button size={SIZE.compact} kind={KIND.tertiary}>
        Position
      </Button>
    </StatefulPopover>
  )
}
interface PositionItemProps {
  icon: string
  label: string
  onClick: Function
}
const PositionItem = ({ icon, label, onClick }: PositionItemProps) => {
  const Icon = Icons[icon]
  const [css] = useStyletron()
  return (
    <div
      onClick={() => onClick()}
      className={css({
        display: 'flex',
        alignItems: 'center',
        padding: '0.5rem',
        borderRadius: '4px',
        ':hover': {
          backgroundColor: 'rgba(0,0,0,0.05)',
          cursor: 'pointer',
        },
      })}
    >
      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <Icon size={24} />
        <div style={{ paddingLeft: '0.5rem' }}>{label}</div>
      </div>
    </div>
  )
}

export default Position

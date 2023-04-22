import { Button, KIND, SHAPE, SIZE } from 'baseui/button'
import { styled } from 'baseui'
import { Plus, CheckIndeterminate } from 'baseui/icon'
import { StatefulPopover, PLACEMENT } from 'baseui/popover'
import { Scrollbars } from 'react-custom-scrollbars'
import { useEditor, useEditorContext } from '@nkyo/scenify-sdk'

const Container = styled('div', props => ({
  backgroundColor: '#f6f7f9',
  display: 'flex',
  position: 'absolute',
  bottom: '20px',
  right: '20px',
}))

const zoomValues = [0.27, 0.5, 0.75, 0.92, 1, 1.25, 1.5, 1.75, 2, 3, 4, 5]

const ZoomItemContainer = styled('div', () => ({
  height: '38px',
  display: 'flex',
  alignItems: 'center',
  fontSize: '0.85rem',
  paddingLeft: '1rem',
  ':hover': {
    backgroundColor: 'rgba(0,0,0,0.075)',
    cursor: 'pointer',
  },
}))
function Footer() {
  const editor = useEditor()
  const { zoomRatio } = useEditorContext()
  return (
    <Container>
      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(0,0,0,0.1)' }}>
        <Button onClick={() => editor.zoomOut()} size={SIZE.compact} kind={KIND.tertiary}>
          <CheckIndeterminate size={20} />
        </Button>
        <StatefulPopover
          focusLock
          placement={PLACEMENT.top}
          content={({ close }) => (
            <div
              style={{
                backgroundColor: '#ffffff',
                width: '130px',
                fontFamily: 'system-ui',
                height: '240px',
                padding: '0.5rem 0',
              }}
            >
              <Scrollbars>
                <ZoomItemContainer
                  onClick={() => {
                    editor.zoomToFit()
                    close()
                  }}
                >
                  Fit canvas
                </ZoomItemContainer>
                {zoomValues.map(zv => (
                  <ZoomItemContainer
                    onClick={() => {
                      editor.zoomToRatio(zv)
                      close()
                    }}
                    key={zv}
                  >
                    {Math.round(zv * 100) + '%'}
                  </ZoomItemContainer>
                ))}
              </Scrollbars>
            </div>
          )}
        >
          <Button
            overrides={{
              BaseButton: {
                style: {
                  borderRightColor: 'rgba(0,0,0,0.1)',
                  borderRightStyle: 'solid',
                  borderRightWidth: '1px',
                  borderLeftColor: 'rgba(0,0,0,0.1)',
                  borderLeftStyle: 'solid',
                  borderLeftWidth: '1px',
                  fontSize: '14px',
                },
              },
            }}
            shape={SHAPE.default}
            size={SIZE.compact}
            kind={KIND.tertiary}
          >
            {Math.round(zoomRatio * 100) + '%'}
          </Button>
        </StatefulPopover>
        <Button onClick={() => editor.zoomIn()} size={SIZE.compact} kind={KIND.tertiary}>
          <Plus size={20} />
        </Button>
      </div>
    </Container>
  )
}

export default Footer

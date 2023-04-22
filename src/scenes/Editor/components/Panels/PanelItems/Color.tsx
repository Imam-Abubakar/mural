import { useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { Input } from 'baseui/input'
import Icons from '@components/icons'
import { useActiveObject, useEditor } from '@nkyo/scenify-sdk'
import { HexColorPicker } from 'react-colorful'
import { StatefulPopover, PLACEMENT } from 'baseui/popover'
import { Plus } from 'baseui/icon'
import throttle from 'lodash/throttle'
import { gradients } from '@/constants/editor'

const colors = [
  '#f19066',
  '#f5cd79',
  '#546de5',
  '#e15f41',
  '#c44569',
  '#574b90',
  '#f78fb3',
  '#3dc1d3',
  '#e66767',
  '#303952',
]
function Color() {
  const [color, setColor] = useState('#b32aa9')
  const [value, setValue] = useState('')
  const editor = useEditor()
  const activeObject = useActiveObject()

  const updateObjectFill = throttle((color: string) => {
    if (activeObject) {
      editor.update({ fill: color })
    } else {
      editor.background.setBackgroundColor(color)
    }
    setColor(color)
  }, 100)

  const updateObjectGradient = throttle((gradient: any) => {
    if (activeObject) {
      editor.setGradient(gradient)
    } else {
      editor.background.setGradient(gradient)
    }
    setColor(color)
  }, 100)

  return (
    <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
      <div style={{ padding: '2rem 2rem' }}>
        <Input
          startEnhancer={() => <Icons.Search size={18} />}
          value={value}
          onChange={e => setValue((e.target as any).value)}
          placeholder="Search color"
          clearOnEscape
        />
      </div>
      <div style={{ flex: 1 }}>
        <Scrollbars>
          <div style={{ padding: '0 2rem 2rem' }}>
            <div style={{ padding: '0.5rem 0', cursor: 'default', fontSize: '0.96rem' }}>Document colors</div>
            <StatefulPopover
              placement={PLACEMENT.bottomLeft}
              content={
                <div
                  style={{
                    padding: '1rem',
                    background: '#ffffff',
                    width: '200px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    textAlign: 'center',
                  }}
                >
                  <HexColorPicker onChange={updateObjectFill} />
                  <Input
                    overrides={{ Input: { style: { textAlign: 'center' } } }}
                    value={color}
                    onChange={e => setValue((e.target as any).value)}
                    placeholder="#000000"
                    clearOnEscape
                  />
                </div>
              }
              accessibilityType={'tooltip'}
            >
              <div>
                <div
                  style={{
                    height: '40px',
                    width: '40px',
                    backgroundSize: '100% 100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    backgroundImage:
                      'url("https://static.canva.com/web/images/788ee7a68293bd0264fc31f22c31e62d.png")',
                  }}
                >
                  <div
                    style={{
                      height: '32px',
                      width: '32px',
                      background: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.3rem',
                    }}
                  >
                    <Plus size={24} />
                  </div>
                </div>
              </div>
            </StatefulPopover>
          </div>
          <div style={{ padding: '0 2rem 0' }}>
            <div style={{ cursor: 'default', padding: '0.5rem 0', fontSize: '0.96rem' }}>Basic</div>
          </div>

          <div
            style={{
              display: 'grid',
              gap: '0.5rem',
              padding: '0 2rem 2rem',
              gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
            }}
          >
            {colors.map(color => (
              <div
                onClick={() => updateObjectFill(color)}
                key={color}
                style={{ height: '42px', background: color, borderRadius: '4px', cursor: 'pointer' }}
              ></div>
            ))}
          </div>

          <div style={{ padding: '0 2rem 0' }}>
            <div style={{ cursor: 'default', padding: '0.5rem 0', fontSize: '0.96rem' }}>Gradient</div>
          </div>

          <div
            style={{
              display: 'grid',
              gap: '0.5rem',
              padding: '0 2rem 2rem',
              gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
            }}
          >
            {gradients.map((gradient, index) => (
              <div
                onClick={() => updateObjectGradient(gradient)}
                key={index}
                style={{
                  height: '42px',
                  background: `linear-gradient(to right, ${gradient.colors[0]}, ${gradient.colors[1]})`,
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              ></div>
            ))}
          </div>
        </Scrollbars>
      </div>
    </div>
  )
}

export default Color

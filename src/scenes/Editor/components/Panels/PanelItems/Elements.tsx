import { Input } from 'baseui/input'
import Icons from '@components/icons'
import { Scrollbars } from 'react-custom-scrollbars'
import { useState } from 'react'
import { useEditor } from '@nkyo/scenify-sdk'
import { useSelector } from 'react-redux'
import { selectElements } from '@/store/slices/elements/selectors'

function Panel() {
  const [value, setValue] = useState('')
  const elements = useSelector(selectElements)
  const editor = useEditor()
  return (
    <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
      <div style={{ padding: '2rem 2rem' }}>
        <Input
          startEnhancer={() => <Icons.Search size={18} />}
          value={value}
          onChange={e => setValue((e.target as any).value)}
          placeholder="Search elements"
          clearOnEscape
        />
      </div>
      <div style={{ flex: 1 }}>
        <Scrollbars>
          <div
            style={{ display: 'grid', gap: '1.5rem', padding: '0 2rem 2rem', gridTemplateColumns: '1fr 1fr' }}
          >
            {elements.map(element => (
              <div
                key={element.id}
                style={{
                  alignItems: 'center',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'center',
                }}
                onClick={() => editor.add(element)}
              >
                <img
                  style={{ margin: 'auto', transform: 'scale(0.9, 0.9)' }}
                  src={element.metadata.preview || 'https://via.placeholder.com/150'}
                  alt="preview"
                  height="80px"
                />
              </div>
            ))}
          </div>
        </Scrollbars>
      </div>
    </div>
  )
}

export default Panel

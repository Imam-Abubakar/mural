import { useEditor } from '@nkyo/scenify-sdk'
import { Scrollbars } from 'react-custom-scrollbars'
import { Input } from 'baseui/input'
import Icons from '@components/icons'
import { useState } from 'react'

function Panel() {
  const [value, setValue] = useState('')

  const editor = useEditor()

  const addStaticText = () => {
    const options = {
      type: 'StaticText',
      width: 320,
      metadata: {
        text: 'Add static text',
        fontSize: 32,
        fontWeight: 500,
        fontFamily: 'Amiko',
        textAlign: 'center',
        fontURL: 'https://fonts.gstatic.com/s/amiko/v5/WwkQxPq1DFK04tqlc17MMZgJ.ttf',
      },
    }
    editor.add(options)
  }

  const addDynamicText = () => {
    const options = {
      type: 'DynamicText',
      width: 320,
      metadata: {
        text: 'Add dynamic text',
        fontSize: 32,
        fontWeight: 500,
        fontFamily: 'Lexend',
        textAlign: 'center',
      },
    }
    editor.add(options)
  }

  return (
    <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
      <div style={{ padding: '2rem 2rem' }}>
        <Input
          startEnhancer={() => <Icons.Search size={18} />}
          value={value}
          onChange={e => setValue((e.target as any).value)}
          placeholder="Search text"
          clearOnEscape
        />
      </div>
      <div style={{ flex: 1 }}>
        <Scrollbars>
          <div
            style={{
              display: 'grid',
              gridTemplateRows: '50px 50px 50px',
              padding: '0 2rem',
              gap: '0.5rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                paddingLeft: '1rem',
                fontSize: '1rem',
                alignItems: 'center',
                background: 'rgba(0,0,0,0.045)',
                cursor: 'pointer',
              }}
              onClick={addStaticText}
            >
              Add static text
            </div>
            <div
              style={{
                display: 'flex',
                paddingLeft: '1rem',
                fontSize: '1rem',
                alignItems: 'center',
                background: 'rgba(0,0,0,0.045)',
                cursor: 'pointer',
              }}
              onClick={addDynamicText}
            >
              Add dynamic text
            </div>
          </div>
        </Scrollbars>
      </div>
    </div>
  )
}

export default Panel

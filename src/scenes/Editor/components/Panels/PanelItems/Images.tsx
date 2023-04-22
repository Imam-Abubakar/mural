import { useCallback, useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { Input } from 'baseui/input'
import Icons from '@components/icons'
import { useEditor } from '@nkyo/scenify-sdk'

function Images() {
  const [search, setSearch] = useState('')

  const editor = useEditor()

  const addDynamicImage = useCallback(() => {
    if (editor) {
      const objectOptions = {
        width: 100,
        height: 100,
        backgroundColor: '#bdc3c7',
        type: 'DynamicImage',

        metadata: {
          keyValues: [{ key: '{{image}}', value: '' }],
        },
      }
      editor.add(objectOptions)
    }
  }, [editor])

  return (
    <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
      <div style={{ padding: '2rem 2rem' }}>
        <Input
          startEnhancer={() => <Icons.Search size={18} />}
          value={search}
          onChange={e => setSearch((e.target as any).value)}
          placeholder="Search images"
          clearOnEscape
        />
      </div>
      <div style={{ flex: 1 }}>
        <Scrollbars>
          <div style={{ display: 'grid', gap: '0.5rem', padding: '0 2rem 2rem' }}>
            <div
              style={{
                display: 'flex',
                paddingLeft: '1rem',
                fontSize: '1rem',
                alignItems: 'center',
                background: 'rgba(0,0,0,0.045)',
                cursor: 'pointer',
                height: '50px',
              }}
              onClick={addDynamicImage}
            >
              Add dynamic image
            </div>
          </div>
        </Scrollbars>
      </div>
    </div>
  )
}

export default Images

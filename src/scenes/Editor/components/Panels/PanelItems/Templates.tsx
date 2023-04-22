import { useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { Input } from 'baseui/input'
import Icons from '@components/icons'
import { useEditor } from '@nkyo/scenify-sdk'
import { useSelector } from 'react-redux'
import { selectTemplates } from '@/store/slices/templates/selectors'

function Templates() {
  const templates = useSelector(selectTemplates)
  const [value, setValue] = useState('')
  const editor = useEditor()

  const handleLoadTemplate = async template => {
    console.log('LOAD TEMPLATE')
    const fonts = []
    template.objects.forEach(object => {
      if (object.type === 'StaticText' || object.type === 'DynamicText') {
        fonts.push({
          name: object.metadata.fontFamily,
          url: object.metadata.fontURL,
          options: { style: 'normal', weight: 400 },
        })
      }
    })
    const filteredFonts = fonts.filter(f => !!f.url)
    if (filteredFonts.length > 0) {
      await loadFonts(filteredFonts)
    }
    editor.importFromJSON(template)
  }

  const loadFonts = fonts => {
    const promisesList = fonts.map(font => {
      // @ts-ignore
      return new FontFace(font.name, `url(${font.url})`, font.options).load().catch(err => err)
    })
    return new Promise((resolve, reject) => {
      Promise.all(promisesList)
        .then(res => {
          res.forEach(uniqueFont => {
            // @ts-ignore
            if (uniqueFont && uniqueFont.family) {
              // @ts-ignore
              document.fonts.add(uniqueFont)
              resolve(true)
            }
          })
        })
        .catch(err => reject(err))
    })
  }

  return (
    <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
      <div style={{ padding: '2rem 2rem' }}>
        <Input
          startEnhancer={() => <Icons.Search size={18} />}
          value={value}
          onChange={e => setValue((e.target as any).value)}
          placeholder="Search templates"
          clearOnEscape
        />
      </div>
      <div style={{ flex: 1 }}>
        <Scrollbars>
          <div
            style={{ display: 'grid', gap: '0.5rem', padding: '0 2rem 2rem', gridTemplateColumns: '1fr 1fr' }}
          >
            {templates.map(template => (
              <div
                key={template.id}
                style={{
                  alignItems: 'center',
                  cursor: 'pointer',
                  border: '1px solid rgba(0,0,0,0.2)',
                  padding: '5px',
                }}
                onClick={() => handleLoadTemplate(template)}
              >
                <img width="100%" src={`${template.preview}?tr=w-320`} alt="preview" />
              </div>
            ))}
          </div>
        </Scrollbars>
      </div>
    </div>
  )
}

export default Templates

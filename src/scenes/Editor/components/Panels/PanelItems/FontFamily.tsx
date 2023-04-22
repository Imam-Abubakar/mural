import { useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { Input } from 'baseui/input'
import Icons from '@components/icons'
import { useEditor } from '@nkyo/scenify-sdk'
import { styled } from 'baseui'
import { useSelector } from 'react-redux'
import { selectFonts } from '@/store/slices/fonts/selectors'
import { IFontFamily } from '@/interfaces/editor'

function FontFamily() {
  const [value, setValue] = useState('')
  const fonts = useSelector(selectFonts)
  const editor = useEditor()
  const handleFontFamilyChange = async (fontFamily: IFontFamily) => {
    if (editor) {
      const fontFile = fontFamily.files['regular' as any]
      const font = {
        name: fontFamily.family,
        url: fontFile,
        options: { style: 'normal', weight: 400 },
      }
      // @ts-ignore
      const fontFace = new FontFace(font.name, `url(${font.url})`, font.options)
      fontFace
        .load()
        .then(loadedFont => {
          document.fonts.add(loadedFont)
          fontFace.loaded.then(() => {
            editor.update({
              fontFamily: fontFamily.family,
              metadata: {
                fontURL: font.url,
              },
            })
          })
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
      <div style={{ padding: '2rem 2rem' }}>
        <Input
          startEnhancer={() => <Icons.Search size={18} />}
          value={value}
          onChange={e => setValue((e.target as any).value)}
          placeholder="Search font"
          clearOnEscape
        />
      </div>
      <div style={{ flex: 1 }}>
        <Scrollbars>
          <div style={{ display: 'grid', padding: '0.5rem 2rem 2rem' }}>
            {fonts.map(font => (
              <FontItem onClick={() => handleFontFamilyChange(font)} key={font.id}>
                {font.family}
              </FontItem>
            ))}
          </div>
        </Scrollbars>
      </div>
    </div>
  )
}

const FontItem = styled('div', props => ({
  cursor: 'pointer',
  padding: '14px 5px 14px 5px',
  ':hover': {
    background: 'rgba(0,0,0,0.045)',
  },
}))

export default FontFamily

import { useEffect, useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { Input } from 'baseui/input'
import Icons from '@components/icons'
import { useEditor } from '@nkyo/scenify-sdk'
import { useDebounce } from 'use-debounce'
import { getImage, getImages } from '@/services/iconscout'

function Illustrations() {
  const [search, setSearch] = useState('')
  const [objects, setObjects] = useState<any[]>([])
  const [value] = useDebounce(search, 1000)

  const editor = useEditor()
  useEffect(() => {
    getImages('people')
      .then((data: any) => setObjects(data))
      .catch(console.log)
  }, [])

  useEffect(() => {
    if (value) {
      getImages(value)
        .then((data: any) => setObjects(data))
        .catch(console.log)
    }
  }, [value])
  const downloadImage = uuid => {
    getImage(uuid)
      .then(url => {
        const options = {
          type: 'StaticVector',
          metadata: { src: url },
        }
        editor.add(options)
      })
      .catch(console.log)
  }

  return (
    <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
      <div style={{ padding: '2rem 2rem' }}>
        <Input
          startEnhancer={() => <Icons.Search size={18} />}
          value={search}
          onChange={e => setSearch((e.target as any).value)}
          placeholder="Search illustrations"
          clearOnEscape
        />
      </div>
      <div style={{ flex: 1 }}>
        <Scrollbars>
          <div
            style={{ display: 'grid', gap: '0.5rem', padding: '0 2rem 2rem', gridTemplateColumns: '1fr 1fr' }}
          >
            {objects.map(obj => (
              <div
                key={obj.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  justifyContent: 'center',
                }}
                onClick={() => downloadImage(obj.uuid)}
              >
                <img width="80%" src={obj.urls.thumb} alt="svg object" />
              </div>
            ))}
          </div>
        </Scrollbars>
      </div>
    </div>
  )
}

export default Illustrations

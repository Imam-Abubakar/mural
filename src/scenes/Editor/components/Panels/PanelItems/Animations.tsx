import { StatefulTabs, Tab } from 'baseui/tabs'
import { Scrollbars } from 'react-custom-scrollbars'
import { useEditor } from '@nkyo/scenify-sdk'
import Anims from "@assets/animation.jpg"

const animations = [
  {
    type: 'NONE',
    name: 'None',
    preview: ' ',
  },
  {
    type: 'STOMP',
    name: 'Stomp',
    preview: ' ',
  },
  {
    type: 'TUMBLE',
    name: 'Tumble',
    preview: ' ',
  },
  {
    type: 'RISE',
    name: 'Rise',
    preview: ' ',
  },
  {
    type: 'PAN',
    name: 'Pan',
    preview: ' ',
  },
  {
    type: 'FADE',
    name: 'Fade',
    preview: ' ',
  },
  {
    type: 'BREATHE',
    name: 'Breathe',
    preview: ' ',
  },
]

function Panel() {
  const editor = useEditor()

  return (
    <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
      <Scrollbars>
        <StatefulTabs
          overrides={{
            TabBar: {
              style: {
                justifyContent: 'center',
              },
            },
            Tab: {
              style: {
                paddingRight: '16px',
                paddingLeft: '16px',
              },
            },
          }}
          initialState={{ activeKey: '1' }}
        >
          <Tab title="Page animations">Page animations</Tab>
          <Tab title="Element animations">
            <div
              style={{
                display: 'grid',
                gap: '0.5rem',
                gridTemplateColumns: '1fr 1fr 1fr',
              }}
            >
              {animations.map(animation => {
                return (
                  <div
                    key={animation.name}
                    onClick={() => editor.animate(animation.type)}
                    style={{
                      alignItems: 'center',
                      cursor: 'pointer',
                      padding: '10px',
                      display: 'flex',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      fontSize: '12px',
                    }}
                  >
                    <img
                      width="60px"
                      src={Anims}
                      alt="preview"
                      height="60px"
                    />
                    <div> {animation.name}</div>
                  </div>
                )
              })}
            </div>
          </Tab>
          {/* <Tab title="Tab Link 3">Tab 3 content</Tab> */}
        </StatefulTabs>
      </Scrollbars>
    </div>
  )
}

export default Panel

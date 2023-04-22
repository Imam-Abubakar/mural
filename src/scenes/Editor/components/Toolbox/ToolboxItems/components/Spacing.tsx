import Icons from '../../../Icons'
import { Button, SHAPE, KIND, SIZE } from 'baseui/button'
import { StatefulPopover, PLACEMENT } from 'baseui/popover'
import { Input } from 'baseui/input'
import { Slider } from 'baseui/slider'
import { useActiveObject, useEditor } from '@nkyo/scenify-sdk'
import { useEffect, useState } from 'react'

interface Options {
  charSpacing: number
  lineHeight: number
}

function Spacing() {
  const activeObject = useActiveObject()
  const [options, setOptions] = useState<Options>({ charSpacing: 0, lineHeight: 0 })

  const editor = useEditor()
  useEffect(() => {
    updateOptions(activeObject)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeObject])

  useEffect(() => {
    if (activeObject) {
      updateOptions(activeObject)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeObject])

  const updateOptions = (object: any) => {
    const { charSpacing, lineHeight } = object
    setOptions({ ...options, charSpacing: charSpacing / 10, lineHeight: lineHeight * 10 })
  }

  const handleChange = (type: string, value: number[]) => {
    if (editor) {
      if (type === 'charSpacing') {
        setOptions({ ...options, [type]: value[0] })

        editor.update({
          [type]: value[0] * 10,
        })
      } else {
        setOptions({ ...options, [type]: value[0] })

        editor.update({
          [type]: value[0] / 10,
        })
      }
    }
  }

  return (
    <StatefulPopover
      focusLock
      placement={PLACEMENT.bottom}
      content={({ close }) => (
        <div
          style={{
            width: '420px',
            background: '#ffffff',
            fontFamily: 'Poppins',
            fontSize: '14px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <div
            style={{
              display: 'grid',
              flexDirection: 'row',
              alignItems: 'center',
              gridTemplateColumns: '100px 1fr 52px',
            }}
          >
            <div>Letter spacing</div>
            <div>
              <Slider
                overrides={{
                  InnerThumb: () => null,
                  ThumbValue: () => null,
                  TickBar: () => null,
                  Thumb: {
                    style: {
                      height: '12px',
                      width: '12px',
                    },
                  },
                }}
                min={-20}
                max={100}
                marks={false}
                value={[options.charSpacing]}
                onChange={({ value }) => handleChange('charSpacing', value)}
              />
            </div>
            <div>
              <Input
                overrides={{
                  Input: {
                    style: {
                      backgroundColor: '#ffffff',
                      textAlign: 'center',
                    },
                  },
                  Root: {
                    style: {
                      borderBottomColor: 'rgba(0,0,0,0.45)',
                      borderTopColor: 'rgba(0,0,0,0.45)',
                      borderRightColor: 'rgba(0,0,0,0.45)',
                      borderLeftColor: 'rgba(0,0,0,0.45)',
                      borderTopWidth: '1px',
                      borderBottomWidth: '1px',
                      borderRightWidth: '1px',
                      borderLeftWidth: '1px',
                    },
                  },
                  InputContainer: {},
                }}
                size={SIZE.mini}
                onChange={() => {}}
                value={Math.round(options.charSpacing)}
              />
            </div>
          </div>
          <div
            style={{
              display: 'grid',
              flexDirection: 'row',
              alignItems: 'center',
              gridTemplateColumns: '100px 1fr 52px',
            }}
          >
            <div>Line height</div>
            <div>
              <Slider
                overrides={{
                  InnerThumb: () => null,
                  ThumbValue: () => null,
                  TickBar: () => null,
                  Thumb: {
                    style: {
                      height: '12px',
                      width: '12px',
                    },
                  },
                }}
                min={0}
                max={100}
                marks={false}
                value={[options.lineHeight]}
                onChange={({ value }) => handleChange('lineHeight', value)}
              />
            </div>
            <div>
              <Input
                overrides={{
                  Input: {
                    style: {
                      backgroundColor: '#ffffff',
                      textAlign: 'center',
                    },
                  },
                  Root: {
                    style: {
                      borderBottomColor: 'rgba(0,0,0,0.45)',
                      borderTopColor: 'rgba(0,0,0,0.45)',
                      borderRightColor: 'rgba(0,0,0,0.45)',
                      borderLeftColor: 'rgba(0,0,0,0.45)',
                      borderTopWidth: '1px',
                      borderBottomWidth: '1px',
                      borderRightWidth: '1px',
                      borderLeftWidth: '1px',
                    },
                  },
                  InputContainer: {},
                }}
                size={SIZE.mini}
                onChange={() => {}}
                value={Math.round(options.lineHeight)}
              />
            </div>
          </div>
        </div>
      )}
    >
      <Button size={SIZE.default} kind={KIND.tertiary} shape={SHAPE.square}>
        <Icons.Spacing size={24} />
      </Button>
    </StatefulPopover>
  )
}

export default Spacing

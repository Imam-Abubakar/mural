import Icons from '../../../Icons'
import { Input } from 'baseui/input'
import { Button, SHAPE, KIND, SIZE } from 'baseui/button'
import { StatefulPopover, PLACEMENT } from 'baseui/popover'
import { Slider } from 'baseui/slider'
import { useActiveObject, useEditor } from '@nkyo/scenify-sdk'
import { useEffect, useState } from 'react'

function Opacity() {
  const [value, setValue] = useState([1])
  const activeObject = useActiveObject()
  const editor = useEditor()
  useEffect(() => {
    updateOptions(activeObject)
  }, [activeObject])

  useEffect(() => {
    const handleChanges = () => {
      updateOptions(activeObject)
    }
    editor.on('history:changed', handleChanges)
    return () => {
      editor.off('history:changed', handleChanges)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor])

  const updateOptions = (object: fabric.IObjectOptions) => {
    const updatedValue = [object.opacity * 100]
    setValue(updatedValue)
  }

  const updateOpacity = (value: number[]) => {
    const opacityValue = value[0] / 100
    editor.update({ opacity: opacityValue })
  }

  return (
    <StatefulPopover
      focusLock
      placement={PLACEMENT.bottomRight}
      content={({ close }) => (
        <div
          style={{
            width: '380px',
            background: '#ffffff',
            fontFamily: 'Poppins',
            padding: '1.5rem',
            fontSize: '14px',
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
            <div>Transparency</div>
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
              value={value}
              onChange={({ value }) => updateOpacity(value)}
            />
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
                value={Math.round(value[0])}
              />
            </div>
          </div>
        </div>
      )}
    >
      <Button size={SIZE.default} kind={KIND.tertiary} shape={SHAPE.square}>
        <Icons.Opacity size={24} />
      </Button>
    </StatefulPopover>
  )
}

export default Opacity

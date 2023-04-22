import Icons from '../../Icons'
import { Button, SHAPE, KIND, SIZE } from 'baseui/button'
import { ChevronDown } from 'baseui/icon'
import useAppContext from '@/hooks/useAppContext'
import { SubMenuType } from '@/constants/editor'
import { useEffect, useState } from 'react'
import { useActiveObject, useEditor } from '@nkyo/scenify-sdk'
import { StatefulPopover, PLACEMENT } from 'baseui/popover'
import { StatefulMenu } from 'baseui/menu'
import Spacing from './components/Spacing'
import Common from './components/Common'
import Animate from './components/Animate'

interface TextOptions {
  fontFamily: string
  fontSize: number
  fontWeight: string | number
  opacity: number[]
  italic: string
  textAligh: string
  underline: string
  fill: string
}

const defaultOptions = {
  fontFamily: 'Open Sans',
  fontWeight: 'normal',
  fontSize: 12,
  opacity: [1],
  italic: 'true',
  textAligh: 'center',
  underline: 'true',
  fill: '#000000',
}

const ITEMS = [
  { label: 8 },
  { label: 10 },
  { label: 12 },
  { label: 14 },
  { label: 16 },
  { label: 18 },
  { label: 20 },
  { label: 22 },
  { label: 24 },
  { label: 32 },
  { label: 36 },
  { label: 64 },
]

function Text() {
  const { setActiveSubMenu } = useAppContext()
  const activeObject = useActiveObject<fabric.TextOptions>()
  const [options, setOptions] = useState<TextOptions>(defaultOptions)
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

  const updateOptions = (object: fabric.TextOptions) => {
    const textOptions = ({
      fontFamily: object.fontFamily,
      fontSize: object.fontSize,
      fontWeight: object.fontWeight,
      opacity: [object.opacity * 100],
      italic: object.fontStyle,
      textAligh: object.textAlign,
      underline: object.underline,
      fill: object.fill,
    } as unknown) as TextOptions
    setOptions(textOptions)
  }

  const checkBold = (value: string | number) => {
    return value === 'bold' || value === 700
  }

  const toggleBold = () => {
    const isBold = checkBold(options.fontWeight)
    editor.update({ fontWeight: isBold ? 400 : 700 })
  }

  const toggleUnderline = () => {
    editor.update({ underline: activeObject.underline ? false : true })
  }

  const checkIsItalic = (value: string) => {
    const isItalic = value === 'italic'
    return isItalic
  }

  const toggleItalic = () => {
    const isItalic = checkIsItalic(activeObject.fontStyle)
    editor.update({ fontStyle: isItalic ? 'normal' : 'italic' })
  }

  const getNextTextAlign = (current: string) => {
    const positions = ['left', 'center', 'right', 'left']
    const currentIndex = positions.findIndex(v => v === current)
    const nextAlign = positions[currentIndex + 1]
    return nextAlign
  }

  const toggleTextAlign = () => {
    const currentValue = activeObject.textAlign
    const nextTextAlign = getNextTextAlign(currentValue)
    editor.update({ textAlign: nextTextAlign })
  }

  const getTextAlignIcon = () => {
    const currentValue = activeObject.textAlign
    const Icon =
      currentValue === 'left'
        ? Icons.TextAlignLeft
        : currentValue === 'center'
        ? Icons.TextAlignCenter
        : currentValue === 'right'
        ? Icons.TextAlignRight
        : Icons.TextAlignJustify
    return Icon
  }

  const updateFontSize = (value: number) => {
    editor.update({ fontSize: value })
  }

  const TextAlignIcon = getTextAlignIcon()
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Button
          onClick={() => setActiveSubMenu(SubMenuType.FONT_FAMILY)}
          overrides={{
            BaseButton: {
              style: {
                borderBottomColor: 'rgba(0,0,0,0.2)',
                borderBottomStyle: 'solid',
                borderBottomWidth: '1px',
                borderTopColor: 'rgba(0,0,0,0.2)',
                borderTopStyle: 'solid',
                borderTopWidth: '1px',
                borderRightColor: 'rgba(0,0,0,0.2)',
                borderRightStyle: 'solid',
                borderRightWidth: '1px',
                borderLeftColor: 'rgba(0,0,0,0.2)',
                borderLeftStyle: 'solid',
                borderLeftWidth: '1px',
                fontSize: '14px',
              },
            },
          }}
          kind={KIND.tertiary}
          size={SIZE.mini}
          endEnhancer={() => <ChevronDown size={24} />}
        >
          {options.fontFamily}
        </Button>

        <StatefulPopover
          focusLock
          placement={PLACEMENT.bottomLeft}
          content={({ close }) => (
            <StatefulMenu
              items={ITEMS}
              onItemSelect={event => {
                updateFontSize(event.item.label)
                close()
              }}
              overrides={{
                List: { style: { width: '72px', textAlign: 'center', height: '240px' } },
              }}
            />
          )}
        >
          <Button
            overrides={{
              BaseButton: {
                style: {
                  borderBottomColor: 'rgba(0,0,0,0.2)',
                  borderBottomStyle: 'solid',
                  borderBottomWidth: '1px',
                  borderTopColor: 'rgba(0,0,0,0.2)',
                  borderTopStyle: 'solid',
                  borderTopWidth: '1px',
                  borderRightColor: 'rgba(0,0,0,0.2)',
                  borderRightStyle: 'solid',
                  borderRightWidth: '1px',
                  borderLeftColor: 'rgba(0,0,0,0.2)',
                  borderLeftStyle: 'solid',
                  borderLeftWidth: '1px',
                  fontSize: '14px',
                },
              },
            }}
            kind={KIND.tertiary}
            size={SIZE.mini}
            endEnhancer={() => <ChevronDown size={24} />}
          >
            {Math.round(activeObject.fontSize)}
          </Button>
        </StatefulPopover>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            onClick={() => setActiveSubMenu(SubMenuType.COLOR)}
            size={SIZE.compact}
            kind={KIND.tertiary}
            shape={SHAPE.square}
          >
            <Icons.TextColor color={options.fill} size={24} />
          </Button>
          <Button
            onClick={toggleBold}
            overrides={{
              BaseButton: { style: { color: checkBold(options.fontWeight) ? '#000000' : '#afafaf' } },
            }}
            size={SIZE.compact}
            kind={KIND.tertiary}
            shape={SHAPE.square}
          >
            <Icons.Bold size={24} />
          </Button>
          <Button
            overrides={{
              BaseButton: { style: { color: checkIsItalic(activeObject.fontStyle) ? '#000000' : '#afafaf' } },
            }}
            onClick={toggleItalic}
            size={SIZE.compact}
            kind={KIND.tertiary}
            shape={SHAPE.square}
          >
            <Icons.Italic size={24} />
          </Button>
          <Button
            overrides={{
              BaseButton: { style: { color: activeObject.underline ? '#000000' : '#afafaf' } },
            }}
            onClick={toggleUnderline}
            size={SIZE.compact}
            kind={KIND.tertiary}
            shape={SHAPE.square}
          >
            <Icons.Underline size={24} />
          </Button>
          <div
            style={{ height: '30px', width: '1px', backgroundColor: 'rgba(0,0,0,0.1)', margin: '0 0.35rem' }}
          />
          <Button onClick={toggleTextAlign} size={SIZE.compact} kind={KIND.tertiary} shape={SHAPE.square}>
            <TextAlignIcon size={24} />
          </Button>
          <div
            style={{ height: '30px', width: '1px', backgroundColor: 'rgba(0,0,0,0.1)', margin: '0 0.35rem' }}
          />
          <Spacing />
          <Animate />
        </div>
      </div>
      <Common />
    </div>
  )
}

export default Text

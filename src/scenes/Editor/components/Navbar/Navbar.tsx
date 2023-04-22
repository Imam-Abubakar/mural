import { styled, ThemeProvider, DarkTheme } from 'baseui'
import { Button, KIND } from 'baseui/button'
import { Input } from 'baseui/input'
import Icons from '../Icons'
import { useEditor } from '@nkyo/scenify-sdk'
import { useEffect, useState } from 'react'
import useAppContext from '@/hooks/useAppContext'
import Resize from './components/Resize'
import PreviewTemplate from './components/PreviewTemplate'
import { useHistory, useParams } from 'react-router-dom'

import api from '@/services/api'
import { useAppDispatch } from '@/store/store'
import { setCreations, updateCreationsList } from '@/store/slices/creations/actions'
import History from './components/History'
const Container = styled('div', props => ({
  height: '70px',
  background: props.$theme.colors.background,
  display: 'flex',
  padding: '0 0.5rem',
  justifyContent: 'space-between',
  alignItems: 'center',
}))

function useParamId() {
  const params: { id: string | undefined } = useParams()
  const [id, setId] = useState('')
  useEffect(() => {
    const id = params.id ? params.id : ''
    setId(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])
  return id
}

function NavbarEditor() {
  const editor = useEditor()
  const { currentTemplate } = useAppContext()
  const history = useHistory()
  const [name, setName] = useState('Untitled design')
  const id = useParamId()
  const dispatch = useAppDispatch()
  const actionText = id ? 'Update' : 'Create'
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    if (editor) {
      setSaving(true)
      if (id) {
        const exportedTemplate = editor.exportToJSON()
        const savedTemplate = await api.updateCreation(id, { ...exportedTemplate, name })
        dispatch(updateCreationsList(savedTemplate))
      } else {
        const exportedTemplate = editor.exportToJSON()
        const savedTemplate = await api.createCreation({ ...exportedTemplate, name })
        dispatch(setCreations([savedTemplate]))
        history.push(`/edit/${savedTemplate.id}`)
      }
      setSaving(false)
    }
  }

  const handleSaveAsTemplate = async () => {
    const exportedTemplate = editor.exportToJSON()
    const savedTemplate = await api.createTemplate(exportedTemplate)
    console.log({ savedTemplate })
  }

  useEffect(() => {
    if (currentTemplate) {
      setName(currentTemplate.name)
    }
  }, [currentTemplate])

  return (
    <ThemeProvider theme={DarkTheme}>
      <Container>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button
  
            startEnhancer={<Icons.ChevronLeft size={24} />}
            kind={KIND.tertiary}
            onClick={() => history.push('/')}
          >
            Home
          </Button>
          <Resize />
          <History />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ width: '320px' }}>
            <Input
              value={name}
              onChange={(e: any) => setName(e.target.value)}
              overrides={{
                Root: {
                  style: {
                    borderTopStyle: 'none',
                    borderBottomStyle: 'none',
                    borderRightStyle: 'none',
                    borderLeftStyle: 'none',
                    backgroundColor: 'rgba(255,255,255,0)',
                  },
                },
                InputContainer: {
                  style: {
                    backgroundColor: 'rgba(255,255,255,0)',
                  },
                },
              }}
            />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button onClick={handleSave} kind={KIND.tertiary}>
            {saving ? 'Saving' : actionText}
          </Button>
          <Button onClick={handleSaveAsTemplate} kind={KIND.secondary}>
            Save as template
          </Button>
          <PreviewTemplate />
        </div>
      </Container>
    </ThemeProvider>
  )
}

export default NavbarEditor

import { Input } from 'baseui/input'
import { Button } from 'baseui/button'
import { Search } from 'baseui/icon'
import { Scrollbars } from 'react-custom-scrollbars'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectTemplates } from '@/store/slices/templates/selectors'
import { nanoid } from 'nanoid'

const Header = () => {
  return <div style={{ paddingBottom: '1.75rem', fontSize: '1.5rem', fontWeight: 700 }}>Templates</div>
}
const Searcher = () => {
  return (
    <div
      style={{
        padding: '5rem 0',
        background: '#e0b3f5',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '3rem',
      }}
    >
      <div style={{ fontSize: '2rem', fontWeight: 500 }}>Discover new interests, make new creations</div>
      <div style={{ display: 'flex' }}>
        <Input startEnhancer={() => <Search size={24} />} placeholder="Find templates" />{' '}
        <Button overrides={{ BaseButton: { style: { width: '180px' } } }}>Search</Button>
      </div>
    </div>
  )
}

const TemplatesList = () => {
  const templates = useSelector(selectTemplates)
  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{ fontWeight: 700, fontSize: '1.5rem' }}>Explore our templates</div>
      <div style={{ display: 'grid', gridTemplateColumns: '120px 120px', gap: '1rem', padding: '1.5rem 0' }}>
        <div
          style={{
            height: '46px',
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            justifyContent: 'center',
            fontWeight: 500,
            background: '#E7ECEF',
            cursor: 'pointer',
          }}
        >
          Popular
        </div>
        <div
          style={{
            height: '46px',
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            justifyContent: 'center',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Recent
        </div>
      </div>
      <div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(20rem, 100%), 1fr))',
            gap: '1.5rem',
          }}
        >
          {templates.map(template => {
            return (
              <Link
                key={template.id}
                to={{
                  pathname: `/design/${nanoid()}/edit`,
                  state: {
                    template,
                  },
                }}
                style={{ textDecoration: 'none' }}
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <img
                    style={{ display: 'flex', maxWidth: '500px' }}
                    src={`${template.preview}?tr=w-480`}
                    alt="template"
                  />

                  <div style={{ fontWeight: 500, paddingTop: '1rem', color: '#000000' }}>{template.name}</div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
function Templates() {
  return (
    <div style={{ fontFamily: 'Poppins', flex: 1, display: 'flex' }}>
      <Scrollbars>
        <div style={{ display: 'flex', flex: 1, padding: '2rem', flexDirection: 'column' }}>
          <Header />
          <Searcher />
          <TemplatesList />
        </div>
      </Scrollbars>
    </div>
  )
}

export default Templates

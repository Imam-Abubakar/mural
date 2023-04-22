import { Button } from 'baseui/button'
import { Plus } from 'baseui/icon'
import { Scrollbars } from 'react-custom-scrollbars'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCreations } from '@store/slices/creations/selectors'
import { nanoid } from 'nanoid'

const Header = () => {
  return (
    <div
      style={{
        paddingBottom: '1.75rem',
        fontSize: '1.5rem',
        fontWeight: 700,
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div> My creations</div>
      <Link to={`/design/${nanoid()}/edit`}>
        <Button startEnhancer={() => <Plus size={24} />}>New design</Button>
      </Link>
    </div>
  )
}
const Searcher = () => {
  return (
    <div
      style={{
        padding: '8rem 0',
        background: '#e0b3f5',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '2rem',
      }}
    >
      <div style={{ fontSize: '2rem', fontWeight: 500 }}>Start a new creation</div>{' '}
    </div>
  )
}

const TemplatesList = () => {
  const creations = useSelector(selectCreations)
  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{ fontWeight: 700, fontSize: '1.5rem', paddingBottom: '2rem' }}>All creations</div>
      <div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(20rem, 100%), 1fr))',
            gap: '1.5rem',
          }}
        >
          {creations.map(creation => {
            return (
              <Link key={creation.id} to={`/design/${creation.id}/edit`} style={{ textDecoration: 'none' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <img
                    style={{ display: 'flex', maxWidth: '500px' }}
                    src={`${creation.preview}?tr=w-480`}
                    alt="creation"
                  />
                  <div style={{ fontWeight: 500, paddingTop: '1rem', color: '#000000' }}>{creation.name}</div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function Creations() {
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

export default Creations

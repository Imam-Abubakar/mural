import { Scrollbars } from 'react-custom-scrollbars'
import { useSelector } from 'react-redux'
import { selectUploads } from '@/store/slices/uploads/selectors'

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
      <div> My uploads</div>
      {/* <Link to="/edit">
        <Button startEnhancer={() => <Plus size={24} />}>New design</Button>
      </Link> */}
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
      <div style={{ fontSize: '2rem', fontWeight: 500 }}>Manage your uploads</div>{' '}
    </div>
  )
}

const TemplatesList = () => {
  // const { uploads } = useAppContext()
  const uploads = useSelector(selectUploads)
  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{ fontWeight: 700, fontSize: '1.5rem', paddingBottom: '2rem' }}>All uploads</div>
      <div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(20rem, 100%), 1fr))',
            gap: '1.5rem',
          }}
        >
          {uploads.map(upload => {
            return (
              <div key={upload.id} style={{ display: 'flex', flexDirection: 'column' }}>
                <img
                  style={{ display: 'flex', maxWidth: '500px' }}
                  src={`${upload.url}?tr=w-480`}
                  alt="template"
                />
                {/* <div style={{ fontWeight: 500, paddingTop: '1rem', color: '#000000' }}>{upload.name}</div> */}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
function Uploads() {
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

export default Uploads

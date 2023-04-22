import Lock from './components/Lock'
function Locked() {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 1rem',
      }}
    >
      <Lock />
    </div>
  )
}

export default Locked

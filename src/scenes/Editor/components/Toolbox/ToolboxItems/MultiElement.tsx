import Common from './components/Common'

function MultiElement() {
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
      <div>Multi</div>
      <Common />
    </div>
  )
}

export default MultiElement

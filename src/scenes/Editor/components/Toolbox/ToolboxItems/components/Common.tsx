import Delete from './Delete'
import Duplicate from './Duplicate'
import Opacity from './Opacity'
import Position from './Position'
import Lock from './Lock'
import CopyStyle from './CopyStyle'
import Group from './Group'

function Common() {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Group />
      <Position />
      <div
        style={{ height: '30px', width: '1px', backgroundColor: 'rgba(0,0,0,0.1)', margin: '0 0.35rem' }}
      />
      <CopyStyle />
      <Opacity />
      <div
        style={{ height: '30px', width: '1px', backgroundColor: 'rgba(0,0,0,0.1)', margin: '0 0.35rem' }}
      />
      <Lock />
      <Duplicate />
      <Delete />
    </div>
  )
}

export default Common

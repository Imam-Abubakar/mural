import FullColor from '@assets/images/full-color.png'

function FillColor({ color = '#000000' }: { size?: number; color: string }) {
  return (
    <div>
      {color === '#000000' || color === '#ffffff' ? (
        <img style={{ height: '30px', display: 'flex' }} src={FullColor} alt="color picker" />
      ) : (
        <div style={{ height: '30px', width: '30px', background: color }}></div>
      )}
    </div>
  )
}

export default FillColor

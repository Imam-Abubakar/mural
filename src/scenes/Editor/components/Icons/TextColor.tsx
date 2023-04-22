function TextColor({ size, color = '#000000' }: { size: number; color: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 0 24 24">
        <path
          d="M11 2L5.5 16h2.25l1.12-3h6.25l1.12 3h2.25L13 2h-2zm-1.38 9L12 4.67 14.38 11H9.62z"
          fill="currentColor"
        ></path>
      </svg>
      {color === '#000000' || color === '#ffffff' ? (
        <div style={{ marginTop: '-12px' }}>
          <img
            alt="color picker"
            width="24px"
            height="5px"
            src="https://static.canva.com/web/images/75f2be76da4524599a99a9f6c164e71d.png"
          />
        </div>
      ) : (
        <div
          style={{ height: '5px', width: '24px', background: color, display: 'block', marginTop: '-3px' }}
        ></div>
      )}
    </div>
  )
}

export default TextColor

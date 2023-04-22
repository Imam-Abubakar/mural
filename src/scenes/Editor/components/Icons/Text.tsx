function Text({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 0 24 24">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M18 5.5h-5.25V18c0 .28.22.5.5.5h2a.75.75 0 1 1 0 1.5h-6.5a.75.75 0 1 1 0-1.5h2a.5.5 0 0 0 .5-.5V5.5H6a.5.5 0 0 0-.5.5v1.25a.75.75 0 0 1-1.5 0V5.5C4 4.67 4.67 4 5.5 4h13c.83 0 1.5.67 1.5 1.5v1.75a.75.75 0 1 1-1.5 0V6a.5.5 0 0 0-.5-.5z"
      ></path>
    </svg>
  )
}
export default Text

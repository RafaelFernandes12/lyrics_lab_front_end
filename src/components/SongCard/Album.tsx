interface props {
  album: string[]
}
export function Album({ album }: props) {
  return <span className="font-semibold">{album}</span>
}

interface props {
  album: string[]
}
export function Album({ album }: props) {
  return <span className="text-white font-semibold">{album}</span>
}

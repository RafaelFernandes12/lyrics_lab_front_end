interface props {
  createdAt: string
}
export function CreatedAt({ createdAt }: props) {
  return (
    <span className="text-semibold text-white max-sm:hidden">{createdAt}</span>
  )
}

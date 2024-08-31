interface props {
  createdAt: string
}
export function CreatedAt({ createdAt }: props) {
  return <span className="text-white text-semibold max-sm:hidden">{createdAt}</span>
}

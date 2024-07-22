interface props {
  createdAt: string
}
export default function CreatedAt({ createdAt }: props) {
  return <span className="text-semibold max-sm:hidden">{createdAt}</span>
}

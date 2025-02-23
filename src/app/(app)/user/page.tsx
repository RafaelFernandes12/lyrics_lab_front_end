import { UserCard } from './components/UserCard'

export default function User() {
  return (
    <div className="flex h-full w-full flex-col items-center gap-28">
      <h1>Perfil</h1>
      <UserCard />
    </div>
  )
}

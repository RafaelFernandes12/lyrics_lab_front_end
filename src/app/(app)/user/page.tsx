import { UserData } from './components/UserData'

export default function User() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h1>Perfil</h1>
      <UserData />
    </div>
  )
}

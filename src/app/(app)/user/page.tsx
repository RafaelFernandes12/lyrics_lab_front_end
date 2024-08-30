'use client'

import { AuthContext } from '@/contexts/AuthContext'
import EditIcon from '@mui/icons-material/Edit'
import PersonIcon from '@mui/icons-material/Person'
import { useContext } from 'react'

export default function User() {
  const { user } = useContext(AuthContext)

  if (!user) {
    return <p>Carregando...</p>
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h1>Perfil</h1>
      <div className="mt-5 flex">
        <PersonIcon
          sx={{ width: 250, height: 190 }}
          className=" dark:text-white max-md:hidden"
        />
        <div className="flex flex-col justify-between py-8">
          <div className="flex gap-3">
            <p>Nome: {user?.name}</p>
            <EditIcon className="h-5 w-5" />
          </div>
          <div className="flex gap-3">
            <p>Email: {user?.email}</p>
            <EditIcon className="h-5 w-5" />
          </div>
          <div className="flex gap-3">
            <button className="bg-sky-500">Alterar senha</button>
            <button className="bg-red-500">Excluir conta</button>
          </div>
        </div>
      </div>
    </div>
  )
}

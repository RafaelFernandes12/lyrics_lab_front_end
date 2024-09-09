'use client'

import { AuthContext } from '@/contexts/AuthContext'
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import { useContext } from 'react'

export default function User() {
  const { user, signOut } = useContext(AuthContext)

  if (!user) {
    return <p>Carregando...</p>
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h1>Perfil</h1>
      <div className="my-8 flex w-1/3 flex-col rounded-sm  bg-white p-4 dark:bg-headerDark">
        <div className="flex flex-col items-start justify-start gap-4 ">
          <div className="flex items-center gap-3 dark:text-white">
            <AlternateEmailRoundedIcon />
            <h2>{user?.name}</h2>
          </div>
          <div className="flex items-center gap-3">
            <EmailRoundedIcon className="dark:text-white" />
            <p className="font-normal text-blue-400 dark:text-blue-400">
              {user?.email}
            </p>
          </div>
        </div>
        <hr className="my-8" />
        <div className="flex flex-col items-start justify-start gap-4 ">
          <button className="m-0 flex items-center gap-3 p-0 hover:text-blue-400 dark:text-white  dark:hover:text-blue-400">
            <EditRoundedIcon />
            <p>Alterar o nome</p>
          </button>
          <button className="m-0 flex items-center gap-3 p-0 hover:text-blue-400  dark:text-white dark:hover:text-blue-400">
            <EditRoundedIcon />
            <p>Alterar a senha</p>
          </button>
        </div>
        <hr className="my-8" />
        <div className="flex flex-col items-start justify-start gap-4 ">
          <button
            onClick={signOut}
            className="m-0 flex items-center gap-3 p-0 hover:text-red-500 dark:text-white dark:hover:text-red-500"
          >
            <LogoutRoundedIcon className=" dark:hover:text-red-500" />
            <p className="font-normal text-red-500 dark:text-red-500">Sair</p>
          </button>
        </div>
      </div>
    </div>
  )
}

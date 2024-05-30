import EditIcon from '@mui/icons-material/Edit'
import PersonIcon from '@mui/icons-material/Person'


export default function User() {
  return(
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <h1>Perfil</h1>
      <div className="flex mt-5">
        <PersonIcon
          sx={{ width: 250, height: 190 }}
          className=" dark:text-white max-md:hidden"
        />
        <div className='py-8 flex flex-col justify-between'>
          <div className='flex gap-3'>
            <p>Nome: Ramon Fernandes</p>
            <EditIcon className="h-5 w-5" />
          </div>
          <div className='flex gap-3'>
            <p>Email: rafaelmateus@email.com</p>
            <EditIcon className="h-5 w-5" />
          </div>
          <div className='flex gap-3'>
            <button className='bg-sky-500'>Alterar senha</button>
            <button className='bg-red-500'>Excluir conta</button>
          </div>
        </div>
      </div>
    </div>
  )
}
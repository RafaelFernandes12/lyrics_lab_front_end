import { toast } from 'react-toastify'

export const SuccessHandler = () => {
  toast.success('Operação realizada com sucesso', {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  })
}

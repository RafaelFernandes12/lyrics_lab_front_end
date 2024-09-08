import { toast } from 'react-toastify'

interface successHandlerProps {
  id: string
  message: string
}

export const SuccessHandler = ({ message, id }: successHandlerProps) => {
  toast.success(message, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
    toastId: id
  })
}

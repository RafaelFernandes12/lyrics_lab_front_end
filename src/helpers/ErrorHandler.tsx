import axios from 'axios'
import { toast } from 'react-toastify'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ErrorHandler = (error: any, customMessage?: string) => {
  if (customMessage) {
    toast.error(customMessage, {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })
    return
  }

  if (axios.isAxiosError(error)) {
    const err = error.response
    if (Array.isArray(err?.data.errors)) {
      for (const val of err?.data.errors) {
        toast.warning(val.description, {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        })
      }
    } else if (typeof err?.data.errors === 'object') {
      for (const e in err?.data.errors) {
        toast.warning(err.data.errors[e][0], {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        })
      }
    } else if (err?.data) {
      toast.warning(err.data, {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      })
    } else if (err?.status === 401) {
      toast.warning('Please login', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      })
      window.history.pushState({}, 'LoginPage', '/login')
    } else if (err) {
      toast.warning(err?.data, {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      })
    }
  } else {
    toast.warning('Try again later!', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })
  }
}

import { toast } from 'react-toastify'

const useToast = () => {
  const showToast = (
    content: string,
    type: 'success' | 'error' | 'info' | 'warning' = 'success'
  ) => {
    toast[type](content, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  }

  return { showToast }
}

export default useToast

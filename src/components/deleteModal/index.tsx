'use client'
import DeleteIcon from '@mui/icons-material/Delete'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { Modal } from 'antd'
import { ClassNameValue, twMerge } from 'tailwind-merge'

const { confirm } = Modal

interface Props {
  classNameButton?: ClassNameValue
  classNameIcon?: ClassNameValue
  title: string
  description: string
  onConfirm: () => void
}

const showPromiseConfirm = ({ title, description, onConfirm }: Props) => {
  confirm({
    title: `${title}`,
    cancelText: 'Cancelar',
    okText: 'Confirmar',
    okType: 'danger',
    icon: <ExclamationCircleFilled />,
    content: `${description}`,
    onOk() {
      try {
        onConfirm()
      } catch (error) {
        console.log('Oops errors!', error)
      }
    },
    onCancel() {},
  })
}

export const DeleteModal = ({
  title,
  description,
  onConfirm,
  classNameButton,
  classNameIcon,
}: Props) => (
  <button
    onClick={() => showPromiseConfirm({ title, description, onConfirm })}
    className={twMerge(
      'flex items-center    rounded p-2 text-black',
      classNameButton,
    )}
  >
    <DeleteIcon className={twMerge('text-xl', classNameIcon)} />
  </button>
)

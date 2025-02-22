'use client'

import { DeleteFilled, ExclamationCircleFilled } from '@ant-design/icons'
import { Modal } from 'antd'

const { confirm } = Modal

interface Props {
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

export const ConfirmModal = ({ title, description, onConfirm }: Props) => (
  <button
    onClick={() => showPromiseConfirm({ title, description, onConfirm })}
    className="flex items-center rounded-md bg-gray-200 p-2 text-black hover:bg-gray-300 dark:text-white dark:hover:bg-slate-600"
  >
    <DeleteFilled style={{ fontSize: '20px' }} />{' '}
  </button>
)

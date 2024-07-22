import { idProps } from '@/models/idProps'
import { DeleteIconDialog } from './DeleteIconDialog'
import { EditIconDialog } from './EditIconDialog'

export function IconsAction({ id }: idProps) {
  return (
    <>
      <EditIconDialog id={id} />
      <DeleteIconDialog id={id} />
    </>
  )
}

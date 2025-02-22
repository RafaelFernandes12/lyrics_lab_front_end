import GenericCreate from '@/components/genericCreate'
import { SongsData } from './components/SongsData'

export default function Songs() {
  return (
    <>
      <section className="flex items-center justify-between">
        <h1>Músicas</h1>
        <GenericCreate title={'música'} type="song" />
      </section>
      <SongsData />
    </>
  )
}

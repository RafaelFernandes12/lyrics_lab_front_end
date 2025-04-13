import { AuthHeader } from '@/components/header/AuthHeader'

export default function NotFound() {
  return (
    <div>
      <AuthHeader />
      <div className="mt-56 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold">Página não encontrada</h1>
        <p className="mt-4 text-lg text-gray-500">
          A página que você procura não existe.
        </p>
      </div>
    </div>
  )
}

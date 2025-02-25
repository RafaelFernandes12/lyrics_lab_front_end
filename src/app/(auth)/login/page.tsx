import { LoginForm } from './components/LoginForm'

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <h1 className="my-16 w-full text-center text-2xl">Acesse sua conta</h1>
      <section className="flex w-[400px] justify-center max-sm:w-full">
        <LoginForm />
      </section>
    </div>
  )
}

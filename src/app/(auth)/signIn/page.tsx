import Link from 'next/link'

export default function SignUp() {
  return (
    <>
      <h1 className="my-20 w-full text-center">Acesse sua conta</h1>
      <section className="m-auto w-[600px] rounded-2xl border-2 border-black p-6 dark:border-white max-sm:w-full">
        <form className="flex flex-col gap-4">
          <div className="flex w-full flex-col gap-2">
            <label>
              <p>E-mail</p>
            </label>
            <input className="rounded-lg border-2 border-black p-3" />
          </div>
          <div className="flex w-full flex-col gap-2">
            <label>
              <p>Senha</p>
            </label>
            <input className="rounded-lg border-2 border-black p-3" />
          </div>
          <p className="text-darkBlue">Esqueci minha senha</p>
          <button className="w-full bg-darkBlue">
            <span className="">Entrar</span>
          </button>
        </form>
        <p className="mt-4 text-center">
          Não tem uma conta{' '}
          <Link className="text-darkBlue" href="/signUp">
            Cadastre-se
          </Link>
        </p>
      </section>
    </>
  )
}

import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const requestBodyText = await req.text()
    const requestBody = JSON.parse(requestBodyText)
    const { email, code } = requestBody

    if (!email || !code) {
      console.error('Email ou código não fornecidos:', { email, code })
      return NextResponse.json(
        { message: 'Email e código são necessários.' },
        { status: 400 },
      )
    }

    const transponder = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL!,
        pass: process.env.EMAIL_PASSWORD!,
      },
    })

    const mailOptions = {
      from: process.env.EMAIL!,
      to: email,
      subject: 'Código de Verificação - Lyrics Lab',
      text: `Seu código de verificação é: ${code}. Se você não solicitou esse código, não se preocupe. Nosso processo de verificação é seguro.`,
    }

    await transponder.sendMail(mailOptions)
    return NextResponse.json({ message: 'E-mail enviado com sucesso!' })
  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error)
    return NextResponse.json(
      { message: 'Erro ao enviar o e-mail.' },
      { status: 500 },
    )
  }
}

import { Form, InputNumber, message } from 'antd'

interface Props {
  verificationCode: number
  onFinish: (code: number) => void
}

export const VerifyForm = ({ verificationCode, onFinish }: Props) => {
  return (
    <Form
      id="verifyForm"
      onFinish={(values: { code: number }) => {
        if (values.code !== verificationCode) {
          message.error('Código inválido')
          return
        }
        onFinish(values.code)
      }}
      layout="vertical"
    >
      <Form.Item
        name="code"
        label="Código de verificação (verifique seu email)"
        rules={[{ required: true, message: 'Digite o código recebido' }]}
      >
        <InputNumber style={{ width: '100%' }} controls={false} maxLength={6} />
      </Form.Item>
    </Form>
  )
}

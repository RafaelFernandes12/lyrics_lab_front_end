import { SuccessHandler } from '@/helpers/SuccessHandler'

export async function deleteSong(id: number) {
  try {
    const response = await fetch(`/api/delete-song`, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    })

    const result = await response.json()

    if (result.success) {
      SuccessHandler()
    } else {
      console.log(result.error)
    }
  } catch (error) {
    console.log(error)
  } finally {
    location.reload()
  }
}

import ResponsiveDrawer from "../components/ResponsiveDrawer"

interface IdProps {
  params: {
    id: string
  }
}

export default async function Song({ params }: IdProps) {
  // const response = await api.get(`/songs/${params.id}`);
  // const song: songProps = response.data;

  return (
    <ResponsiveDrawer/>
  )
}

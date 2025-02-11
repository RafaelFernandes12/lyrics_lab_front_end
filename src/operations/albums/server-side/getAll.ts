import { ErrorHandler } from "@/helpers/ErrorHandler";
import api from "@/lib/axios";
import { TAlbum } from "@/models/models";
import { cookies } from "next/headers";

export async function serverGetAllAlbums(): Promise<TAlbum[]> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("jwt")?.value;

    const response = await api.get("/album", {
      headers: {
        Authorization: token ? `${token}` : undefined,
      },
    });

    const data = await response.data;
    const filteredData = data.filter((album: TAlbum) => !album.isDefault);
    return filteredData as TAlbum[];
  } catch (error) {
    ErrorHandler(error, "Falha ao obter álbuns. Tente novamente mais tarde.");
    return [];
  }
}

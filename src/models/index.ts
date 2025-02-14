/* eslint-disable no-use-before-define */
export type TAlbum = {
  id: number;
  name: string;
  description: string;
  image: string;
  isDefault: boolean;
  userId: number;
  songs: TSong[];
};
export type TUser = {
  id: number;
  name: string;
  email: string;
};

export type TSong = {
  id: number;
  name: string;
  bpm?: number;
  compass?: string;
  lyric?: string;
  tone: string;
  createdAt: string;
  albums: TAlbum[];
};
export interface idProps {
  id: number;
  color?: string;
}

export interface urlIdProps {
  params: {
    id: number;
  };
}

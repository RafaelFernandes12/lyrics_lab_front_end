import { albumProps } from "@/models/albumProps";
import { songProps } from "@/models/songProps";
import { faker } from "@faker-js/faker";

const image = faker.image.url();

export const songs: songProps[] = [
  {
    id: 1,
    name: "songName",
    lyric: "lyric",
    tone: "C",
    createdAt: "2025-01-02T19:22:38.2391639",
    albums: [],
  },
];
export const albums: albumProps[] = [
  {
    id: 1,
    name: "albumName",
    description: "description",
    image,
    isDefault: true,
    userId: 1,
    songs: [],
  },
  {
    id: 2,
    name: "albumName2",
    description: "description",
    image,
    isDefault: false,
    userId: 1,
    songs: [],
  },
  {
    id: 3,
    name: "albumName3",
    description: "description",
    image,
    isDefault: false,
    userId: 1,
    songs: [],
  },
];
songs[0].albums.push(albums[0]);
songs[0].albums.push(albums[1]);
songs[0].albums.push(albums[2]);

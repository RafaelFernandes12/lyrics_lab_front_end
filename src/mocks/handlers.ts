import { albumProps } from "@/models/albumProps";
import { http, HttpResponse } from "msw";
import { albums, songs } from "./mocks";
import { songProps } from "@/models/songProps";

const api = "http://localhost:5214/api";

export const handlers = [
  http.get(`${api}/album`, () => {
    return HttpResponse.json<albumProps[]>(albums);
  }),

  http.get(`${api}/song/1`, () => {
    return HttpResponse.json<songProps>(songs[0]);
  }),
];

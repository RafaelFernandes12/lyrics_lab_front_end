import { Album, CreatedAt, Name, Tone } from "@/components/songCard/SongItems";
import { songs, albums } from "@/mocks/mocks";
import { render, screen } from "@testing-library/react";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

describe("SongItems Album Component", () => {
  test("if there's two or more albums there should be a comma", () => {
    render(<Album albums={albums} />);
    expect(screen.getByText("albumName2, albumName3")).toBeInTheDocument();
  });
  test("if there's one album there should be no comma", () => {
    const newAlbums = [albums[1]];
    render(<Album albums={newAlbums} />);
    expect(screen.getByText("albumName2")).toBeInTheDocument();
  });
  test("it should apply the correct styles", () => {
    render(<Album albums={albums} className="bg-black" />);
    expect(screen.getByText("albumName2, albumName3")).toHaveClass("truncate font-semibold text-white bg-black");
  });
});
describe("SongItems CreatedAt Component", () => {
  test("it should display the time the song was created", () => {
    render(<CreatedAt song={songs[0]} />);
    expect(
      screen.getByText(dayjs().to(songs[0].createdAt)),
    ).toBeInTheDocument();
  });
  test("it should apply the correct styles", () => {
    render(<CreatedAt song={songs[0]} className="bg-black" />);
    expect(screen.getByText(dayjs().to(songs[0].createdAt))).toHaveClass(
      "truncate text-white bg-black",
    );
  });
  describe("SongItems Name Component", () => {
    test("it should render the elements", () => {
      render(<Name song={songs[0]} />);
      expect(screen.getByText(songs[0].name)).toBeInTheDocument();
      expect(screen.getByRole("link")).toBeInTheDocument();
    });
    test("the link should have the correct href", () => {
      render(<Name song={songs[0]} />);
      expect(screen.getByRole("link")).toHaveAttribute("href", "/song/1");
    });
    test("it should render the new styles", () => {
      render(<Name song={songs[0]} className='bg-black text-black' />);
      expect(screen.getByText(songs[0].name)).toHaveClass("truncate text-xl font-semibold text-black bg-black");
    });
  });
  describe("SongItems Tone component", () => {
    test("it should render the elements", () => {
      render(<Tone song={songs[0]} />);
      expect(screen.getByText(songs[0].tone)).toBeInTheDocument();
    });
    test("it should render the new styles", () => {
      render(<Tone song={songs[0]} className='bg-black text-black' />);
      expect(screen.getByText(songs[0].tone)).toHaveClass("truncate font-semibold text-black bg-black");
    });
  });
});

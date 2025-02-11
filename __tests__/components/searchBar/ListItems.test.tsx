import { AlbumItem, SongItem, Title } from "@/components/searchBar/ListItems";
import { songs, albums } from "@/mocks/mocks";
import { render, screen } from "@testing-library/react";

describe("List Items Component", () => {
  test("it should render the title", () => {
    render(<Title title="test" />);
    expect(screen.getByText("test")).toBeInTheDocument();
  });
  test("it should render songItem without the default album", () => {
    render(<SongItem song={songs[0]} album={albums} search="" />);
    expect(screen.getByText("songName")).toBeInTheDocument();
    expect(screen.queryByText("albumName")).not.toBeInTheDocument();
    expect(screen.getByText(/albumName2,/)).toBeInTheDocument();
    expect(screen.getByText(/albumName3/)).toBeInTheDocument();
  });
  test("it should render albumItem", () => {
    render(<AlbumItem album={albums[0]} search="" />);
    expect(screen.getByText("albumName")).toBeInTheDocument();
  });
  test("when typing the options should be highlighted by the words written song", () => {
    render(<SongItem song={songs[0]} album={[]} search="songName" />);
    const highlighted = screen.getAllByText("songName", { exact: false });
    expect(highlighted[0]).toBeInTheDocument();
    expect(highlighted[0]).toHaveClass("font-semibold text-blue-500");
  });
  test("when typing the options should be highlighted by the words written album", () => {
    render(<AlbumItem album={albums[0]} search="albumName" />);
    const highlighted = screen.getAllByText("albumName", { exact: false });
    expect(highlighted[0]).toBeInTheDocument();
    expect(highlighted[0]).toHaveClass("font-semibold text-blue-500");
  });
});

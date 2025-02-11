import { SelectAlbums } from "@/components/buttonDialog/SelectAlbums";
import { albums } from "@/mocks/mocks";
import { fireEvent, render, screen } from "@testing-library/react";
import useSWR from "swr";

jest.mock("swr");

describe("SelectAlbums Component", () => {
  test("it should render the button with the text 'Pesquisar', if there arent any albuns on the song", () => {
    (useSWR as jest.Mock).mockReturnValue({ data: [] });
    render(<SelectAlbums albums={albums} />);
    expect(screen.getByText("Álbuns")).toBeInTheDocument();
    expect(screen.getByText("Pesquisar")).toBeInTheDocument();
  });

  test("it should render the button with the albums names, if there are albuns on the song", () => {
    (useSWR as jest.Mock).mockReturnValue({ data: albums });
    render(<SelectAlbums albums={albums} />);
    expect(screen.getByText(/albumName2, albumName3/i)).toBeInTheDocument();
  });
  test("there should be a paragraph with the names of the albums that that song has", () => {
    (useSWR as jest.Mock).mockReturnValue({ data: albums });
    render(<SelectAlbums albums={albums} />);
    fireEvent.click(screen.getByText(/albumName2/i));
    expect(screen.getByText("Selecionar álbums")).toBeInTheDocument();
    expect(screen.getByTestId("names")).toHaveTextContent(
      /albumName2, albumName3/i,
    );
  });
  test("the names of the albums should be removed from the header as i select them", () => {
    (useSWR as jest.Mock).mockReturnValue({ data: albums });
    render(<SelectAlbums albums={albums} />);
    fireEvent.click(screen.getByText(/albumName2/i));
    expect(screen.getByTestId("names")).toHaveTextContent(/albumName2/i);
    fireEvent.click(screen.getAllByText(/albumName2/i)[2]);
    expect(screen.getByTestId("names")).not.toHaveTextContent(/albumName2/i);
  });
  test("the names of the albums should be added to the header as i select them", () => {
    (useSWR as jest.Mock).mockReturnValue({ data: albums });
    render(<SelectAlbums albums={albums} />);
    fireEvent.click(screen.getByText(/albumName2/i));
    expect(screen.getByTestId("names")).toHaveTextContent(/albumName2/i);
    fireEvent.click(screen.getAllByText(/albumName2/i)[2]);
    expect(screen.getByTestId("names")).not.toHaveTextContent(/albumName2/i);
    fireEvent.click(screen.getAllByText(/albumName2/i)[0]);
    expect(screen.getByTestId("names")).toHaveTextContent(/albumName2/i);
  });
});

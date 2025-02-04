import { SelectSongs } from "@/components/buttonDialog/SelectSongs";
import { songs } from "@/mocks/mocks";
import { fireEvent, render, screen } from "@testing-library/react";
import useSWR from "swr";

jest.mock("swr");

describe("SelectSongs Component", () => {
  test("it should render the button with the text 'Pesquisar', if there arent any songs on the album", () => {
    (useSWR as jest.Mock).mockReturnValue({ data: [] });
    render(<SelectSongs song={songs} />);
    expect(screen.getByText("Músicas")).toBeInTheDocument();
    expect(screen.getByText("Pesquisar")).toBeInTheDocument();
  });

  test("it should render the button with the song names, if there are albuns on the song", () => {
    (useSWR as jest.Mock).mockReturnValue({ data: songs });
    render(<SelectSongs song={songs} />);
    expect(screen.getByText(/songName/i)).toBeInTheDocument();
  });
  test("there should be a paragraph with the names of the song that that song has", () => {
    (useSWR as jest.Mock).mockReturnValue({ data: songs });
    render(<SelectSongs song={songs} />);
    fireEvent.click(screen.getByText(/songName/i));
    expect(screen.getByText("Músicas selecionadas:")).toBeInTheDocument();
    expect(screen.getByTestId("names")).toHaveTextContent(/songName/i);
  });
  test("the names of the song should be removed from the header as i select them", () => {
    (useSWR as jest.Mock).mockReturnValue({ data: songs });
    render(<SelectSongs song={songs} />);
    fireEvent.click(screen.getByText(/songName/i));
    expect(screen.getByTestId("names")).toHaveTextContent(/songName/i);
    fireEvent.click(screen.getAllByText(/songName/i)[2]);
    expect(screen.getByTestId("names")).not.toHaveTextContent(/songName/i);
  });
  test("the names of the song should be added to the header as i select them", () => {
    (useSWR as jest.Mock).mockReturnValue({ data: songs });
    render(<SelectSongs song={songs} />);
    fireEvent.click(screen.getByText(/songName/i));
    expect(screen.getByTestId("names")).toHaveTextContent(/songName/i);
    fireEvent.click(screen.getAllByText(/songName/i)[2]);
    expect(screen.getByTestId("names")).not.toHaveTextContent(/songName/i);
    fireEvent.click(screen.getAllByText(/songName/i)[0]);
    expect(screen.getByTestId("names")).toHaveTextContent(/songName/i);
  });
});

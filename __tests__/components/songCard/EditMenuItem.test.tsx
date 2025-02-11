// import { EditMenuItem } from "@/components/songCard/EditMenuItem";
// import { fireEvent, render, screen, waitFor } from "@testing-library/react";
// import { useRouter } from "next/navigation";
// import useSWR from "swr";
// import { albums, songs } from "@/mocks/mocks";
// import { clientEditSong } from "@/operations/songs/client-side/editSong";
// import { SuccessHandler } from "@/helpers/SuccessHandler";

// jest.mock("next/navigation", () => ({
//   useRouter: jest.fn(),
// }));
// jest.mock("@/operations/songs/client-side/editSong");
// jest.mock("swr");
// jest.mock("@/helpers/SuccessHandler")

// describe("EditMenuItem Component", () => {
//   const mockRouter = { refresh: jest.fn() };
//   beforeEach(() => {
//     (useSWR as jest.Mock).mockReturnValue({ data: songs[0] });
//     (useSWR as jest.Mock).mockReturnValue({ data: albums });
//     (useRouter as jest.Mock).mockReturnValue(mockRouter);
//     jest.clearAllMocks();
//   });
//   test("it should render 'Editar'", () => {
//     render(<EditMenuItem id={1} />);
//     expect(screen.getByText("Editar")).toBeInTheDocument();
//   });

//   test("it should render the pop up form when clicking in 'Editar'", () => {
//     render(<EditMenuItem id={1} />);
//     screen.debug();
//     fireEvent.click(screen.getByText("Editar"));
//     expect(screen.getByText("Editar Música")).toBeInTheDocument();
//     expect(screen.getByText("Nome")).toBeInTheDocument();
//     expect(screen.getByText("Tom")).toBeInTheDocument();
//     expect(screen.getByText("Álbuns")).toBeInTheDocument();
//   });
//   test("it shows an error if the name is empty on submission", async () => {
//     render(<EditMenuItem id={1} />);
//     fireEvent.click(screen.getByText("Editar"));
//     fireEvent.change(screen.getAllByTestId("input")[0], {
//       target: { value: "   " },
//     });
//     fireEvent.click(screen.getByText("Confirmar"));

//     expect(
//       screen.getByText("O nome não pode estar vazio!"),
//     ).toBeInTheDocument();
//   });
//   test("calls clientEditSong with correct parameters", async () => {
//     (clientEditSong as jest.Mock).mockResolvedValueOnce({});
//     render(<EditMenuItem id={1} />);

//     fireEvent.click(screen.getByText("Editar"));
//     fireEvent.change(screen.getAllByTestId("input")[0], {
//       target: { value: "New Song Name" },
//     });
//     fireEvent.change(screen.getAllByTestId("input")[1], {
//       target: { value: "C" },
//     });
//     fireEvent.click(screen.getByText("Confirmar"));

//     await waitFor(() => {
//       expect(clientEditSong).toHaveBeenCalledWith({
//         id: 1,
//         name: "New Song Name",
//         tone: "C",
//         albums: [],
//       });
//       expect(mockRouter.refresh).toHaveBeenCalled();
//       expect(SuccessHandler).toHaveBeenCalledWith({
//         id: expect.any(String),
//         message: "Música editada com sucesso",
//       })
//     });
//   });
// });

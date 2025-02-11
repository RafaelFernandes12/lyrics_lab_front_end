import { Root } from "@/components/searchBar/Root";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Root Component", () => {
  const searchMock = jest.fn();
  beforeEach(() => {
    render(
      <Root
        setSearch={searchMock}
        header={<h1>Test header</h1>}
        body={<h1>Test</h1>}
      />,
    );
  });
  test("it should render the header", () => {
    expect(screen.getByText("Test header")).toBeInTheDocument();
  });
  test("it should open the body when clicking on the header", () => {
    fireEvent.click(screen.getByText("Test header"));
    expect(screen.getByTestId("searchIconId")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Pesquisar")).toBeInTheDocument();
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
  test("it should close the body when clicking on the close icon", () => {
    fireEvent.click(screen.getByText("Test header"));
    expect(screen.getByText("Test")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("closeButtonId"));
    expect(screen.queryByText("Test")).not.toBeInTheDocument();
  });
  test("it should close the body when clicking outside of it", () => {
    fireEvent.click(screen.getByText("Test header"));
    expect(screen.getByText("Test")).toBeInTheDocument();
    fireEvent.mouseDown(document.body);
    expect(screen.queryByText("Test")).not.toBeInTheDocument();
  });
});

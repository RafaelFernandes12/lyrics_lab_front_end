import { Root } from "@/components/buttonDialog/Root";
import { fireEvent, render, screen } from "@testing-library/react";

const spy = jest.fn()

describe("Root ButtonDialog", () => {
  beforeEach(() => {
    render(
      <Root
        header={<div>header</div>}
        body={<div>body</div>}
        text="text"
        action={spy}
      />,
    );
  });
  test("it should render the header when the open is false", () => {
    expect(screen.getByText("header")).toBeInTheDocument();
    expect(screen.queryByText("body")).not.toBeInTheDocument();
    expect(screen.queryByText("text")).not.toBeInTheDocument();
    expect(screen.queryByTestId("actionButton")).not.toBeInTheDocument();
  });
  test("it should render the body when the open is true", () => {
    fireEvent.click(screen.getByText("header"));
    expect(screen.getByText("body")).toBeInTheDocument();
    expect(screen.getByText("text")).toBeInTheDocument();
    expect(screen.queryByTestId("actionButton")).toBeInTheDocument();
    expect(screen.queryByText("header")).not.toBeInTheDocument();
  });
  test("it should close the body when clicking in 'Cancelar'", () => {
    fireEvent.click(screen.getByText("header"));
    fireEvent.click(screen.getByText("Cancelar"));
    expect(screen.queryByText("body")).not.toBeInTheDocument();
    expect(screen.queryByText("text")).not.toBeInTheDocument();
    expect(screen.queryByText("header")).toBeInTheDocument();
  });
  test("When clicking the action Button, it must be called", () => {
    fireEvent.click(screen.getByText("header"));
    fireEvent.click(screen.getByTestId("actionButton"));
    expect(spy).toHaveBeenCalled()
  });
});

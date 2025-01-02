import { render, screen } from "@testing-library/react";

describe("Header Component", () => {
  test("it should work", () => {
    render(<h1>Header</h1>);
    expect(screen.getByText("Header")).toBeInTheDocument();
  });
});


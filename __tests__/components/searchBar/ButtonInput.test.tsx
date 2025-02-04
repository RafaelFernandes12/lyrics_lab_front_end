import { ButtonInput } from "@/components/searchBar/ButtonInput";
import { render, screen } from "@testing-library/react";

describe("ButtonInput Component", () => {
  test("it should render the title", () => {
    render(<ButtonInput title="test" />);
    expect(screen.getByText("test")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  test("it should render the new styling", () => {
    render(<ButtonInput title="test" className="bg-black" />);
    expect(screen.getByRole("button")).toHaveClass("bg-black");
    expect(screen.getByRole("button")).not.toHaveClass("bg-gray-200");
  });
});

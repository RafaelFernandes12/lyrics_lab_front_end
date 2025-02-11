import { Input } from "@/components/buttonDialog/Input";
import { render, screen } from "@testing-library/react";

describe("Input Component", () => {

  const mockFunction = jest.fn();

  test("it should render", () => {
    render(<Input placeholder='test' state={mockFunction} value="test" type="text" />);
    expect(screen.getByText("test")).toBeInTheDocument();
    expect(screen.getByTestId("input")).toHaveValue("test");
    expect(screen.getByTestId("input")).toHaveProperty("type", "text");
  });
});


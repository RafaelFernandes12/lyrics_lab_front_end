import { Button } from "@/components/buttonDialog/Button";
import { render, screen } from "@testing-library/react";

describe("Button Component", () => {
  test("it should render the text", () => {
    render(<Button text='test' />);
    expect(screen.getByText("test")).toBeInTheDocument();
    expect(screen.getByTestId("addIcon")).toBeInTheDocument();
  });
});

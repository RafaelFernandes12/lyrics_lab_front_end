import { AuthHeader } from "@/components/header/AuthHeader";
import { render, screen } from "@testing-library/react";

describe("Auth Header Component", () => {
  test("it should render the elements correctly", () => {
    render(<AuthHeader />);
    expect(screen.getByTestId("logo")).toBeInTheDocument();
    expect(screen.getByText("Lyrics Lab")).toBeInTheDocument();
  });
});

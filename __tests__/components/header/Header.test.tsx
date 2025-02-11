import { Header } from "@/components/header/Header";
import { render, screen } from "@testing-library/react";

describe("Header Component", () => {
  test("It should display the elements on screen", async () => {
    render(await Header());
    expect(screen.getByTestId("logo")).toBeInTheDocument();
    expect(screen.getByText("Músicas")).toBeInTheDocument();
    expect(screen.getByText("Álbuns")).toBeInTheDocument();
  });

  test("it should find the links", async () => {
    render(await Header());
    expect(screen.getByTestId("logoLink")).toHaveAttribute(
      "href",
      "/dashboard",
    );
    expect(screen.getByRole("link", { name: "Músicas" })).toHaveAttribute(
      "href",
      "/songs",
    );
    expect(screen.getByRole("link", { name: "Álbuns" })).toHaveAttribute(
      "href",
      "/albums",
    );
  });
});

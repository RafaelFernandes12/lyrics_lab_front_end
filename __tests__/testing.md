Pra testar componente asincrono tu faz isso aqui

```typescriptreact
import { Header } from "@/components/header/Header";
import { render, screen } from "@testing-library/react";

describe("Header Component", () => {
  test("it should work", async () => {
    render(await Header());
        // testing
  });
});

```

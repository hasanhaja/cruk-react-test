import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

function getHeading(): HTMLElement {
    return screen.getByRole("heading", {
        name: /cruk technical exercise - react/i,
    });
}

describe("App", () => {
    beforeEach(() => {
        render(<App />);
    });

    it("should render", () => {
        expect(getHeading().textContent).toBe(
            "CRUK technical exercise - React"
        );
    });
});

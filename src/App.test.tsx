import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
    const onSubmit = jest.fn();

    beforeEach(() => {
        onSubmit.mockClear();
        render(<App />);
    });
});

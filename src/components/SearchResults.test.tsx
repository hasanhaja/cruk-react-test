import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import SearchResults from "./SearchResults";
import SearchResultItem from "../api/SearchResultItem";

function getSearchHeading(n: number, result: string): HTMLElement {
    return screen.getByRole("heading", {
        name: new RegExp(`showing ${n} ${result} for "Jupiter"`, "i"),
    });
}

describe("SearchResults", () => {
    const generateData = (n: number): Array<SearchResultItem> =>
        Array.from(Array(n).keys()).map((key) => {
            const test: SearchResultItem = {
                center: "JPL",
                title: `Jupiter ${key}`,
                nasaId: `nasa_${key}`,
                mediaType: "image",
                description: `${key} Test description of jupiter`,
                href: "assetsForComponentTesting/test_jupiter.jpg",
            };
            return test;
        });

    it("should render 10 media cards and 1 heading", () => {
        const { container } = render(
            <SearchResults data={generateData(10)} keyword="Jupiter" />
        );
        expect(container.children[0].children).toHaveLength(11);
    });

    it("should render 0 media cards and 1 heading", () => {
        const { container } = render(
            <SearchResults data={generateData(0)} keyword="Jupiter" />
        );
        expect(container.children[0].children).toHaveLength(1);
    });

    it("should have search heading read 10 results", () => {
        render(<SearchResults data={generateData(10)} keyword="Jupiter" />);

        expect(getSearchHeading(10, "results")).toBeInTheDocument();
    });

    it("should have search heading read 1 result", () => {
        render(<SearchResults data={generateData(1)} keyword="Jupiter" />);

        expect(getSearchHeading(1, "result")).toBeInTheDocument();
    });
});

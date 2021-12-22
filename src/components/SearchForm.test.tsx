import {act, render, screen, waitFor, within} from "@testing-library/react";
import React from "react";
import user from "@testing-library/user-event";
import SearchForm from "./SearchForm";

function getKeywords(): HTMLElement {
    return screen.getByRole("textbox", {
        name: /keywords \(required\)/i,
    });
}

function getMediaType(): HTMLElement {
    return screen.getByRole("combobox", {
        name: /media type \(required\)/i,
    });
}

function getMediaOption(option: string): HTMLElement {
    return within(getMediaType()).getByRole("option", {
        name: option,
    });
}

function getYearStart(): HTMLElement {
    return screen.getByRole("textbox", {
        name: /year start/i,
    });
}

function getSubmit(): HTMLElement {
    return screen.getByRole("button", {
        name: /submit/i,
    });
}

describe("SearchForm", () => {
    const onSubmit = jest.fn();

    beforeEach(() => {
        onSubmit.mockClear();
        render(
            <SearchForm submitText="Submit" searchOnSubmitHandler={onSubmit} />
        );
    });

    it("onSubmit is called when all fields pass validation", async () => {
        user.type(getKeywords(), "jupiter");
        user.selectOptions(getMediaType(), getMediaOption("Image"));
        user.type(getYearStart(), "2005");
        user.click(getSubmit());

        await waitFor(() => {
            expect(onSubmit).toHaveBeenCalledTimes(1);
        });

        expect(onSubmit).toHaveBeenCalledWith("jupiter", "image", "2005");
    });

    it("should fail with all fields empty", async () => {
        user.click(getSubmit());

        await waitFor(() => {
            expect(onSubmit).not.toHaveBeenCalledTimes(1);
        });
    });

    it("should fail with just keywords field", async () => {
        user.type(getKeywords(), "mars");
        user.click(getSubmit());

        await waitFor(() => {
            expect(onSubmit).not.toHaveBeenCalledTimes(1);
        });
    });

    it("should fail with just media type field", async () => {
        user.selectOptions(getMediaType(), getMediaOption("Audio"));
        user.click(getSubmit());

        await waitFor(() => {
            expect(onSubmit).not.toHaveBeenCalledTimes(1);
        });
    });

    it("should submit with keywords and media type", async () => {
        user.type(getKeywords(), "James Webb Telescope");
        user.selectOptions(getMediaType(), getMediaOption("Audio"));
        user.click(getSubmit());

        await waitFor(() => {
            expect(onSubmit).toHaveBeenCalledTimes(1);
        });

        expect(onSubmit).toHaveBeenCalledWith(
            "James Webb Telescope",
            "audio",
            ""
        );
    });

    it("should fail with keywords and year start", async () => {
        user.type(getKeywords(), "James Webb Telescope");
        user.type(getYearStart(), "2021");
        user.click(getSubmit());

        await waitFor(() => {
            expect(onSubmit).not.toHaveBeenCalledTimes(1);
        });
    });

    it("should fail when keywords is less than 2 characters long", async () => {
        user.type(getKeywords(), "J");
        user.selectOptions(getMediaType(), getMediaOption("Audio"));
        user.click(getSubmit());

        await waitFor(() => {
            expect(onSubmit).not.toHaveBeenCalledTimes(1);
        });
    });

    it("should fail when keywords is more than 50 characters long", async () => {
        user.type(
            getKeywords(),
            "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz"
        );
        user.selectOptions(getMediaType(), getMediaOption("Audio"));
        user.click(getSubmit());

        await waitFor(() => {
            expect(onSubmit).not.toHaveBeenCalledTimes(1);
        });
    });

    it("should fail when year is less than 4 characters", async () => {
        user.type(getKeywords(), "Pulsars");
        user.selectOptions(getMediaType(), getMediaOption("Video"));
        user.type(getYearStart(), "20");
        user.click(getSubmit());

        await waitFor(() => {
            expect(onSubmit).not.toHaveBeenCalledTimes(1);
        });
    });

    it("should fail when year is more than 4 characters", async () => {
        user.type(getKeywords(), "Pulsars");
        user.selectOptions(getMediaType(), getMediaOption("Video"));
        user.type(getYearStart(), "20201");
        user.click(getSubmit());

        await waitFor(() => {
            expect(onSubmit).not.toHaveBeenCalledTimes(1);
        });
    });

    // TODO year is number validation
    it("should fail when year is not a number", async () => {
        user.type(getKeywords(), "Pulsars");
        user.selectOptions(getMediaType(), getMediaOption("Video"));
        user.type(getYearStart(), "acbd");
        user.click(getSubmit());

        await waitFor(() => {
            expect(onSubmit).not.toHaveBeenCalledTimes(1);
        });
    });

    // TODO write test for An error message below the field should read “Year must not be in the future.” if the user enters a year after the current year.

});

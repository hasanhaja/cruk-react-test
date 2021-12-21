import styled, { ThemeProvider } from "styled-components";
import { crukTheme } from "@cruk/cruk-react-components";
import React, { useState } from "react";
import SearchForm from "./components/SearchForm";
import Searcher from "./api/Searcher";
import SearchResults from "./components/SearchResults";
import SearchResultItem from "./api/SearchResultItem";

const SiteWrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
    overflow-x: hidden;
`;

export function App(): JSX.Element {
    const [data, setData] = useState(new Array<SearchResultItem>());
    const [keyword, setKeyword] = useState("");
    const [submitText, setSubmitText] = useState("Submit");
    const searchOnSubmitHandler = (
        keywords: string,
        mediaType: string,
        yearStart: string
    ): void => {
        const searcher = new Searcher(keywords, mediaType, yearStart);
        setKeyword(keywords);
        setSubmitText("Submitting...");
        searcher
            .fetchSearchResults()
            .then((result) => setData(result))
            .then(() => setSubmitText("Submit"))
            // TODO Remove console error
            .catch(console.error);
    };

    return (
        <ThemeProvider theme={crukTheme}>
            <SiteWrapper>
                <div>
                    <h1>CRUK technical exercise - React</h1>
                </div>
                <br />
                <div>
                    <SearchForm
                        searchOnSubmitHandler={searchOnSubmitHandler}
                        submitText={submitText}
                    />
                    <br />
                    <SearchResults data={data} keyword={keyword} />
                </div>
            </SiteWrapper>
        </ThemeProvider>
    );
}

export default App;

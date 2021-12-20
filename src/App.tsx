import styled, { ThemeProvider } from "styled-components";
import { crukTheme } from "@cruk/cruk-react-components";
import React from "react";
import SearchForm from "./components/SearchForm";
import Searcher from "./api/Searcher";

const SiteWrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
`;

export function App(): JSX.Element {
    const test = new Searcher("pluto", "image");
    const run = async (): Promise<any> => {
        const data = await test.fetchSearchResults();
        // const data = await test.fetchAssets();
        console.log(`Fetched data: ${JSON.stringify(data[0])}`);
        console.log(`Fetched data size: ${data.length}`);
        return Promise.resolve();
    };

    run();

    return (
        <ThemeProvider theme={crukTheme}>
            <SiteWrapper>
                <div>
                    <h1>CRUK technical exercise - React</h1>
                </div>
                <div>
                    <SearchForm />
                </div>
            </SiteWrapper>
        </ThemeProvider>
    );
}

export default App;

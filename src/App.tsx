import styled, { ThemeProvider } from 'styled-components';
import * as yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { Button, TextField, crukTheme } from '@cruk/cruk-react-components';
import React from 'react';
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
        console.log(data);
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

import styled, { ThemeProvider } from 'styled-components';
import * as yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { Button, TextField, crukTheme } from '@cruk/cruk-react-components';
import React from 'react';
import SearchForm from "./components/SearchForm";

const SiteWrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
`;

export function App(): JSX.Element {
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

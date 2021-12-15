import { Field, Form, Formik } from 'formik';
import { Button, TextField } from '@cruk/cruk-react-components';
import React from 'react';
import * as yup from 'yup';

export function SearchForm(): JSX.Element {
    // TODO move schema else where?
    const formSchema = yup.object().shape({
        town: yup.string().required('Please enter keywords to search.'),
    });
    return (
        <Formik
            validateOnChange
            initialValues={{
                keywords: '',
            }}
            validationSchema={formSchema}
            onSubmit={(values) => {
                console.log(values);
            }}
        >
            {({ errors, touched }) => (
                <Form>
                    <Field name="keywords">
                        {({ field }) => (
                            <>
                                <TextField
                                    label="Keywords"
                                    type="text"
                                    required
                                    {...field}
                                />
                                {errors.keywords && touched.keywords && (
                                    <p>{errors.keywords}</p>
                                )}
                            </>
                        )}
                    </Field>

                    <Button type="submit">Submit</Button>
                </Form>
            )}
        </Formik>
    );
}

export default SearchForm;

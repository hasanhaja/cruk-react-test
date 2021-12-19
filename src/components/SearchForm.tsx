import { Field, Form, Formik, FieldProps } from "formik";
import { Button, TextField } from "@cruk/cruk-react-components";
import React from "react";
import * as yup from "yup";
import MediaTypeField from "./MediaTypeField";

export function SearchForm(): JSX.Element {
    // TODO move schema else where?
    const formSchema = yup.object().shape({
        town: yup.string().required("Please enter keywords to search."),
    });
    return (
        <Formik
            // validateOnChange
            initialValues={{
                keywords: "",
            }}
            // validationSchema={formSchema}
            // TODO onSubmit is not working for some reason
            onSubmit={(values) => {
                // console.log(values);
                alert(values);
            }}
        >
            {({ errors, touched }) => (
                <Form>
                    <Field name="keywords">
                        {({ field }: FieldProps) => (
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
                    {/* Split fields into separate fields with their own validation schemas */}
                    <Field name="mediaType">
                        {() => (
                            <>
                                <MediaTypeField />
                                {errors.keywords && touched.keywords && (
                                    <p>{errors.keywords}</p>
                                )}
                            </>
                        )}
                    </Field>

                    <Field name="yearStart">
                        {({ field }: FieldProps) => (
                            <>
                                <TextField
                                    label="Year start"
                                    type="text"
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

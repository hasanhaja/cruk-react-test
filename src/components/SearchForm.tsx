import { Field, Form, Formik, FieldProps } from "formik";
import { Button, Select, TextField } from "@cruk/cruk-react-components";
import React from "react";
import * as yup from "yup";
import styled from "styled-components";

export interface SearchFormProps {
    submitText: string;
    searchOnSubmitHandler: (
        keywords: string,
        mediaType: string,
        yearStart: string
    ) => void;
}

export function SearchForm({
    submitText,
    searchOnSubmitHandler,
}: SearchFormProps): JSX.Element {
    const formSchema = yup.object().shape({
        keywords: yup
            .string()
            .min(2, "Keywords must be between 2 and 50 characters.")
            .max(50, "Keywords must be between 2 and 50 characters.")
            .required("Please enter keywords to search."),
        mediaType: yup.string().required("Please enter media type."),
        yearStart: yup
            .string()
            .min(4, "Please enter a valid year.")
            .max(4, "Please enter a valid year.")
            .optional(),
    });
    return (
        <Formik
            validateOnChange
            initialValues={{
                keywords: "",
                mediaType: "",
                yearStart: "",
            }}
            validationSchema={formSchema}
            onSubmit={(values) => {
                searchOnSubmitHandler(
                    values.keywords,
                    values.mediaType,
                    values.yearStart
                );
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

                    <Field name="mediaType">
                        {({ field }: FieldProps) => (
                            <>
                                <Select label="Media type" required {...field}>
                                    <option disabled value="">
                                        --Please select a media type--
                                    </option>
                                    <option value="audio">Audio</option>
                                    <option value="video">Video</option>
                                    <option value="image">Image</option>
                                </Select>
                                {errors.mediaType && touched.mediaType && (
                                    <p>{errors.mediaType}</p>
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
                                {errors.yearStart && touched.yearStart && (
                                    <p>{errors.yearStart}</p>
                                )}
                            </>
                        )}
                    </Field>
                    <br />
                    <Button type="submit">{submitText}</Button>
                </Form>
            )}
        </Formik>
    );
}

export default SearchForm;

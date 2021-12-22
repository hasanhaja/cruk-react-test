import { Field, Form, Formik, FieldProps } from "formik";
import { Button, Select, TextField } from "@cruk/cruk-react-components";
import React from "react";
import * as yup from "yup";

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
            .number()
            .typeError("Please enter a number.")
            .integer("Please enter a valid year.")
            .positive()
            .min(1000, "Please enter a valid year.")
            .max(new Date().getFullYear(), "Year must not be in the future.")
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
                            <TextField
                                label="Keywords"
                                type="text"
                                required
                                errorMessage={errors.keywords}
                                hasError={
                                    errors.keywords !== undefined &&
                                    touched.keywords !== undefined
                                }
                                {...field}
                            />
                        )}
                    </Field>
                    <br />
                    <Field name="mediaType">
                        {({ field }: FieldProps) => (
                            <Select
                                label="Media type"
                                required
                                errorMessage={errors.mediaType}
                                hasError={
                                    errors.mediaType !== undefined &&
                                    touched.mediaType !== undefined
                                }
                                {...field}
                            >
                                <option disabled value="">
                                    --Please select a media type--
                                </option>
                                <option value="audio">Audio</option>
                                <option value="video">Video</option>
                                <option value="image">Image</option>
                            </Select>
                        )}
                    </Field>
                    <br />
                    <Field name="yearStart">
                        {({ field }: FieldProps) => (
                            <TextField
                                label="Year start"
                                type="text"
                                errorMessage={errors.yearStart}
                                hasError={
                                    errors.yearStart !== undefined &&
                                    touched.yearStart !== undefined
                                }
                                {...field}
                            />
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

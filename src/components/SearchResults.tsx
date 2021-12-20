import React from "react";
import styled from "styled-components";
import { Heading } from "@cruk/cruk-react-components";
import SearchResultItem from "../api/SearchResultItem";
import MediaCard from "./MediaCard";

export interface SearchResultsProps {
    data: Array<SearchResultItem>;
    keyword: string;
}

const Container = styled.div`
    background: #fff;
    padding: 0 1%;
    min-width: 250px;
`;

export function SearchResults({
    data,
    keyword,
}: SearchResultsProps): JSX.Element {
    return (
        <Container>
            {/* Only show title if data is loaded */}
            {keyword !== "" ? (
                <Heading h4>{`Showing results for "${keyword}"`}</Heading>
            ) : null}

            {data.map((d, index) => (
                <div id={`${index}`}>
                    <MediaCard data={d} />
                    <br />
                </div>
            ))}
        </Container>
    );
}

export default SearchResults;

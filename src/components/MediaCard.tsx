import React from "react";
import styled from "styled-components";
import { Text, Heading } from "@cruk/cruk-react-components";
import SearchResultItem from "../api/SearchResultItem";

export interface MediaCardProps {
    data: SearchResultItem;
}

const Card = styled.div`
    background: #fff;
    max-width: 450px;
    min-width: 250px;
    max-height: fit-content;
    border-radius: 4px;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
`;

const CardContent = styled.div`
    padding: 5% 2%;
`;

const Photo = styled.img`
    width: 100%;
    max-height: 30rem;
    object-fit: cover;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
`;

const Video = styled.video`
    width: 100%;
    height: auto;
    object-fit: cover;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
`;

const Audio = styled.audio`
    width: 100%;
    height: auto;
`;

function mediaObject(data: SearchResultItem): JSX.Element {
    switch (data.mediaType) {
        case "image":
            return <Photo src={data.href} alt={data.title} />;
        case "audio":
            return (
                <Audio controls>
                    <source src={data.href} type="audio/mpeg" />
                </Audio>
            );
        case "video":
            return (
                <Video controls>
                    <source src={data.href} />
                </Video>
            );
        default:
            return <noscript />;
    }
}

export function MediaCard({ data }: MediaCardProps): JSX.Element {
    return (
        <Card>
            {mediaObject(data)}
            <CardContent>
                <Heading h5>{data.title}</Heading>
                <Text>{data.description}</Text>
            </CardContent>
        </Card>
    );
}

export default MediaCard;

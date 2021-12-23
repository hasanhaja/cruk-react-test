import React from "react";
import styled from "styled-components";
import { Text, Heading, Badge } from "@cruk/cruk-react-components";
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
    overflow: hidden;
    display: grid;
    grid-template-areas:
        "media"
        "content";
`;

const CardContent = styled.div`
    padding: 5% 2%;
    grid-area: content;

    display: grid;
    grid-template-columns: 7fr 1fr;
    grid-template-areas:
        "title center"
        "description description";
`;

const Title = styled(Heading)`
    grid-area: title;
`;

const Description = styled(Text)`
    grid-area: description;
`;

const Center = styled(Badge)`
    grid-area: center;
    width: 2em;
    height: 2em;
`;

const Photo = styled.img`
    width: 100%;
    max-height: 30rem;
    object-fit: cover;
    grid-area: media;
`;

const Video = styled.video`
    width: 100%;
    height: auto;
    object-fit: cover;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    grid-area: media;
`;

const Audio = styled.audio`
    width: 100%;
    height: auto;
    grid-area: media;
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
                <Title h5>{data.title}</Title>
                <Center size="xxs">{data.center}</Center>
                <Description>{data.description}</Description>
            </CardContent>
        </Card>
    );
}

export default MediaCard;

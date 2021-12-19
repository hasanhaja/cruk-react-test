import Response from "./Response";

export interface SearchResponse extends Response<Item> {
    items: Array<Item>;
}

export interface Item {
    data: Array<Data>;
}

export interface Data {
    center: string;
    title: string;
    nasaId: string;
    mediaType: string;
    description: string;
}

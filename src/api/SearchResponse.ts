export interface SearchResponse {
    items: Array<Item>;
}

// TODO rework this to match data schema properly... one extra level of nesting
export interface Item {
    data: Array<ResponseData>;
}

export interface ResponseData {
    value: Array<Data>;
}

export interface Data {
    center: string;
    title: string;
    nasaId: string;
    mediaType: string;
    description: string;
}

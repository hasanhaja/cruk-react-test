import { Data, Item, SearchResponse } from "./SearchResponse";
import ResponseParser from "./ResponseParser";

export class SearchResponseParser extends ResponseParser<SearchResponse> {
    private readonly pageSize: number;

    constructor(json: any, pageSize = 10) {
        super(json);
        this.pageSize = pageSize;
    }

    public get result(): SearchResponse {
        const { collection } = this.json;
        return SearchResponseParser.parseToSearchResponse(
            collection,
            this.pageSize
        );
    }

    private static parseToSearchResponse(
        collection: any,
        pageSize: number
    ): SearchResponse {
        const responseItems = collection.items as Array<any>;

        // Map operations are not lazy like in Java, so slicing it first
        const items = responseItems
            .slice(0, pageSize)
            .map((item: any) => this.parseToItem(item));
        return {
            items,
        };
    }

    private static parseToItem(item: any): Item {
        const dataItem = item.data as Array<any>;
        const data = dataItem.map((d: any) => this.parseToData(d));
        return {
            data,
        };
    }

    private static parseToData(data: any): Data {
        return {
            center: data.center,
            title: data.title,
            nasaId: data.nasa_id,
            mediaType: data.media_type,
            description: data.description,
        };
    }
}

export default SearchResponseParser;

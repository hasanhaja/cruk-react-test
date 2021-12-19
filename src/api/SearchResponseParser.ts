import { Data, Item, SearchResponse } from "./SearchResponse";
import ResponseParser from "./ResponseParser";

export class SearchResponseParser extends ResponseParser<SearchResponse> {
    public get result(): SearchResponse {
        const { collection } = this.json;
        return SearchResponseParser.parseToSearchResponse(collection);
    }

    private static parseToSearchResponse(collection: any): SearchResponse {
        const responseItems = collection.items as Array<any>;
        const items = responseItems.map((item: any) => this.parseToItem(item));
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

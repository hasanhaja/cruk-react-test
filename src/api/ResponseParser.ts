import { Data, Item, ResponseData, SearchResponse } from "./SearchResponse";

export class ResponseParser {
    private readonly json: any;

    constructor(json: any) {
        this.json = json;
    }

    public get result(): SearchResponse {
        const { collection } = this.json;

        // console.log(`Printing collection:\n${JSON.stringify(collection)}`);

        return ResponseParser.parseToSearchResponse(collection);
    }

    private static parseToSearchResponse(collection: any): SearchResponse {
        const responseItems = collection.items as Array<any>;

        // console.log(`Printing collection:\n${JSON.stringify(responseItems)}`);

        const items = responseItems.map((item: any) => this.parseToItem(item));
        return {
            items,
        };
    }

    private static parseToItem(item: any): Item {
        const dataItem = item.data as Array<any>;

        // console.log(`Printing collection:\n${JSON.stringify(dataItem)}`);

        const data = dataItem.map((d: any) => this.parseToResponseData(d));
        return {
            data,
        };
    }

    private static parseToResponseData(data: any): ResponseData {
        const dataValue = data as Array<any>;

        console.log(`Printing collection:\n${JSON.stringify(dataValue)}`);
        // TODO this is the object and does not need to be mapped

        const value = dataValue.map((v: any) => this.parseToData(v));
        return {
            value,
        };
    }

    // TODO fix this implementation
    private static parseToData(data: any): Data {

        // console.log(`Printing collection:\n${JSON.stringify(data)}`);

        return {
            center: data.center,
            title: data.title,
            nasaId: data.nasa_id,
            mediaType: data.media_type,
            description: data.description,
        };
    }
}

export default ResponseParser;

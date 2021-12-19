import SearchResultItem from "./SearchResultItem";
import { Data, SearchResponse } from "./SearchResponse";
import ResponseParser from "./ResponseParser";

export class Searcher {
    private readonly keywords: string;

    private readonly mediaType: string;

    private readonly year: string | undefined;

    constructor(keywords: string, mediaType: string, year?: string) {
        this.keywords = keywords;
        this.mediaType = mediaType;
        this.year = year;
    }

    // TODO check the formatting for the date
    public get constructedQuery(): string {
        const baseQuery = `https://images-api.nasa.gov/search?q=${this.keywords}&media_type=${this.mediaType}`;
        return typeof this.year !== "undefined"
            ? `${baseQuery}&year_start=${this.year}`
            : baseQuery;
    }

    // TODO Handle error query?
    // TODO figure out how to do this mapping
    // https://stackoverflow.com/questions/50093886/typescript-convert-json-object-to-a-class-interface-object
    //  https://stackoverflow.com/questions/45448199/how-to-dynamically-map-a-json-response-object-to-an-entity
    // TODO convert keys to pascal case to cast correctly: https://stackoverflow.com/questions/44437953/angular-typescript-converting-from-snake-case-to-camel-case-in-interfaces
    // private async fetchSearchResults(): Promise<Array<SearchResultItem>> {
    public async fetchSearchResults(): Promise<Data | undefined> {
        const response = await fetch(this.constructedQuery);
        const jsonResponse = await response.json();
        // const parsedResponse: SearchResponse =
        //     jsonResponse.collection as SearchResponse;

        const parser = new ResponseParser(jsonResponse);
        const parsedResponse = parser.result;

        console.log(parsedResponse);
        const data = parsedResponse.items.at(0)?.data.at(0)?.value.at(0);

        return data;
    }

    /**
     * export interface SearchResultItem {
     *     nasaId: string;
     *     mediaType: string;
     *     title: string;
     *     description: string;
     * }
     */

    private static parseToSearchResultItem(): SearchResultItem | string {
        return "";
    }
}

export default Searcher;

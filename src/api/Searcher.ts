import SearchResultItem from "./SearchResultItem";
import { Data } from "./SearchResponse";
import SearchResponseParser from "./SearchResponseParser";
import AssetResponseParser from "./AssetResponseParser";
import AssetResponse from "./AssetResponse";

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
    public async fetchSearchResults(): Promise<Array<SearchResultItem>> {
        const response = await fetch(this.constructedQuery);
        const jsonResponse = await response.json();
        const parser = new SearchResponseParser(jsonResponse);
        const parsedResponse = parser.result;

        // TODO map to get asset hrefs here and pass into parseDataToSearchResultItem??
        //  or call it there?

        return parsedResponse.items
            .map((item) => item.data[0])
            .map(Searcher.parseDataToSearchResultItem);
    }

    private static async fetchAssetResponse(
        nasaId: string
    ): Promise<AssetResponse> {
        const query = `https://images-api.nasa.gov/asset/${nasaId}`;
        const response = await fetch(query);
        const jsonResponse = await response.json();

        const parser = new AssetResponseParser(jsonResponse);

        return parser.result;
    }

    private static parseDataToSearchResultItem(data: Data): SearchResultItem {
        return data as SearchResultItem;
    }
}

export default Searcher;

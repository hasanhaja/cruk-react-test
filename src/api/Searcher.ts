import SearchResultItem from "./SearchResultItem";
import { Data } from "./SearchResponse";
import SearchResponseParser from "./SearchResponseParser";
import AssetResponseParser from "./AssetResponseParser";
import AssetResponse from "./AssetResponse";

export class Searcher {
    private readonly keywords: string;

    private readonly mediaType: string;

    private readonly year: string;

    constructor(keywords: string, mediaType: string, year: string) {
        this.keywords = keywords;
        this.mediaType = mediaType;
        this.year = year;
    }

    public get constructedQuery(): string {
        const baseQuery = `https://images-api.nasa.gov/search?q=${this.keywords}&media_type=${this.mediaType}`;
        return this.year !== ""
            ? `${baseQuery}&year_start=${this.year}`
            : baseQuery;
    }

    // TODO Handle error query?
    public async fetchSearchResults(): Promise<Array<SearchResultItem>> {
        const response = await fetch(this.constructedQuery);
        const jsonResponse = await response.json();
        const parser = new SearchResponseParser(jsonResponse);
        const parsedResponse = parser.result;

        return Promise.all(
            parsedResponse.items
                .map((item) => item.data[0])
                .map((data) => Searcher.parseDataToSearchResultItem(data))
        );
    }

    private static async fetchAssetResponse(
        nasaId: string,
        mediaType: string
    ): Promise<AssetResponse> {
        const query = `https://images-api.nasa.gov/asset/${nasaId}`;
        const response = await fetch(query);
        const jsonResponse = await response.json();

        const parser = new AssetResponseParser(jsonResponse, mediaType);

        return parser.result;
    }

    private static async parseDataToSearchResultItem(
        data: Data
    ): Promise<SearchResultItem> {
        const asset = await this.fetchAssetResponse(
            data.nasaId,
            data.mediaType
        );
        const { href } = asset.items[0];
        return {
            href,
            ...data,
        };
    }
}

export default Searcher;

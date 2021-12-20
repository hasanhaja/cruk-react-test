import ResponseParser from "./ResponseParser";
import AssetResponse, { Asset } from "./AssetResponse";

export class AssetResponseParser extends ResponseParser<AssetResponse> {
    private readonly mediaType: string;

    constructor(json: any, mediaType: string) {
        super(json);
        this.mediaType = mediaType;
    }

    public get result(): AssetResponse {
        const { collection } = this.json;
        return AssetResponseParser.parseToAssetResponse(
            collection,
            this.mediaType
        );
    }

    private static parseToAssetResponse(
        collection: any,
        mediaType: string
    ): AssetResponse {
        const responseItems = collection.items as Array<any>;
        const items = responseItems
            .map((item: any) => this.parseToAsset(item))
            .filter(({ href }: Asset) => this.filterFileExtension(href, mediaType));
        return {
            items,
        };
    }

    private static filterFileExtension(
        href: string,
        mediaType: string
    ): boolean {
        const acceptableFileExts = [];

        switch (mediaType) {
            case "image":
                acceptableFileExts.push(...[".jpg"]);
                break;
            case "audio":
                acceptableFileExts.push(...[".mp3"]);
                break;
            case "video":
                acceptableFileExts.push(...[".mov", ".mp4"]);
                break;
            default:
                break;
        }

        const valid = acceptableFileExts
            .map((ext) => href.endsWith(ext))
            .filter((testResult) => testResult);

        return valid.length > 0;
    }

    private static parseToAsset(item: any): Asset {
        return {
            href: item.href,
        };
    }
}

export default AssetResponseParser;

import ResponseParser from "./ResponseParser";
import AssetResponse, { Asset } from "./AssetResponse";

export class AssetResponseParser extends ResponseParser<AssetResponse> {
    public get result(): AssetResponse {
        const { collection } = this.json;
        return AssetResponseParser.parseToAssetResponse(collection);
    }

    private static parseToAssetResponse(collection: any): AssetResponse {
        const responseItems = collection.items as Array<any>;
        const items = responseItems.map((item: any) => this.parseToAsset(item));

        return {
            items,
        };
    }

    private static parseToAsset(item: any): Asset {
        return {
            href: item.href,
        };
    }
}

export default AssetResponseParser;

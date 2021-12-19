import Response from "./Response";

export interface AssetResponse extends Response<Asset> {
    items: Array<Asset>;
}

export interface Asset {
    href: string;
}

export default AssetResponse;

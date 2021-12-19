import { Data } from "./SearchResponse";
import { Asset } from "./AssetResponse";

export interface SearchResultItem extends Data, Asset {}

export default SearchResultItem;

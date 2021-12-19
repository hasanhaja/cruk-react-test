import Response from "./Response";

export abstract class ResponseParser<T extends Response<any>> {
    protected readonly json: any;

    public constructor(json: any) {
        this.json = json;
    }

    abstract get result(): T;
}

export default ResponseParser;

import { ResponseContentType, Headers } from "@angular/http";

export interface ApiRequestOptions {
    /**
     * When false, it will use the configured base path. Default: false;
     */
    fullUrl?: Boolean;
    /**
     * Http custom Headers;
     */
    headers?: Headers;
    /**
     * ResponseContentType; Default: JSON
     */
    responseType?: ResponseContentType;
    /**
     * When true, it's going to automatically map the response based on the responseType;
     */
    autoMapResponse?: boolean;
}

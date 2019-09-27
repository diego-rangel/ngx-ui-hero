export interface ApiSettings {
    /**
     * Your api base Url used for common http requests.
     * Eg.: http://yourdomain.com
     */
    apiBaseUrl?: string;
    /**
     * An api alias used as a suffix of your apiBaseUrl.
     * Eg.: api
     */
    apiAlias?: string;
    /**
     * A prefix to be used into localStorage Keys.
     * Default: 'uiHero_'
     */
    localStoragePrefix?: string;
    /**
     * A suffix to be used into localStorage where you want to store your JWT tokens.
     * Default: 'access_token'
     */
    jwtLocalStorageSuffix?: string;
    responseDataPropertyName?: string;
}
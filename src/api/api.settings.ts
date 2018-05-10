export interface ApiSettings {
    /**
     * Your api base Url used for Authentication and common http requests.
     * Eg.: http://yourdomain/api
     */
    apiBaseUrl: string;

    /**
     * JWT Authentication Settings
     */
    jwtAuthSettings: JwtAuthSettings;

    /**
     * Error Handling Settings.
     */
    errorHandlingSettings: ErrorHandlingSettings;
}

export interface JwtAuthSettings {
    /**
     * Your endpoint for JWT Authentication.
     * Eg.: '/token'
     */
    jwtEndpointPath: string;

    /**
     * A prefix to be used into localStorage Keys.
     * Default: 'uiHero_'
     */
    localStoragePrefix: string;

    /**
     * Request properties.
     */
    requestProperties: RequestProperties;

    /**
     * Response properties.
     */
    responseProperties: ResponseProperties;
}

export interface ErrorHandlingSettings {
    /**
     * A common title to be used when your api throws an unhandled error.
     * Eg.: 'Oops! Something went wrong =('
     */
    unhandledErrorTitle: string;

    /**
     * A common text message to be used when your api throws an unhandled error.
     * Eg.: 'Sorry! It was not possible to proccess your request at this moment.'
     */
    unhandledErrorMessage: string;
}

export interface RequestProperties {
    /**
     * The name of the Authentication request json property for the Username.
     */
    usernameAuthProperty: string;

    /**
     * The name of the Authentication request json property for the Password.
     */
    passwordAuthProperty: string;
}

export interface ResponseProperties {
    /**
     * The name of the Authentication response json property that contains the Jwt Token to be stored into LocalStorage.
     * Default: 'access_token'
     */
    accessTokenAuthProperty: string;
}

export interface CoreSettings {
    /**
     * Api Settings.
     */
    apiSettings: ApiSettings;    
    /**
     * Error Handling Settings.
     */
    errorHandlingSettings: ErrorHandlingSettings;    
}

export interface ApiSettings {
    /**
     * Your api base Url used for Authentication and common http requests. Eg.: http://yourdomain/api
     */
    apiBaseUrl: string;

    /**
     * Your endpoint for JWT Authentication. Eg.: /token
     */
    jwtEndpointPath: string;
}

export interface ErrorHandlingSettings {
    /**
     * A common title to be used when your api throws an unhandled error. Eg.: 'Oops! Something went wrong =('
     */
    unhandledErrorTitle: string;

    /**
     * A common text message to be used when your api throws an unhandled error. Eg.: 'Sorry! It was not possible to proccess your request at this moment.'
     */
    unhandledErrorMessage: string;
}
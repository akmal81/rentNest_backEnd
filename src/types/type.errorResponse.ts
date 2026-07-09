export interface IErroResponse {
    success:boolean;
    message:string;
    errorDetails?:unknown
}

export interface IErrorSources {
    path: string;
    message: string
}
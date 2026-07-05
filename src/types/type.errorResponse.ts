export interface IErroSource{
    path:string;
    message:string
}

export interface IErroResponse {
    success:boolean;
    statusCode:number;
    name:string;
    message:string;
    errorSources?:IErroSource //todo
    stack?:string //todo
    error?:unknown
}
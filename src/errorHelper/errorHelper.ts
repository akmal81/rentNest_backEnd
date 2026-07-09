import z from "zod";
import { IErroResponse } from "../types";
import status from "http-status";
import { IErrorSources } from "../types/type.errorResponse";

export const handleZodError = (err: z.ZodError): IErroResponse => {


    const statusCode = status.BAD_REQUEST;
    const message = "Validation Error";
    const errorSources: IErrorSources[] = [];


    err.issues.forEach(issue => {
        errorSources.push(
            {
                path: issue.path.join(" => "),
                message: issue.message
            }
        )
    })


    return {
        success: false,
        // statusCode,
        message,
        errorDetails : errorSources
    }
}
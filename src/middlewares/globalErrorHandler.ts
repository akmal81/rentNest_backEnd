import { NextFunction, Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client";
import z from "zod";
import httpStatus from "http-status"
import { IErroResponse } from "../types";
import AppError from "../errorHelper/appError";
import { handleZodError } from "../errorHelper/errorHelper";



export const globalErrorHandler = async(
    err:any, 
    req:Request, 
    res:Response, 
    next:NextFunction
)=>{

    let statusCode:number = 401 ;
    let errorMessage = err.message || "Internal Server Error";

    if (err instanceof z.ZodError) {
        statusCode = httpStatus.BAD_REQUEST as number;
        const errorResponse = handleZodError(err);
        res.status(statusCode).json(errorResponse);
        return;
    }

    if(err instanceof AppError){
        statusCode = err.statusCode;
        errorMessage = err.message;

    }

    else if (err instanceof Prisma.PrismaClientValidationError) {
        statusCode = httpStatus.CONFLICT;
        errorMessage = "Incorrect field type provided or missing fields"
    }
    else if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if(err.code === 'P2002'){
                statusCode = httpStatus.CONFLICT;
                errorMessage = "Duplicate Key Error";
            }else if(err.code === 'P2003'){
                statusCode = httpStatus.CONFLICT,
                errorMessage = "Foreign Key constraint failed"
            }else if (err.code === "P2025") {
                statusCode = httpStatus.BAD_REQUEST;
                errorMessage = "An operation failed because it depends on one or more records that were required but not found"
            }

    }
    else if(err instanceof Prisma.PrismaClientInitializationError){
        if(err.errorCode === 'P1000'){
            statusCode = httpStatus.UNAUTHORIZED;
            errorMessage = "Authentication Failed against Database Server"
        }else if (err.errorCode === "P1001") {
            statusCode = httpStatus.INTERNAL_SERVER_ERROR,
            errorMessage = "Cannot reach database server"
        }
    }
    else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
        statusCode = httpStatus.BAD_REQUEST;
        errorMessage = "Error Occured During query execution"
    }
    
    else if (err instanceof Error) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        errorMessage = "Inernal server error!!"
    }

    const errorResposne: IErroResponse = {
        success: false,
        message:errorMessage,
        errorDetails:err,
    }

    res.status(statusCode).json(errorResposne)
}
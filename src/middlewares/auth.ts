import { NextFunction, Request, Response } from "express";
import { Role } from "../../generated/prisma/enums";
import { catchAsync } from "../utils/catchAsync";
import httpStatus from "http-status"
import config from "../config";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import AppError from "../errorHelper/appError";
import { jwtUtils } from "../utils/jwt";


declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string,
                name: string,
                email: string,
                role: string

            }
        }

    }
}

export const auth = (...roles: Role[]) => {
    return catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {

            const token = req.cookies.accessToken ?
                req.cookies.accessToken
                :
                req.headers.authorization?.startsWith("Bearer ")
                    ?
                    req.headers.authorization?.split(" ")[1]
                    :
                    req.headers.authorization;

            if (!token) {
                throw new AppError(httpStatus.NOT_FOUND, "You are not loggedin. Please login first!")
            }

            const verifiedToken = jwtUtils.verifiedToken(token, config.jwt_access_secret)

            if (!verifiedToken.success) {
                throw new AppError(httpStatus.BAD_REQUEST, "Vefification Failed")
            }

            const { email, name, id, role } = verifiedToken.data as JwtPayload;

            if (roles.length && !roles.includes(role)) {
                throw new AppError(httpStatus.FORBIDDEN, "Forbidden. You don't have permission to access this resource.")
            }

            const user = await prisma.user.findUnique({
                where: {
                    id,
                    email,
                    name,
                    role
                }
            })

            if (!user) {
                throw new AppError(httpStatus.NOT_FOUND, "User not found. Please login or signup")
            }

            if (user.status === 'BLOCK') {
                throw new AppError(httpStatus.FORBIDDEN, "Forbidden. Your Account is Blocked")
            }

            req.user = {
                id,
                email,
                name,
                role
            }
            next()
        })
}
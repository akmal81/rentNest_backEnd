import bcrypt from "bcryptjs"
import AppError from "../../errorHelper/appError"
import { prisma } from "../../lib/prisma"
import { ILogininUserPayload, IRegisterUserPayload } from "./auth.interface"
import httpStatus from 'http-status'
import config from "../../config"
import { jwtUtils } from "../../utils/jwt"
import { SignOptions } from "jsonwebtoken"

const registerUserIntoDb = async (paylod: IRegisterUserPayload) => {
    const { name, email, password, role, profilePhoto } = paylod
    const isUserExists = await prisma.user.findUnique({
        where: { email }
    })

    if (isUserExists) {
        throw new AppError(httpStatus.CONFLICT, "User with this email already exists!")
    }

    const hashPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds))

    const createdUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashPassword,
            role,
            profile: {
                create: {
                    profilePhoto
                }
            }
        }
    })

    const user = await prisma.user.findUnique({
        where: {
            id: createdUser.id,
            email: createdUser.email
        },
        omit: {
            password: true
        },
        include: {
            profile: true
        }
    })
    return user
}

const loginUser = async (payload: ILogininUserPayload) => {
    const { email, password } = payload;
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email
        },
    })

    if (user.status === "BLOCK") {
        throw new AppError(httpStatus.FORBIDDEN, "Your user account is blocke please contact support!")
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    const jwtPayload = {
        id : user.id,
        name:user.name,
        email:user.email,
        role:user.role
    } 

    const accessToken = jwtUtils.createToken(
        jwtPayload,
        config.jwt_access_secret,
        config.jwt_access_expires_in as SignOptions
    )
    const refreshToken = jwtUtils.createToken(
        jwtPayload,
        config.jwt_refresh_secret,
        config.jwt_refresh_expires_in as SignOptions
    )

    return {
        accessToken,
        refreshToken
    }
}


export const authServices = {
    registerUserIntoDb,
    loginUser
}
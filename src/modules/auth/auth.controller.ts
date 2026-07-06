import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status'
import { authServices } from "./auth.service";


const registerUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const user = await authServices.registerUserIntoDb(req.body);
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "User Registration Successful",
            data: { user }
        })
    }
);


const loginUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const loginInfo = await authServices.loginUser(req.body);
        const { accessToken, refreshToken } = loginInfo;
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1000 * 60 * 60 * 24
        })
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1000 * 60 * 60 * 24 * 7 
        })
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Login Successful",
            data: {
                accessToken,
                refreshToken
            }
        })
    }
);


const geMyProfile = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.user?.id;
        const myProfile = await authServices.getMyProfileFromDb(userId as string);
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "User Profile Retrive Successfully!",
            data: { myProfile }
        })
    }
);





export const authController = {
    registerUser,
    loginUser,
    geMyProfile

}
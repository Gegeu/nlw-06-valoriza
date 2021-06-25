import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    const authToken = request.headers.authorization;

    if(!authToken) {
        return response.status(401).json({message: "Token missing"});
    }

    const [, token] = authToken.split(" ");

    try {
        const { sub } = verify(token, "e0f9ff5446574a2abf3b043a82700cb8d6e1336adfe66ae44a66d66254933d52") as IPayload;
        
        request.user_id = sub;

        return next();
    } catch (err) {
        console.log("caiu catch")
        return response.status(401).end();
    }


}
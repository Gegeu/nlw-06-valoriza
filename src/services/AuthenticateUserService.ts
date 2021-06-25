import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";


interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {

    async execute({email, password}: IAuthenticateRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories);

        const user = await usersRepositories.findOne({
            email   
        });

        if(!user) {
            throw new Error("Email or Password incorrect");
        }

        const passorwdMatch = await compare(password, user.password);

        if(!passorwdMatch) {
            throw new Error("Email or Password incorrect");
        }

        // algeunlw em SHA256
        const secret = "e0f9ff5446574a2abf3b043a82700cb8d6e1336adfe66ae44a66d66254933d52"

        const token = sign({
            email: user.email
        }, secret, {
            subject: user.id,
            expiresIn: "1d"
        });

        console.log("seu token! " + token);

    }
}

export { AuthenticateUserService };
import { IUserImg } from "../../settings/settings";

export interface IUser{
    id: number,
    name?: string,
    username?: string,
    surname?: string,
    dateOfBirth?: Date,
    email: string,
    password: string,
    signature?: string,
    image?: IUserImg
}
import { IUser } from "../../auth/types";

export interface IPostImg{
    id: number;
    url: string,
    postId: number
}
export interface IPost{
    id: number, 
    name: string
    theme?: string 
    tags?: string
    text: string,
    links?: string,
    images: IPostImg[],
    user: IUser
}
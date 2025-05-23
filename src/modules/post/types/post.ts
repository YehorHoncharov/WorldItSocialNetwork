import { IUser } from "../../auth/types";
import { PostTag } from "../ui/change-post/types";

export interface IPostImg{
    id: number;
    url: string,
    userPostId: number
}
export interface IPost{
    id: number, 
    name?: string,
    theme?: string ,
    tags?: PostTag[],
    text?: string,
    links?: string,
    images?: IPostImg[],
    authorId?: number;
    views?: number | null;
    likes?: number | null;
}
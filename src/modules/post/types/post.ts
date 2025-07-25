import { IUser } from "../../auth/types";


export interface IPostImg {
    image: {
        id: number;
        filename: string;
        file?: string,
    }

}

export interface PostTag {
    tag: {
        userPostId: number;
        tagId: number;
        name: string;
    }
}

export interface IPost {
    id: number;
    title: string;
    theme: string | null;
    content: string;
    links: Link[] | null;
    views: IUser | null;
    likes: IUser | null;
    author_id: number;
    images: IPostImg[] | null;
    tags: PostTag[] | null;
}

export interface Link {
    id: number;
    url: string;
    userPostId: number;
}
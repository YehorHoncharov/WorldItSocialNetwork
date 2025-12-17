import { IPost, IPostImg } from "../../types/post";

export interface PostTag {
    tag: {
        id: number;
        name: string;
    };
}

export interface PostData {
    id: number;
    name: string;
    theme: string | null;
    text: string;
    links: string | null;
    images: IPostImg[];
    tags: PostTag[];
    authorId: number;
    views: number | null;
    likes: number | null;
}

export interface ImageUpdate {
    create?: { url: string }[];
    delete?: string[];
}

export interface TagItem {
    label: string;
    value: string;
}

export interface UpdateData {
    title: string;
    theme: string;
    content: string;
    links?: string;
    tags?: string[];
    images?: ({ id?: number; url: string } | { id: number; url?: string })[];
}

export interface Props {
    modalVisible: boolean;
    changeVisibility: () => void;
    postData: IPost | null;
}

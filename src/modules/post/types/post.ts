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

    // id Int @id @default(autoincrement())
    // name String
    // theme String
    // tags String?
    // text String
    // links String?
    // images Image[]
    // views Int?
    // likes Int?
    // author User @relation(fields: [authorId], references: [id])
    // authorId Int

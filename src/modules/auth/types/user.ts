import { IFriendship } from '../../friends/types/friends.type';

export interface IUser{
    id: number,
    name?: string,
    username?: string,
    surname?: string,
    dateOfBirth?: Date,
    email: string,
    password: string,
    signature?: string,
    image?: string,
    friendship?: IFriendship[]
}
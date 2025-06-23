import { Chat } from '../../chat/types/socket';
import { IFriendship } from '../../friends/types/friends.type';

export interface IUser {
    id: number,
    name?: string,
    username?: string,
    surname?: string,
    date_of_birth?: Date,
    email: string,
    password: string,
    signature?: string,
    image?: string,
    friendship_from?: IFriendship[],
    friendship_to?: IFriendship[],
    chat_group_members?: IUser[],
    chat_messages?: Chat[], 
    administered_groups?: Chat[]
    
}
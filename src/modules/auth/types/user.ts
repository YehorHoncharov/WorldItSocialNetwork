import { Chat } from '../../chat/types/socket';
import { IFriendship } from '../../friends/types/friends.type';

export interface IUser {
    id: number,
    first_name?: string,
    username?: string,
    last_name?: string,
    date_of_birth?: Date,
    email: string,
    password: string,
    signature?: string,
    image?: string,
    friendship_from?: IFriendship[],
    friendship_to?: IFriendship[],
    chat_group_members?: {
        chat_groupId: number,
        profile_id: number
    }[],
    chat_messages?: Chat[], 
    administered_groups?: Chat[]
}
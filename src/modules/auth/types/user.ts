import { Chat } from '../../chat/types/socket';
import { IFriendship } from '../../friends/types/friends.type';

export interface IUser {
    id: number,
    auth_user: {
		date_of_birth: any;
        first_name?: string,
        username?: string,
        last_name?: string,
        email: string,
        password: string,
    }
    date_of_birth?: Date,
    signature?: string,
    avatar?: Avatar[],
    friendship_from?: IFriendship[],
    friendship_to?: IFriendship[],
    chat_group_members?: {
        chat_groupId: number,
        profile_id: number
    }[],
    chat_messages?: Chat[],
    administered_groups?: Chat[]
}

export interface Avatar {
    image: string,
    active: boolean,
    shown: boolean,
    profile_id: number
}
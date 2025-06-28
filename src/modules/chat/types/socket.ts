import { Result } from "../../../shared/types/result";
import { IUser } from "../../auth/types";

export type Chat = {
    id: number;
    name: string;
    is_personal_chat: boolean;
    avatar: string | null;
    admin_id: number;
    chat_app_chatgroup_members: ChatGroupMembers[]
    chat_app_chatmessage: MessagePayload[]
};

// type Chat = {
//     chat_app_chatgroup_members: {
//         id: bigint;
//         profile_id: bigint;
//         chatgroup_id: bigint;
//     }[];
//     chat_app_chatmessage: {
//         id: bigint;
//         content: string;
//         sent_at: Date;
//         author_id: bigint;
//         chat_group_id: bigint;
//         attached_image: string | null;
//     }[];
// } & {
//     id: bigint;
//     name: string;
//     is_personal_chat: boolean;
//     avatar: string | null;
//     admin_id: bigint;
// }




export interface ChatGroupMembers {
    id: number;
    profile_id: number;
    chatgroup_id: number;
}

export type ChatWithMessagesAndParticipants = {
    chat_app_chatmessage: MessagePayload[];
    chat_app_chatgroup_members: ChatGroupMembers[];
} & {
    id: number;
};

export type MessagePayload = {
    content: string;
    sent_at: Date;
    author_id: number;
    chat_group_id: number;
    attached_image: string | null;
}

export type CreateMessage = {
    content?: string;
    attached_image?: string;
    author_id: number;
    chat_group_id: number;
    sent_at?: Date

};

type IChatUpdatePayload = Chat;
type NewMessagePayload = CreateMessage;
type SendMessagePayload = MessagePayload;

export interface IJoinChatPayload {
    chatId: number;
}

export interface ILeaveChatPayload {
    chatId: number;
}
export type IJoinChatCallback = (
    response: Result<ChatWithMessagesAndParticipants>
) => void;

export interface IServerEvents {
    newMessage: (data: NewMessagePayload) => void;
    chatUpdate: (data: IChatUpdatePayload) => void;
}

export interface IClientEvents {
    joinChat: (data: IJoinChatPayload, callback: IJoinChatCallback) => void;
    leaveChat: (data: ILeaveChatPayload) => void;
    sendMessage: (
        data: SendMessagePayload
    ) => void
}


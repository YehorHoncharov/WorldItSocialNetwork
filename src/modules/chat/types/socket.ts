import { Result } from "../../../shared/types/result";

export type Chat = {
    id: number;
    name: string,
    is_personal_chat: boolean,
    admin_id: number,
    avatar: string,
    members: ChatGroupMembers[]
};

export interface ChatGroupMembers {
    chat_groupId: number,
    profile_id: number
}

export type ChatWithMessagesAndParticipants = {
    messages: MessagePayload[];
    members: ChatGroupMembers[];
} & {
    id: number;
};

export type MessagePayload = {
    id: number
    content: string
    sent_at: Date
    author_id: number
    chat_groupId: number
    attached_image: string
}

export type CreateMessage = {
    id?: number;
    type: string;
    text?: string | null;
    mediaUrl?: string | null;
    senderId: number;
    chatId: number;
    chatAsLastMessageId: number;
    timestamp?: Date | string;
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


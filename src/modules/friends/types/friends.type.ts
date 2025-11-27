import { IUser } from "../../auth/types";

export interface IFriendship {
    id: number;
    profile1_id: number;
    accepted: boolean;
    profile2_id: number;
    profile1: IUser;
    profile2: IUser;
}

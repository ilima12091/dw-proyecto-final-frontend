import { User } from "./user";
import { Timestamp } from "rxjs";

export interface Comment extends User {
    commentId: number;
    userId: number;
    userImage: string;
    content: string;
    timeStamp: Timestamp<number>;
}

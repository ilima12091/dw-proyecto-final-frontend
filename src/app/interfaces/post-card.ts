import { Timestamp } from "rxjs";
import { User } from "./user";
import { Comment } from "./comments";

export interface PostCard extends User{
    postId: number;
    userId: number;
    userImage: string;
    content: string;
    timeStamp: Timestamp<number>;
    comments: Comment[];
}
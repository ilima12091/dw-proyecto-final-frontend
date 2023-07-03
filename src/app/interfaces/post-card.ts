import { Comment } from './comment';
import { User } from './user';

export interface PostCard extends User {
  post_id: number;
  user_id: number;
  profile_picture: string;
  content: string;
  timestamp: string;
  username: string;
  comments?: Comment[];
}

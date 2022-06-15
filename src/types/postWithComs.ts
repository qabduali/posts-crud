import { IPost } from './postType';

export type TComment = {
  body: string;
  id: number;
  postId: number;
};

export interface ISinglePost extends IPost {
  comments?: TComment[];
}

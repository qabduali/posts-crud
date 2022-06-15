import { axiosInstance } from '@api/axiosInstance';
import { notification } from 'antd';
import { useMutation, useQueryClient } from 'react-query';

type TNewComment = {
  body: string;
  postId: number;
};

export const postComment = async (data: TNewComment) => {
  return await axiosInstance.post('comments', JSON.stringify(data));
};

export function useMutateComment() {
  const queryClient = useQueryClient();
  return useMutation(['postComment'], (payload: TNewComment) => postComment(payload), {
    onSettled: (payload) => {
      queryClient.refetchQueries(['aPost', { id: payload?.data.postId }]);
    },
    onSuccess: () => {
      notification['success']({
        description: 'Your comment has been added',
        message: 'Success',
      });
    },
  });
}

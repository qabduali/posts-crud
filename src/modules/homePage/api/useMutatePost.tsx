import { axiosInstance } from '@api/axiosInstance';
import { TPost } from '@typess/rawPost';
import { notification } from 'antd';
import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from 'react-query';

export const createPost = async (post: TPost): Promise<AxiosResponse> => {
  return axiosInstance.post('posts', JSON.stringify(post));
};

export function useMutatePost() {
  const queryClient = useQueryClient();

  return useMutation(['createPost'], (post: TPost) => createPost(post), {
    onSettled: () => {
      queryClient.refetchQueries('getPosts');
    },
    onSuccess: () => {
      notification['success']({
        description: 'Your post has been published',
        message: 'Success',
      });
    },
  });
}

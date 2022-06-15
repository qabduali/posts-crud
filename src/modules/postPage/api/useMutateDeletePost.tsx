import { axiosInstance } from '@api/axiosInstance';
import { notification } from 'antd';
import { useMutation, useQueryClient } from 'react-query';

export const deletePost = async (id: string | number) => {
  return await axiosInstance.delete(`posts/${id}`);
};

export function useMutateDeletePost() {
  const queryClient = useQueryClient();
  return useMutation(['deletePost'], (id: string | number) => deletePost(id), {
    onSettled: () => {
      queryClient.refetchQueries('getPosts');
    },
    onSuccess: () => {
      notification['success']({
        description: 'The post has been successfully deleted',
        message: 'Success',
      });
    },
  });
}

import { axiosInstance } from '@api/axiosInstance';
import { IPost } from '@typess/postType';
import { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

export const postsRequest = async (link: string): Promise<AxiosResponse<IPost[]>> => {
  return await axiosInstance.get(link);
};

export function useQueryPosts(link: string) {
  return useQuery<AxiosResponse<IPost[]>, AxiosError>(['getPosts'], () => postsRequest(link));
}

import { axiosInstance } from '@api/axiosInstance';
import { ISinglePost } from '@typess/postWithComs';
import { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

export const getPost = async (params: number): Promise<AxiosResponse<ISinglePost>> => {
  return await axiosInstance.get(`posts/${params}?_embed=comments`);
};

export function useQueryPost(params: number) {
  return useQuery<AxiosResponse<ISinglePost>, AxiosError>(['aPost', { id: params }], () =>
    getPost(params),
  );
}

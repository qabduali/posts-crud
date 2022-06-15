import { CommentOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import ErrorPage from '@moduless/error/ErrorPage';
import { LinearProgress } from '@mui/material';
import { ISinglePost } from '@typess/postWithComs';
import { Button, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useMutateDeletePost } from '../api/useMutateDeletePost';
import { useQueryPost } from '../api/useQueryPost';
import NewCommentForm from '../components/NewCommentForm';
import PostUpdateForm from '../components/PostUpdateForm';

const PostPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const solveParams = (params: any) => {
    if (params.id) {
      return +params.id;
    } else {
      return 0;
    }
  };
  const params = useParams();
  const paramsId = solveParams(params);
  const { data, isError, isFetching, isLoading, isSuccess } = useQueryPost(paramsId);
  const [post, setPost] = useState<ISinglePost>();
  const deletePost = useMutateDeletePost();
  const navigate = useNavigate();
  const [commentModalOpen, setCommentModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess && !isFetching) {
      setPost(data?.data);
    }
    // console.log(data?.data);
  }, [data]);

  if (isError) {
    return <ErrorPage />;
  }
  const handleDelete = () => {
    if (paramsId) {
      deletePost.mutateAsync(paramsId);
      navigate(-1);
    }
  };

  if (isSuccess && !isLoading) {
    return (
      <div className="m-8">
        <div className="border-2 p-4 border-gray-400 rounded-md">
          <div className="flex flex-row justify-between">
            <h3 className="text-lg font-bold p-2">{post?.title}</h3>
            <div>
              <Button icon={<CommentOutlined />} onClick={() => setCommentModalOpen(true)}></Button>{' '}
              <Button
                ghost
                icon={<EditOutlined style={{ color: '#1690FF' }} />}
                onClick={() => setEditModalOpen(true)}
                type="primary"
              ></Button>{' '}
              <Button
                danger
                icon={<DeleteOutlined onClick={handleDelete} style={{ color: '#FF0000' }} />}
              ></Button>
            </div>
          </div>
          <p className="px-2">{post?.body}</p>
        </div>
        <div>
          {post?.comments?.map((elem) => {
            return (
              <p className="border-2 rounded-md p-4 m-2" key={elem.id}>
                {elem.body}
              </p>
            );
          })}
        </div>
        <Modal footer={null} onCancel={() => setCommentModalOpen(false)} visible={commentModalOpen}>
          <NewCommentForm close={() => setCommentModalOpen(false)} postId={paramsId} />
        </Modal>
        <Modal footer={null} onCancel={() => setEditModalOpen(false)} visible={editModalOpen}>
          <PostUpdateForm close={() => setEditModalOpen(false)} post={post} />
        </Modal>
      </div>
    );
  }

  return <LinearProgress color="primary" variant="indeterminate" />;
};

export default PostPage;

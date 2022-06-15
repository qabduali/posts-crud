import { LinearProgress } from '@mui/material';
import { IPost } from '@typess/postType';
import { Button, Modal } from 'antd';
import { useEffect, useState } from 'react';

import { useQueryPosts } from '../api/useQueryPosts';
import CreatePostForm from '../components/CreatePostForm';
import PostPreview from '../components/PostPreview';

const HomePage = () => {
  const { data, isLoading, isSuccess } = useQueryPosts('posts');
  const [allPosts, setAllPosts] = useState<IPost[]>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) {
      setAllPosts(data?.data);
    }
  }, [isSuccess, data]);

  if (isLoading) {
    return <LinearProgress color="primary" variant="indeterminate" />;
  }

  return (
    <div className="m-4">
      <h2 className="my-4 text-2xl font-bold px-4">Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
        {allPosts?.map((elem) => {
          return <PostPreview key={elem.id} post={elem} />;
        })}
      </div>
      <div className="p-4">
        <Button block onClick={() => setModalOpen(true)} size="large" type="primary">
          Add new
        </Button>
      </div>
      <Modal footer={null} onCancel={() => setModalOpen(false)} visible={modalOpen}>
        <CreatePostForm close={() => setModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default HomePage;

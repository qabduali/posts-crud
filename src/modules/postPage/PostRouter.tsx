import ErrorPage from '@moduless/error/ErrorPage';
import { Route, Routes } from 'react-router-dom';

import PostPage from './pages/PostPage';

const PostRouter = () => {
  return (
    <Routes>
      <Route element={<PostPage />} index />
      <Route element={<ErrorPage />} path="/*" />
    </Routes>
  );
};

export default PostRouter;

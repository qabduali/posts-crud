import { Route, Routes } from 'react-router-dom';

import ErrorPage from '../error/ErrorPage';
import HomePage from './pages/HomePage';

const HomeRouter = () => {
  return (
    <Routes>
      <Route element={<HomePage />} index />
      <Route element={<ErrorPage />} path="/*" />
    </Routes>
  );
};

export default HomeRouter;

import './App.css';

import { Route, Routes } from 'react-router-dom';

import ErrorPage from './modules/error/ErrorPage';
import HomeRouter from './modules/homePage/HomeRouter';
import PostRouter from './modules/postPage/PostRouter';

function App() {
  return (
    <Routes>
      <Route element={<HomeRouter />} index />
      <Route element={<PostRouter />} path="/post/:id" />
      <Route element={<ErrorPage />} path="/*" />
    </Routes>
  );
}

export default App;

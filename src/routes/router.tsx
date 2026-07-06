import { createBrowserRouter } from 'react-router-dom';
import MoviePage from '../pages/movie/MoviePage';
import MovieDetailPage from '../pages/movie/MovieDetailPage';
import MovieWritePage from '../pages/movie/MovieWritePage';

const router = createBrowserRouter([
  //movie Router - 윤소정
  { path: `/movie`, element: <MoviePage /> },
  { path: `/movie/write`, element: <MovieWritePage /> },
  { path: `/movie/:movieId`, element: <MovieDetailPage /> },
]);

export default router;

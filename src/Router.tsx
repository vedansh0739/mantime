import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import {StartScreen} from './pages/StartScreen'
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path:'/initiate',
    element:<StartScreen />
  }
]);

export function Router() {
  return <RouterProvider router={router} />;
}

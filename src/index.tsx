import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthTemplate from './auth/AuthTemplate';
import './global.css';
import TodoTemplate from './todo/TodoTemplate';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>main</div>,
  },
  {
    path: '/signup',
    element: <AuthTemplate type="signup" />,
  },
  {
    path: '/signin',
    element: <AuthTemplate type="signin" />,
  },
  {
    path: '/todo',
    element: <TodoTemplate />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

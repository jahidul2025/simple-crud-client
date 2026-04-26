import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import userDetail from './components/userDetail.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: 'users/:id',
    loader: ({ params })=>fetch(`http://localhost:3000/users/${params.id}`),
    Component: userDetail
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

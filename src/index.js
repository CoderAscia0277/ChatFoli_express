import React, {lazy} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
const ChatApp = lazy(() => import('./chat/core/ChatApp'));
const LoginPage = lazy( () => import('./chat/core/LoginPage'));

const router = createBrowserRouter([
  {
    path:'/',
    element:<LoginPage/>
  },
 {
    path:'/:NAME/:TEMPORARY_ID',
    element:<ChatApp/>
  }]
);
root.render(
  <React.StrictMode >
    <RouterProvider  router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

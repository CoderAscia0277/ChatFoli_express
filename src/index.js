import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import AuthenticationPanel from './chat/components/AuthenticationPanel';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import ChatIndex from './chat/core/chatIndex';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path:'/',
    element:  <AuthenticationPanel/>
  },
  {
    path:'/helloworld',
    element:<div>Hello World !</div>
  },{
    path:'/chat',
    element:<ChatIndex/>
  }]
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

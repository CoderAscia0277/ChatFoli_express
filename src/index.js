import React, {lazy} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import { LightMode ,DarkMode} from './chat/_utils/Constants';
import { createContext } from 'react';
const root = ReactDOM.createRoot(document.getElementById('root'));
const ChatApp = lazy(() => import('./chat/core/ChatApp'));
const LoginPage = lazy( () => import('./chat/core/LoginPage'));
const SignUpPage = lazy(() => import('./chat/core/SignUpPage'));


export const ThemeContext = createContext();

const router = createBrowserRouter([
  {
    path:'/',
    element:
    <ThemeContext.Provider value={LightMode}>
        <LoginPage/>
    </ThemeContext.Provider>
  },
 {
    path:'/:NAME/:TEMPORARY_ID',
    element:<ChatApp/>
  },{
    path:'/signUp',
    element:
    <ThemeContext.Provider value={LightMode}>
       <SignUpPage/> 
    </ThemeContext.Provider>
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

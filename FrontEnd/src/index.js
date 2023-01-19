import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { Provider } from 'react-redux';
import { store } from "./redux/store.js";

import { AuthContextProvider } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";

const options = {
  position: positions.TOP_CENTER,
  timeout: 3000,
  transition: transitions.SCALE
}


// ReactDOM.render(
//     <Popup />,
//     document.getElementById('popupContainer')
// );

ReactDOM.render(
  <AuthContextProvider>
      <AlertProvider template={AlertTemplate} {...options}>
        <Provider store={store}>
          <App />
        </Provider>
      </AlertProvider>
  </AuthContextProvider>,
  document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

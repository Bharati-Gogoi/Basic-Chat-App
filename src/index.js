import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import firebase from 'firebase/app'
import reportWebVitals from './reportWebVitals'

firebase.initializeApp({
  // Your web app's Firebase configuration
  // You'll get it in Firebase Console -> Your Project Settings

})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

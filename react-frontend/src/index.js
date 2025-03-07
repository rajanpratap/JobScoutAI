import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

//Deprecated in react 10
// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

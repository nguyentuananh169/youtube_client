import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import GlobalStyles from './components/GlobalStyles';
import ScrollTop from './components/ScrollTop';
import reportWebVitals from './reportWebVitals';
import store from './store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <Router>
            <GlobalStyles>
                <ScrollTop>
                    <App />
                </ScrollTop>
            </GlobalStyles>
        </Router>
    </Provider>,
    // </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

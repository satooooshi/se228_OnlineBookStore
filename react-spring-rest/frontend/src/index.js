/*
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
*/
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import './App.css';
//import Edit from './components/Edit';
//import Create from './components/Create';
//import Show from './components/Show';

const Edit=()=>{
    return(
        <div>
            IM EDIT
        </div>
    );
};

const Create=()=>{
    return(
        <div>
            IM EDIT
        </div>
    );
};

const Show=()=>{
    return(
        <div>
            IM EDIT
        </div>
    );
};

ReactDOM.render(
    <Router>
        <div>
            <Route exact path='/' component={App} />
            <Route path='/edit/:id' component={Edit} />
            <Route path='/create' component={Create} />
            <Route path='/show/:id' component={Show} />
        </div>
    </Router>,
    document.getElementById('root')
);
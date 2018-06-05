/*
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import './App.css';
//import Edit from './components/Edit';
//import Create from './components/Create';
//import Show from './components/Show';
import PaperSheet from './PaperSheet';
import EnhancedTable from './EnhancedTable';
import InputAdornments from './InputAdornments';
import InputWithIcon from './InputWithIcon';
import Button from '@material-ui/core/Button';
import CustomizedList from './CustomizedList';
import SignUpForm from "./SignUpForm";
import GuttersGrid from "./GuttersGrid";
import axios from 'axios';

const Create=()=>{
    return(
        <div>
            IM EDIT
        </div>
    );
};

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            fakeAuth.isAuthenticated ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

async function getUserInfo(logInProfile) {
    try {
        const response = await axios.post('/api/user/validateUser', {
            email:logInProfile["email"],
            password:logInProfile["password"]
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
            userId:undefined,
            user:{},
        };
    }

    componentDidUpdate(prevProps, prevState) {
        // only update chart if the data has changed
        if (prevState.userId !== this.state.userId) {
            this.setState({userId:this.state.userId});
        }
    }



    login = (logInProfile) => {
        console.log(logInProfile);


        getUserInfo(logInProfile)
            .then((responseData)=> {
                this.setState({
                    userId: responseData["id"],
                    user:responseData,
                    //redirectToReferrer: true,
                });
            });

        if(this.state.userId!==undefined)
        fakeAuth.authenticate(() => {
            console.log("userid:"+this.state.userId);
            this.setState({
                redirectToReferrer : true
            });
        });

    };

    render() {
        const { from } = this.props.location.state || { from: { pathname: "/" } };
        const { redirectToReferrer, userId, user } = this.state;

        if (redirectToReferrer) {
            console.log("redirect...user:");
            console.log(user);
            return <Redirect to={{
                pathname: '/',
                state: { referrer: user }
            }}/>;
        }

        return (
            <div>
                <div id="main" className="is-loading">
                    <h1>
                        Welcome!!
                    </h1>
                    <InputWithIcon onClick={this.login}/>
                </div>
            </div>
        );
    }
}


ReactDOM.render(
    <Router>
        <div>
            <Route path="/aaa" component={GuttersGrid} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUpForm} />
            <PrivateRoute path="/cart" component={CustomizedList} />
            <PrivateRoute path="/profile" component={InputAdornments} />
            <PrivateRoute exact path='/' component={App} />
            <Route path="/detail/:id" render={(props) => <PaperSheet {...props}/>}/>
            <PrivateRoute path='/create' component={Create} />
            <PrivateRoute path="/protected" component={App} />
        </div>
    </Router>,
    document.getElementById('root')
);

//<p>You must log in to view the page at {from.pathname}</p>
//                 <Button onClick={this.login}>Log in</Button>
//
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit,
    },
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
    }),
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});


let email="";
let password="";
let logInProfile={
    email:[],
    password:"",
};
function setLogInElem(elem,val){
    logInProfile[elem]=val;
}

function InputWithIcon(props) {
    const { classes } = props;

    return (
        <div>
            <Paper className={classes.root} elevation={4}>
                <Typography variant="headline" component="h3">
                    LogIn
                </Typography>
            <FormControl className={classes.margin}>
                <InputLabel htmlFor="input-with-icon-adornment">Email</InputLabel>
                <Input
                    id="email"
                    startAdornment={
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                    }
                    onChange={
                        (event)=>{
                            email=event.target.value;
                        }
                    }
                />
            </FormControl>
                <br/>
                <FormControl className={classes.margin}>
                    <InputLabel htmlFor="input-with-icon-adornment">Password</InputLabel>
                    <Input
                        id="password"
                        startAdornment={
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        }
                        onChange={
                            (event)=>{
                                password=event.target.value;
                            }
                        }
                    />
                </FormControl>
                <br/>
                <span>
                <Button variant="outlined" color="primary" className={classes.button}
                        onClick={
                            ()=>{
                                setLogInElem("email",email);
                                setLogInElem("password",password);
                                props.onClick(logInProfile);
                            }
                        }
                >
                    Login
                </Button>
                <Button variant="outlined" color="secondary" className={classes.button}
                        component={Link}
                        to={{
                            pathname: "/signup",
                        }}
                >
                    SignUp
                </Button>
                </span>
            </Paper>
        </div>
    );
}

InputWithIcon.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputWithIcon);
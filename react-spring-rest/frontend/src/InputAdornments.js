import React, {Component}from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing.unit,
    },
    withoutLabel: {
        marginTop: theme.spacing.unit * 3,
    },
    textField: {
        flexBasis: 200,
    },
    rootOfAvatar: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
    }),
});


const ranges = [
    {
        value: '0-20',
        label: '0 to 20',
    },
    {
        value: '21-50',
        label: '21 to 50',
    },
    {
        value: '51-100',
        label: '51 to 100',
    },
];

let username="";
let email="";
let password="";
let logInProfile={
    email:[],
    password:"",
};
function setLogInElem(elem,val){
    logInProfile[elem]=val;
}

class InputAdornments extends Component {

    constructor(props) {
        super(props);

        this.state = {
            amount: '',
            password: '',
            weight: '',
            weightRange: '',
            showPassword: false,

            user:{},
        };
    }


    componentDidMount() {
        console.log("USERPROFILE fetching db userId:" +(this.props.location.state && this.props.location.state.referrer));
    }

    componentWillMount() {
        return fetch('/api/user/ofUserId/'+(this.props.location.state && this.props.location.state.referrer))
            .then((response) => response.json())
            .then((responseJson) =>
                this.setState({
                    user: responseJson
                })
            )
            .catch((error) => {
                console.error(error);
            });
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
        setLogInElem("password",event.target.value);
    };

    handleMouseDownPassword = event => {
        event.preventDefault();
    };

    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    };

    handlePost=()=>{
        const obj = {
            id:this.state.user["id"],
            username:logInProfile["username"],
            firstname:this.state.user["firstname"],
            lastname:this.state.user["lastname"],
            email:logInProfile["email"],
            avatar:this.state.user["avatar"],
            role:this.state.user["role"],
            password:logInProfile["password"],
        };
        const method = "PUT";
        const body = JSON.stringify(obj);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        fetch("/api/user/modifyUserOfId/"+(this.props.location.state && this.props.location.state.referrer), {method, headers, body}).then((res)=> res.json()).then(console.log).catch(console.error);
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Paper className={classes.rootOfAvatar} elevation={4}>
                    <Typography variant="headline" component="h3">
                        Change Profile
                    </Typography>
                    <Avatar
                        alt={this.state.user["username"]}
                        src={this.state.user["avatar"]}
                        className={
                            {
                                margin: 10,
                                width: 60,
                                height: 60,
                            }
                        }
                    />
                <TextField
                    label={this.state.user["username"]}
                    id="username"
                    className={classNames(classes.margin, classes.textField)}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">NewUserName</InputAdornment>,
                    }}
                    onChange={
                        (event)=>{
                            setLogInElem("username",event.target.value)
                        }
                    }
                />
                <TextField
                    label={this.state.user["email"]}
                    id="email"
                    className={classNames(classes.margin, classes.textField)}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">NewEmail</InputAdornment>,
                    }}
                    onChange={
                        (event)=>{
                            setLogInElem("email",event.target.value)
                        }
                    }
                />
                <FormControl className={classNames(classes.margin, classes.textField)}>
                    <InputLabel htmlFor="adornment-password">NewPassword</InputLabel>
                    <Input
                        id="adornment-password"
                        type={this.state.showPassword ? 'text' : 'password'}
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="Toggle password visibility"
                                    onClick={this.handleClickShowPassword}
                                    onMouseDown={this.handleMouseDownPassword}
                                >
                                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                    <Button variant="raised" size="large" color="primary" onClick={()=>this.handlePost()} >
                        Update
                    </Button>
                </Paper>
            </div>
        );
    }
}

InputAdornments.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputAdornments);


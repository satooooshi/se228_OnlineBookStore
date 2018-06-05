import React ,{Component}from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import axios from "axios/index";

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit,
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

async function postUserInfo(logInProfile) {
    try {
        const response = await axios.post('/api/user/addUser', {
            email:logInProfile["email"],
            password:logInProfile["password"]
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        const {classes} = this.props;

        return (
            <div>
                <FormControl className={classes.margin}>
                    <InputLabel htmlFor="input-with-icon-adornment">With a start adornment</InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start">
                                <AccountCircle/>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <TextField
                    className={classes.margin}
                    id="input-with-icon-textfield"
                    label="TextField"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle/>
                            </InputAdornment>
                        ),
                    }}
                />
                <div className={classes.margin}>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <AccountCircle/>
                        </Grid>
                        <Grid item>
                            <TextField id="input-with-icon-grid" label="With a grid"/>
                        </Grid>
                    </Grid>
                </div>





            </div>
        );
    }
}

SignUpForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUpForm);
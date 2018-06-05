import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';

import SimpleMediaCard from "./SimpleMediaCard";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 250,
        width: 200,
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
});

class GuttersGrid extends React.Component {
    state = {
        spacing: '16',
    };

    handleChange = key => (event, value) => {
        this.setState({
            [key]: value,
        });
    };

    render() {
        const { classes } = this.props;
        const { spacing } = this.state;

        return (
            <Grid container className={classes.root} spacing={16}>
                <Grid item xs={12}>
                    <Grid container className={classes.demo} justify="center" spacing={24}>
                        {[0, 1, 2,1,1,1,1,1,1,1,1].map(value => (
                            <Grid key={value} item>
                                    <SimpleMediaCard/>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

            </Grid>
        );
    }
}

GuttersGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GuttersGrid);

/*
<Paper className={classes.paper} >
                                    <SimpleMediaCard/>
                                </Paper>

 */
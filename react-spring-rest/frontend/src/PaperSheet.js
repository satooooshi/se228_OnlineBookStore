import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import SingleLineGridList from "./SingleLineGridList";

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
    }),
});

class PaperSheet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item:{},
            count: 1,
            itemId: -1,
            userId:-1,
        };
    }

    componentDidUpdate(prevProps, prevState) {
        // only update chart if the data has changed
        if (prevProps.match.params.id !== this.props.match.params.id) {
            const id = this.props.match.params.id;
            const userId=(this.props.location.state && this.props.location.state.referrer);
            console.log("PaperShett param fetech from database:" + id+"userId:"+userId);
            this.setState({itemId: id, userId:userId});

            fetch('/api/volume/ofId/'+this.props.match.params.id)
                .then((response) => response.json())
                .then((responseJson) =>
                    this.setState({
                        item: responseJson,
                    })
                )
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        const userId=(this.props.location.state && this.props.location.state.referrer);
        console.log("PaperShett param fetech from database... bookid:" + id+"userId:"+userId);
        this.setState({itemId: id, userId:userId});

        fetch('/api/volume/ofId/'+this.props.match.params.id)
            .then((response) => response.json())
            .then((responseJson) =>
                this.setState({
                    item: responseJson,
                })
            )
            .catch((error) => {
                console.error(error);
            });
    }


    handleAddShoppingCart=()=>{
        console.log("userID:"+this.state.userId+", bookId:"+this.state.itemId+", count:"+this.state.count);
        const obj = {   userId:this.state.userId,
                        bookId:this.state.itemId,
                        count:this.state.count,
            };
        const method = "POST";
        const body = JSON.stringify(obj);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        fetch("/api/cart/addCartOfUserId", {method, headers, body}).then((res)=> res.json()).then(console.log).catch(console.error);
    };

    render() {

        const { classes, theme } = this.props;
        let itemCount=this.state.count;

        return (
            <div>
                <Paper className={classes.root} elevation={4}>
                <span>
                 <Typography color="textSecondary" component="h4">
                    Book Details
                </Typography>
                <img
                    src={this.state.item["imageLinks"]}
                    alt={this.state.item["title"]} height="250" width="180"/>
                <Typography variant="headline" component="h3">
                    {this.state.item["title"]}
                </Typography>
                <Typography component="p">
                    {this.state.item["subtitle"]}
                </Typography>
                <Typography className={classes.title} color="textSecondary">
                    {this.state.item["publishedDate"]}
                </Typography>
                <Typography variant="headline" component="h2">
                    {this.state.item["author"]}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {this.state.item["publisher"]}
                </Typography>
                <Typography variant="headline" component="h2">
                    {"$ "}{this.state.item["price"]}
                </Typography>
                <Typography variant="headline" component="h2">
                    {"Rating: "}{this.state.item["averageRating"]}
                </Typography>
                <Typography component="p">
                    <br/>
                    <hr/>
                    <Typography color="textSecondary" component="h4">
                    Description
                </Typography>
                    {this.state.item["description"]}
                </Typography>
                </span>
                    <br/>
                    <br/>
                    <span>
                <Button variant="fab" mini color="default" aria-label="add" className={classes.button}
                        onClick={
                            () => {
                                let nextCount=this.state.count;
                                nextCount=nextCount+1;
                                this.setState({count:nextCount});
                            }
                        }
                >
                    <AddIcon/>
                </Button>
                        <Typography variant="title">{itemCount}</Typography>
                        <Button variant="fab" mini color="default" aria-label="remove" className={classes.button}
                                onClick={
                                    () => {
                                        if(this.state.count>=2) {
                                            let nextCount = this.state.count;
                                            nextCount=nextCount-1;
                                            this.setState({count: nextCount});
                                        }
                                    }
                                }
                        >
                    <RemoveIcon/>
                </Button>
                </span>
                    <br/>
                    <br/>
                    <Button variant="raised" size="large" color="primary" className={classes.button}
                            onClick={
                                () => {
                                    this.handleAddShoppingCart();
                                }
                            }
                    >
                        Add Cart
                    </Button>
                </Paper>
                <hr/>
                <Typography color="textSecondary" component="h2">
                    Related Books
                </Typography>
                <br/>
                {this.state.item["title"] !== undefined && <SingleLineGridList item={this.state.item} userId={this.state.userId}/>}

            </div>
        );
    }
}


PaperSheet.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);
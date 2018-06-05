import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
const styles = {
    card: {
       // maxWidth: 150,
        //height:180,
        //paddingBottom: 8,
        //overflow: "hidden",
        //display: "inline"
        height: "180px",
        width: "170px",
    },
    media: {
        paddingTop: '60%', // 16:9
        //height: "auto",
        width:"50%",
        padding: "100px 50px"
    },
};



function SimpleMediaCard(props) {
    const { classes } = props;
    return (
        <div>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image="http://d1af37c1pl2nfl.cloudfront.net/images/books/kbs/front/harry-potter-and-the-cursed-child-parts-i-ii.jpg"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography component="p">
                        Publisherfadssssssssssssasdfasfsafasfdlashflasjflasjflasjflasjlfjaslkfjasljflkashflsaj

                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary">
                        Share
                    </Button>
                    <Button size="small" color="primary">
                        Learn More
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}

SimpleMediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleMediaCard);
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import InfoIcon from '@material-ui/icons/Info';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import Grid from '@material-ui/core/Grid';
import { Link, Switch, Route, Redirect } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 1000,
        height: 1000,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
});

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */

const tileData=[
    {
      img:'http://d1af37c1pl2nfl.cloudfront.net/images/books/kbs/front/harry-potter-and-the-cursed-child-parts-i-ii.jpg',
      title:'Image',
      author:'J.K.Rollingfasdddddddddddddddddddddddddddddddddddddddddd'
    },
    {
        img:'http://d1af37c1pl2nfl.cloudfront.net/images/books/kbs/front/harry-potter-and-the-cursed-child-parts-i-ii.jpg',
        title:'Image',
        author:'J.K.Rolling'
    },
    {
        img:'http://d1af37c1pl2nfl.cloudfront.net/images/books/kbs/front/harry-potter-and-the-cursed-child-parts-i-ii.jpg',
        title:'Image',
        author:'J.K.Rolling'
    },
    {
        img:'http://d1af37c1pl2nfl.cloudfront.net/images/books/kbs/front/harry-potter-and-the-cursed-child-parts-i-ii.jpg',
        title:'Image',
        author:'J.K.Rolling'
    },
    {
        img:'http://d1af37c1pl2nfl.cloudfront.net/images/books/kbs/front/harry-potter-and-the-cursed-child-parts-i-ii.jpg',
        title:'Image',
        author:'J.K.Rolling'
    },
    {
        img:'http://d1af37c1pl2nfl.cloudfront.net/images/books/kbs/front/harry-potter-and-the-cursed-child-parts-i-ii.jpg',
        title:'Image',
        author:'J.K.Rolling'
    },
    {
        img:'http://d1af37c1pl2nfl.cloudfront.net/images/books/kbs/front/harry-potter-and-the-cursed-child-parts-i-ii.jpg',
        title:'Image',
        author:'J.K.Rolling'
    },
];


function TitlebarGridList(props) {
    const { classes } = props;
    if(props.source===undefined)
        return(
            <div>
                <CircularProgress />
            </div>
        );
    return (
        <div className={classes.root}>
            <GridList cellHeight={330} className={classes.gridList} cols={4}>
                <GridListTile key="Subheader" cols={4} style={{ height: 'auto' }}>
                    <ListSubheader component="div">Result</ListSubheader>
                </GridListTile>
                {props.source.map(tile => (
                    <GridListTile key={tile.imageLinks}>
                        <img src={tile.imageLinks} alt={tile.title} />
                        <GridListTileBar
                            titlePosition="bottom"
                            title={tile.title}
                            subtitle={
                                <div>
                                    <br/>
                                    {tile.author}
                                    <br/>
                                    {tile.publishedDate}
                                    <br/>
                                    {tile.averageRating}
                                    <br/>
                                </div>
                            }
                            actionIcon={
                                <span>
                                <Button variant="fab" mini color="primary" aria-label="add_shopping_cart" className={classes.button}
                                        onClick={
                                            ()=>{props.handleAddShoppingCart(tile.id);}
                                        }
                                >
                                    <AddShoppingCart />
                                </Button>
                                <Button variant="fab" mini color="default" aria-label="info_icon" component={Link}  to={{
                                    pathname: "/detail/"+tile.id,
                                    state: { referrer: props.userId }
                                }} >
                                    <InfoIcon />
                                </Button>
                                </span>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );

};

TitlebarGridList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TitlebarGridList);

/*
<span>
<IconButton className={classes.icon}>
                                    <AddShoppingCart />
                                </IconButton>
                                <IconButton className={classes.icon}>
                                <InfoIcon />
                                </IconButton>
                                </span>

return (
        <div className={classes.root}>
            <GridList cellHeight={330} className={classes.gridList} cols={4}>
                <GridListTile key="Subheader" cols={4} style={{ height: 'auto' }}>
                    <ListSubheader component="div">December</ListSubheader>
                </GridListTile>
                {tileData.map(tile => (
                    <GridListTile key={tile.img}>
                        <img src={tile.img} alt={tile.title} />
                        <GridListTileBar
                            title={tile.title}
                            subtitle={<span>by: {tile.author}</span>}
                            actionIcon={
                                <IconButton className={classes.icon}>
                                    <InfoIcon />
                                </IconButton>
                            }

                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
 */
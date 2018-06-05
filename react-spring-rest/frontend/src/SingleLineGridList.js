import React ,{Component}from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from '@material-ui/core/Typography';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Button from '@material-ui/core/Button';
import InfoIcon from '@material-ui/icons/Info';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import { Link, Switch, Route, Redirect } from "react-router-dom";

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
});

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

function findRelatedWord(str){
    let array=str.split(" ");
    array.sort((a,b)=>{
        return b.length-a.length;//descending order
    });

    return array[0];//find max lenght word
}

class SingleLineGridList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            volumes:[],
        };
    }

    componentDidUpdate(prevProps, prevState) {
        // only update chart if the data has changed
        if (prevProps.item !== this.props.item) {
            console.log("titleOfrelatedItem:");
            console.log(this.props.item);

        let relatedWord=findRelatedWord(this.props.item["title"]);
        console.log("relatedword:"+relatedWord);

            fetch('/api/volume/searchByKeyword?keyword='+relatedWord)
                .then((response) => response.json())
                .then((responseJson) =>
                    this.setState({
                        volumes: responseJson
                    })
                )
                .catch((error) => {
                    console.error(error);
                });
        }
    }


    componentDidMount() {
        console.log("titleOfrelatedItem:");
        console.log(this.props.item);

        let relatedWord=findRelatedWord(this.props.item["title"]);
        console.log("relatedword:"+relatedWord);

        fetch('/api/volume/searchByKeyword?keyword='+relatedWord)
            .then((response) => response.json())
            .then((responseJson) =>
                this.setState({
                    volumes: responseJson
                })
            )
            .catch((error) => {
                console.error(error);
            });
    }

    handleAddShoppingCart=(id)=>{
        console.log("add to shopping cart db with userId:"+this.props.userId+",#:1, bookId:"+id);
        const obj = {userId:this.props.userId, bookId:id, count:1};
        const method = "POST";
        const body = JSON.stringify(obj);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        fetch("/api/cart/addCartOfUserId", {method, headers, body}).then((res)=> res.json()).then(console.log).catch(console.error);
    };

    render() {
        const { classes } = this.props;
        if(this.state.volumes.length===1)
            return (
                <div>
                    <Typography color="textSecondary" component="h2">
                        No related items...
                    </Typography>
                </div>
            );
        return (
            <div className={classes.root}>
                <GridList  cellHeight={200} className={classes.gridList} cols={5}>
                    {this.state.volumes.map(tile => (
                        <GridListTile key={tile.imageLinks}>
                            <img src={tile.imageLinks} alt={tile.title} />
                            <GridListTileBar
                                titlePosition="bottom"
                                title={tile.title}
                                subtitle={
                                    <div>
                                        id:{tile.id}
                                        <br/>
                                        {tile.publishedDate}
                                        <br/>
                                        {tile.author}
                                        <br/>
                                        {tile.averageRating}
                                        <br/>
                                    </div>
                                }
                                actionIcon={
                                    <span>
                                <Button variant="fab" mini color="primary" aria-label="add_shopping_cart" className={classes.button}
                                        onClick={
                                            ()=>{this.handleAddShoppingCart(tile.id);}
                                        }
                                >
                                    <AddShoppingCart />
                                </Button>
                                <Button variant="fab" mini color="default" aria-label="info_icon" component={Link}  to={{
                                    pathname: "/detail/"+tile.id,
                                    state: { referrer: this.props.userId }
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
    }
}



SingleLineGridList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SingleLineGridList);
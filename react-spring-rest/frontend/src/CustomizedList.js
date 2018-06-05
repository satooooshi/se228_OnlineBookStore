import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Link} from "react-router-dom";
import InfoIcon from '@material-ui/icons/Info';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Clear from '@material-ui/icons/Clear';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import axios from 'axios';


let volumeInfos=[
    {
        id:12345,
        title:"Harry Potter",
        publisher:"Packt",
        publishedDate:"2012/4/23",
        description:"the heartfull story just begun...",
        averageRating:3.5,
        imageLinks:"http://d1af37c1pl2nfl.cloudfront.net/images/books/kbs/front/harry-potter-and-the-cursed-child-parts-i-ii.jpg",
        language:"english"
    },
    {
        id:12346,
        title:"Harry Potter",
        publisher:"Packt",
        publishedDate:"2012/4/23",
        description:"the heartfull story just begun...",
        averageRating:3.5,
        imageLinks:"http://d1af37c1pl2nfl.cloudfront.net/images/books/kbs/front/harry-potter-and-the-cursed-child-parts-i-ii.jpg",
        language:"english"
    },
    {
        id:12347,
        title:"Harry Potter",
        publisher:"Packt",
        publishedDate:"2012/4/23",
        description:"the heartfull story just begun...",
        averageRating:3.5,
        imageLinks:"http://d1af37c1pl2nfl.cloudfront.net/images/books/kbs/front/harry-potter-and-the-cursed-child-parts-i-ii.jpg",
        language:"english"
    },
    {
        id:12348,
        title:"Harry Potter",
        publisher:"Packt",
        publishedDate:"2012/4/23",
        description:"the heartfull story just begun...",
        averageRating:3.5,
        imageLinks:"http://d1af37c1pl2nfl.cloudfront.net/images/books/kbs/front/harry-potter-and-the-cursed-child-parts-i-ii.jpg",
        language:"english"
    },{
        id:12349,
        title:"Harry Potter",
        publisher:"Packt",
        publishedDate:"2012/4/23",
        description:"the heartfull story just begun...",
        averageRating:3.5,
        imageLinks:"http://d1af37c1pl2nfl.cloudfront.net/images/books/kbs/front/harry-potter-and-the-cursed-child-parts-i-ii.jpg",
        language:"english"
    }

];

let orderItems=[
    {
        id:1,
        bookId:12345,
        userId:1,
        count:1,
    },
    {
        id:2,
        bookId:12346,
        userId:1,
        count:2,
    },
    {
        id:3,
        bookId:12347,
        userId:1,
        count:1,
    },
    {
        id:4,
        bookId:12348,
        userId:1,
        count:3,
    },
    {
        id:5,
        bookId:12349,
        userId:1,
        count:1,
    },

];


const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
    id += 1;
    return { id, name, calories, fat, carbs, protein };
}

const data = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];


async function getVolumeInfosOf(userId) {
    try {
        const response = await axios.get('/api/cart/ofUserId/'+userId);
        console.log("getVolumeInfosOf");
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

async function getVolumeDetailOf(userId) {
    try {
        const response = await axios.get('/api/cart/ofUserIdOfVolumeDetail/'+userId);
        console.log("getVolumeDetailOf");
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

class CustomizedList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orderItems:[],
            volumeInfos:[],
            orderItemsWithCount:[],
            selected:[],
            isLoading:false,
        };
    }

    componentDidMount() {
        console.log("SHoppingCart fetching db of userId:"+(this.props.location.state && this.props.location.state.referrer));

        let userId=(this.props.location.state && this.props.location.state.referrer);
        /*
                fetch('/api/cart/ofUserId/' + (this.props.location.state && this.props.location.state.referrer))
                    .then((response) => response.json())
                    .then((responseJson) => {
                        this.setState({
                            orderItems: responseJson
                        });
                        console.log(responseJson);
                    })
                    .catch((error) => {
                        console.error(error);
                    });



                fetch('/api/cart/ofUserIdOfVolumeDetail/' + (this.props.location.state && this.props.location.state.referrer))
                    .then((response) => response.json())
                    .then((responseJson) => {
                        this.setState({
                            volumeInfos: responseJson
                        });
                        console.log(responseJson);
                    })
                    .catch((error) => {
                        console.error(error);
                    });

        */



                let volInfos=[];
                let orItems=[]
                getVolumeInfosOf(userId)
                .then(responseData=>{
                    volInfos=responseData;
                });
                getVolumeDetailOf(userId)
                .then(responseData=>{
                      orItems=responseData;
                 })
                .then(()=>{
                    let cartItem=[];
                                volInfos.map((volume)=>{
                                     let foundVolume=this.getVolumeWithIdAndCountFromArrayAndVolumeId(orderItems,volume.id);
                                     console.log("count;;"+foundVolume.count+", bookId::"+volume.id);
                                     volume["count"]=foundVolume.count;
                                     volume["orderId"]=foundVolume.id;
                                     cartItem=cartItem.concat(volume);
                                });


                     this.setState({orderItemsWithCount:cartItem});
                });


        /*

        let cartItem=[];
        volumeInfos.map((volume)=>{
            let foundVolume=this.getVolumeWithIdAndCountFromArrayAndVolumeId(orderItems,volume.id);
            console.log("count;;"+foundVolume.count+", bookId::"+volume.id);
            volume["count"]=foundVolume.count;
            volume["orderId"]=foundVolume.id;
            cartItem=cartItem.concat(volume);
        });

        console.log("cartItem");
        console.log(cartItem);


        this.setState({orderItemsWithCount:cartItem});
        */
    }


    getVolumeWithIdAndCountFromArrayAndVolumeId(array,volumeId){
        console.log("volId:"+volumeId);
        let foundItem=array.find(item=>{
            console.log("getvolcont:"+item.count);
            if(item.bookId===volumeId) {
                return item;
            }
        });
        return foundItem;
    };

    handleIncrement=(volumeId)=>{
        let nextVolumeInfos=this.state.orderItemsWithCount.map((volume)=>{
            console.log("volIIID:"+volume.id);
            if(volume.id===volumeId){
                volume["count"]++;
                this.handlePutCountOfOrder(volume);
                return volume;
            }else{
                return volume;
            }
        });

        this.setState({volumeInfos:nextVolumeInfos});

    };

    handleDecrement=(volumeId)=>{
        let nextVolumeInfos=this.state.orderItemsWithCount.map((volume)=>{
            console.log("volIIID:"+volume.id);
            if(volume.id===volumeId){
                if(volume["count"]>1)
                    volume["count"]--;
                this.handlePutCountOfOrder(volume);
                return volume;
            }else{
                return volume;
            }
        });

        this.setState({volumeInfos:nextVolumeInfos});

    };

    handlePutCountOfOrder=(volume)=>{
        const obj = {
            id:volume["orderId"],
            bookId:volume["id"],
            userId:(this.props.location.state && this.props.location.state.referrer),
            count:volume["count"],
        };
        console.log("put change of count order");
        console.log(obj);
        const method = "PUT";
        const body = JSON.stringify(obj);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        fetch("/api/cart/"+(this.props.location.state && this.props.location.state.referrer), {method, headers, body}).then((res)=> res.json()).then(console.log).catch(console.error);
    };

    handleRemoveClick=(volumeId)=>{

        console.log(this.state.selected);
        console.log("remove items from order db.");


        /*
                fetch("/api/cart/removeItemsOfUserId/"+(this.props.location.state && this.props.location.state.referrer), {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(volumeId)
                }).then(function (response) {
                    console.log(response);

                });
        */
        this.setState({orderItems:this.state.orderItems.filter(item => item.bookId !== volumeId),
            volumeInfos:this.state.volumeInfos.filter(item => item.id !== volumeId),
            isLoading:false,
        });


        /*
        //
                                    //after remove, fetch again to remove removed item
                                    //
                                    this.setState({orderItems:[],isLoading:true});
                                    fetch('/api/cart/ofUserId/' + (this.props.location.state && this.props.location.state.referrer))
                                        .then((response) => response.json())
                                        .then((responseJson) => {
                                            this.setState({
                                                orderItems: responseJson,
                                                isLoading:false

                                            });
                                            console.log(responseJson);
                                        })
                                        .catch((error) => {
                                            console.error(error);
                                        });


                                    //this.setState({volumeInfos:[],isLoading:true});
                                    fetch('/api/cart/ofUserIdOfVolumeDetail/' + (this.props.location.state && this.props.location.state.referrer))
                                        .then((response) => response.json())
                                        .then((responseJson) => {
                                            this.setState({
                                                volumesInfos: responseJson,
                                                isLoading:false

                                            });
                                            console.log(responseJson);
                                        })
                                        .catch((error) => {
                                            console.error(error);
                                        });

                                    //
                                    //
                                    //

        */
    };

    /*
        getVolumeCount(volumeId){
            let foundItem=this.state.orderItems.find(item=>{

                if(item.bookId===volumeId) {
                    return item;
                }
            });
            return foundItem.count;
        };
    */


    render() {
        const { classes } = this.props;

        if(this.state.isLoading)
            return(<div><CircularProgress /></div>);

        //
        //update for volume after deleting
        //

        let orderItemsWithCount=this.state.orderItemsWithCount;
        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell>Avatar</CustomTableCell>
                            <CustomTableCell>Title</CustomTableCell>
                            <CustomTableCell numeric>#</CustomTableCell>
                            <CustomTableCell ></CustomTableCell>
                            <CustomTableCell numeric>Price</CustomTableCell>
                            <CustomTableCell ></CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderItemsWithCount.map(n => {
                            //let volumeCount=this.getVolumeCount(n.id);
                            return (
                                <TableRow className={classes.row} key={n.id}>
                                    <CustomTableCell >
                                        <img src={n.imageLinks} width="60" height="100" alt={n.title}></img>
                                    </CustomTableCell>
                                    <CustomTableCell>{n.title}</CustomTableCell>
                                    <CustomTableCell numeric>{n.count}</CustomTableCell>
                                    <CustomTableCell>
                <span>
                                                          <Button onClick={()=>this.handleIncrement(n.id)}>
                                                          <Add />
                                                          </Button>
                                                          <Button onClick={()=>this.handleDecrement(n.id)}>
                                                              <Remove />
                                                           </Button>
                                                    </span>
                                    </CustomTableCell>
                                    <CustomTableCell numeric>${discardFloatOf(9.80*n.count,2)}</CustomTableCell>
                                    <CustomTableCell>
                                    <span>
                                          <Button variant="fab" mini color="default" aria-label="info_icon"
                                                  component={Link}  to={{ pathname: "/detail/"+n.id, state: { referrer: (this.props.location.state && this.props.location.state.referrer) }

                                          }} >
                                          <InfoIcon />
                                          </Button>
                                          <Button variant="fab" mini color="default" aria-label="info_icon" onClick={()=>this.handleRemoveClick(n.id)}>
                                              <Clear />
                                           </Button>
                                    </span>
                                    </CustomTableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}
//remain up to Nth float
function discardFloatOf(num,n){
    return Math.floor( num * Math.pow( 10, n ) ) / Math.pow( 10, n ) ;
}

CustomizedList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedList);
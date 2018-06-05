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




async function getCartItemsOf(userId) {
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
            orderItemsWithCount:[],
            selected:[],
            isLoading:false,
        };
    }

    componentDidMount() {
        console.log("SHoppingCart fetching db of userId:"+(this.props.location.state && this.props.location.state.referrer));

        let userId=(this.props.location.state && this.props.location.state.referrer);



                let volInfos=[];
                let orItems=[];
                getCartItemsOf(userId)
                .then(responseData=>{
                    orItems=responseData;
                });
                getVolumeDetailOf(userId)
                .then(responseData=>{
                      volInfos=responseData;
                 })
                .then(()=>{
                    let cartItem=[];
                    console.log("volinfos");
                    console.log(volInfos);
                    console.log("orItems");
                    console.log(orItems);
                                volInfos.map((volume)=>{
                                     let foundVolume=this.getVolumeWithIdAndCountFromArrayAndVolumeId(orItems,volume["id"]);
                                     console.log("foundVolume");
                                    console.log(foundVolume);

                                     volume["count"]=foundVolume["count"];
                                     volume["orderId"]=foundVolume["id"];
                                     cartItem=cartItem.concat(volume);
                                });


                     this.setState({orderItemsWithCount:cartItem});
                });


    }


    getVolumeWithIdAndCountFromArrayAndVolumeId(array,volumeId){
        console.log("volId:"+volumeId);
        let foundItem=array.find(item=>{
            console.log("getvolcont:"+item.count);
            if(item.bookId===volumeId) {
                console.log("foundbookId::"+volumeId);
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

        this.setState({
            orderItemsWithCount:nextVolumeInfos,
        });

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

        this.setState({
            orderItemsWithCount:nextVolumeInfos,
        });

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
        fetch("/api/cart/putCount", {method, headers, body}).then((res)=> res.json()).then(console.log).catch(console.error);
    };

    handleRemoveClick=(volumeId)=>{

        console.log("remove items from order db.");



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

                console.log("delete succeed??");
        let nextItems=this.state.orderItemsWithCount.filter(item =>item.id !== volumeId);
        console.log(nextItems);

        this.setState({
            orderItemsWithCount:nextItems,
        });



    };



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
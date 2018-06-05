/*
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
*/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, Switch, Route, Redirect, BrowserRouter } from "react-router-dom";

import TextField from '@material-ui/core/TextField';

import client from './client.js';

import AutoGrid from './AutoGrid.js';
import MenuAppBar from './MenuAppBar.js';
import TitlebarGridList from'./TitlebarGridList.js';
import SimpleMediaCard from './SimpleMediaCard';
import MultipulSelect from './MultipulSelect';
import ControlledOpenSelect from './ControlledOpenSelect';
import ChipsArray from './ChipsArray';
import EnhancedTable from './EnhancedTable';
import InputAdornments from './InputAdornments';
import CustomizedTable from './CustomizedList';


import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import axios from 'axios';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AccountCircle from '@material-ui/icons/AccountCircle';

import GuttersGrid from "./GuttersGrid";



let queryProfile={
    category:[],
    language:[],
    orderBy:"rating",
    searchValue:"",
};
function setQueryElem(elem,val){
    queryProfile[elem]=val;
    console.log(queryProfile);
}

let searchValue="";



async function getVolumesWithCagegories(queryProfile) {
    try {
        const response = await axios.post('/api/volume/searchByCategories', {
            category:queryProfile["category"],
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId:-1,
            user:{},
            volumes:[],

            orderBy:"rating",
            category:[],
            queryProfile:{
                category:[],
                language:[],
                orderBy:"rating",
                searchValue:"",
            },
        };
    }


    componentDidMount() {
        console.log("User:");
        console.log((this.props.location.state && this.props.location.state.referrer));
        this.setState({user:(this.props.location.state && this.props.location.state.referrer)});

        fetch('/api/volume')
            .then((response) => response.json())
            .then((responseJson) =>
                this.setState({
                    volumes: responseJson
                })
            )
            .catch((error) => {
                console.error(error);
            });


    };

    loadVolumesFromServer = () => {
        fetch('/api/volume/searchByKeyword?keyword='+queryProfile["searchValue"])
            .then((response) => response.json())
            .then((responseJson) =>
                this.setState({
                    volumes: responseJson
                })
            )
            .catch((error) => {
                console.error(error);
            });



    };

    getOrderBy=(orderBy)=>{
        console.log("orderBy:"+orderBy);
        this.setState({orderBy:orderBy});
    };

    getCategories=(categories)=>{
        if(categories.length===0){
            fetch('/api/volume')
                .then((response) => response.json())
                .then((responseJson) =>
                    this.setState({
                        volumes: responseJson
                    })
                )
                .catch((error) => {
                    console.error(error);
                });
        }else {
            console.log("categories");
            console.log(categories);
            getVolumesWithCagegories({category: categories,language:[],})
                .then(responseData=>{
                    this.setState({volumes: responseData});
                });
        }

    };

    handleAddShoppingCart=(id)=>{
        console.log("add to shopping cart db with userId:"+this.state.user["id"]+",#:1, bookId:"+id);
        const obj = {userId:this.state.user["id"], bookId:id, count:1};
        const method = "POST";
        const body = JSON.stringify(obj);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        fetch("/api/cart/addCartOfUserId", {method, headers, body}).then((res)=> res.json()).then(console.log).catch(console.error);
    };

    render() {

        let nextVolumes;
        if(this.state.volumes.length > 0) {
            if (this.state.orderBy === "rating") {
                console.log("Sorting...raing");
                nextVolumes = this.state.volumes.sort(function (a, b) {
                    return b.averageRating - a.averageRating;
                });
            } else if(this.state.orderBy === "newest") {
                console.log("Sorting...newest");
                nextVolumes = this.state.volumes.sort(function (a, b) {
                    return (a.publishedDate < b.publishedDate ? 1 : -1);
                });
            }else{
                nextVolumes=this.state.volumes;
            }
        }


        return (
          <div>

            <SimpleMediaCard/>

              <br/>

              <GuttersGrid/>


              <MenuAppBar user={this.state.user}/>

              <span>
              <TextField
                  id="search"
                  label="Search keyword"
                  type="search"
                  margin="normal"
                  onChange={
                      (event)=>{
                          searchValue=event.target.value;
                      }
                  }
              />
              <IconButton onClick={
                  ()=>{
                      setQueryElem("searchValue",searchValue);
                      fetch('/api/volume/searchByKeyword?keyword='+searchValue)
                          .then((response) => response.json())
                          .then((responseJson) => {
                              this.setState({
                                  volumes: responseJson
                              });
                              console.log(responseJson);
                          })
                          .catch((error) => {
                              console.error(error);
                          });
                  }
              }>
              <SearchIcon/>
              </IconButton>
              </span>

              <span>
                <MultipulSelect setQueryElem={setQueryElem} getCategories={this.getCategories}/>
                <ControlledOpenSelect setQueryElem={setQueryElem} getOrderBy={this.getOrderBy}/>
              </span>



              <hr/>

              <TitlebarGridList userId={this.state.user["id"]} source={nextVolumes} handleAddShoppingCart={this.handleAddShoppingCart}/>





            </div>
        );
    }
}
//<AutoGrid/>
// <SimpleMediaCard />
//<PaperSheet/>
//<ChipsArray />
//<EnhancedTable source={source}/>
//<InputAdornments userId={this.state.userId}/>
class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
            </div>
        );
    }
}



export default App;

const source=[
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
    },
    {
        "kind": "books#volume",
        "id": "6RPcqWUgb6UC",
        "etag": "CQcMJUl5Gww",
        "selfLink": "https://www.googleapis.com/books/v1/volumes/6RPcqWUgb6UC",
        "volumeInfo": {
            "title": "Java",
            "publisher": "USERSHOP",
            "industryIdentifiers": [
                {
                    "type": "ISBN_13",
                    "identifier": "9789871773978"
                },
                {
                    "type": "ISBN_10",
                    "identifier": "9871773978"
                }
            ],
            "readingModes": {
                "text": false,
                "image": true
            },
            "printType": "BOOK",
            "maturityRating": "NOT_MATURE",
            "allowAnonLogging": false,
            "contentVersion": "preview-1.0.0",
            "imageLinks": {
                "smallThumbnail": "http://books.google.com/books/content?id=6RPcqWUgb6UC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                "thumbnail": "http://books.google.com/books/content?id=6RPcqWUgb6UC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
            },
            "language": "es",
            "previewLink": "http://books.google.com.mx/books?id=6RPcqWUgb6UC&printsec=frontcover&dq=java&hl=&cd=1&source=gbs_api",
            "infoLink": "http://books.google.com.mx/books?id=6RPcqWUgb6UC&dq=java&hl=&source=gbs_api",
            "canonicalVolumeLink": "https://books.google.com/books/about/Java.html?hl=&id=6RPcqWUgb6UC"
        },
        "saleInfo": {
            "country": "MX",
            "saleability": "NOT_FOR_SALE",
            "isEbook": false
        },
        "accessInfo": {
            "country": "MX",
            "viewability": "PARTIAL",
            "embeddable": true,
            "publicDomain": false,
            "textToSpeechPermission": "ALLOWED",
            "epub": {
                "isAvailable": false
            },
            "pdf": {
                "isAvailable": false
            },
            "webReaderLink": "http://play.google.com/books/reader?id=6RPcqWUgb6UC&hl=&printsec=frontcover&source=gbs_api",
            "accessViewStatus": "SAMPLE",
            "quoteSharingAllowed": false
        }
    }

];

/*
 @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)//For Long
    private Long id;
    @Column(name="title")
    private String title;
    //private List<String> authors;
    @Column(name="publisher")
    private String publisher;
    @Column(name="published_date")
    private String publishedDate;
    private String description;
    @Column(name="page_count")
    private Integer pageCount;
    //private List<String> categories;
    @Column(name="average_rating")
    private Float averageRating;
    //private ImageLinks imageLinks;
    @Column(name="language")
    private String language;
*/

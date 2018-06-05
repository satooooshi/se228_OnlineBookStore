import React,{ Component }from 'react';

export default class CountButton extends Component {

    constructor(props){
        super(props);
        console.log('constructor');
        this.state = { count: 0 };
        this.onClick = this.onClick.bind(this);
    }

    onClick(){
        console.log('onClick');
        this.setState((prevState, props) => {
            console.log('setState | prevState.count = ' + prevState.count);
            return { count: ++prevState.count }
        });
    }

    componentWillMount(){
        console.log('componentWillMount');
    }

    componentDidMount(){
        console.log('componentDidMount');
    }

    componentWillUnmount(){
        console.log('componentWillUnmount');
    }

    componentWillUpdate(nextProps, nextState){
        console.log('componentWillUpdate');
        console.log(nextState);
    }

    componentDidUpdate(prevProps, prevState){
        console.log('componentDidUpdate');
        console.log(prevState);
    }

    componentWillReceiveProps(nextProps){
        console.log('componentWillReceiveProps');
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log('shouldComponentUpdate');
        return true;
    }

    render() {
        console.log('render');
        var buttonStyle = {
            width: 100,
            height: 100,
            backgroundColor: "#3F51B5",
            color: "rgba(255,255,255,.87)",
            border: "none",
            borderRadius: 20,
            fontSize: 48,
            fontWeight: "bold"
        };
        return (
            <button style={buttonStyle} onClick={this.onClick}>
                {this.state.count}
            </button>
        );
    }
}
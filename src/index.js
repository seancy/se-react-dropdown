import React from "react";
import {render} from "react-dom";
import Component from "./component";
import "./index.scss"

const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
};

const arr = [
    {value: 'a0', text: 'name'},
    {value: 'a1', text: 'address'},
    {value: 'a2', text: 'city'},
    {value: 'a3', text: 'gender'},
    {value: 'a4', text: 'country'},
    {value: 'a5', text: 'direction'},
    {value: 'a6', text: 'time'},
    {value: 'a7', text: 'confirm'},
    {value: 'a8', text: 'unconfirm'},
    {value: 'a9', text: 'get'},
    {value: 'a10', text: 'difference'},
    {value: 'a11', text: 'none'},
    {value: 'a12', text: 'sentence'},

]

const numArr = [
    {value: ''},
    {value: '1'},
    {value: '2'},
    {value: '3'},
]

const numArr2 = [...Array(31).keys()].splice(1).map(item=>({value:item}))


class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data:numArr,
            num:2
        }
    }

    componentDidMount() {
        /*fetchPosts().then(response => {
          this.setState({
            posts: response.posts
          });
        });

        fetchComments().then(response => {
          this.setState({
            comments: response.comments
          });
        });*/
    }

    loadData(){
        this.setState({data:arr})
    }

    loadData0(){
        this.setState({data:[]})
    }

    increase(){
        this.setState(s=>{
            let num = s.num;
            num++
            return {num}
        })
    }

    changePages(){
        this.setState({data:arr, num:'a2'})
    }

    render() {
        const placeHolderStr = ""
        //const placeHolderStr = "Select filter options"
        return (
            <div style={styles}>
                <Component
                    //enableEmptyOption={true}
                    data={this.state.data} placeHolderStr={placeHolderStr}
                    value={this.state.num}
                    onChange={e => console.log(e)}
                />
                <button onClick={this.increase.bind(this)}>increase{this.state.num}</button>
                <button onClick={this.changePages.bind(this)}>change pages</button>
                <button onClick={this.loadData.bind(this)}>load data</button>
                <button onClick={this.loadData0.bind(this)}>load data 0</button>
            </div>
        );
    }
}

render(<App/>, document.querySelector(".root"));

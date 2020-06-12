import React from "react";
import {render} from "react-dom";
import Component from "./component";
import "./index.scss"

const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
};


const shortArr = [
    {value: 'a0', text: 'name'},
    {value: 'a1', text: 'address'},
    {value: 'city', text: 'City'},

]

const arr = [
    {value: 'a3', text: 'gender'},
    {value: 'a4', text: 'country'},
    {value: 'direction', text: 'Direction'},
    {value: 'a6', text: 'time'},
    {value: 'a7', text: 'confirm'},
    {value: 'a8', text: 'unconfirm'},
    {value: 'a9', text: 'get'},
    {value: 'a10', text: 'difference'},
    {value: 'a11', text: 'none'},
    {value: 'a12', text: 'sentence'},

]

const numArr = [
    //{value: ''},
    {value: '1'},
    {value: '2'},
    {value: '3'},
    {value: '4'},
    {value: '5'},
    {value: '6'},
]

//const numArr2 = [...Array(31).keys()].splice(1).map(item=>({value:item}))


class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            //data:numArr,
            data:arr,

            //value:2,
            //value:'2,3,4',
            //value:'direction',
            value:'direction,a6',
            enableMultiple:false,
            searchable:true,
            selectedItem:null
        }
    }

    componentDidMount() {
        setTimeout(()=>{
            //this.setState({data:shortArr})
        },1000)
    }

    loadNumberData(){
        this.setState({data:numArr})
    }

    loadShortData(){
        this.setState({data:shortArr})
    }

    loadData(){
        this.setState({data:arr})
    }

    loadData0(){
        this.setState({data:[]})
    }

    increase(){
        this.setState(s=>{
            let value = s.value;
            value++
            return {value}
        })
    }

    setValue(value){
        this.setState({value})
    }

    updateSelectedItem(selectedItem){
        this.setState({selectedItem}, ()=>{
            console.log(this.state.selectedItem)
        })
    }

    changeMultipleStatus(e){
        const enableMultiple =e.currentTarget.checked
        this.setState({enableMultiple})
    }

    render() {
        const placeHolderStr = ""
        //const placeHolderStr = "Select filter options"
        const {enableMultiple,searchable}=this.state
        const render=(text,item)=>{
            return `${text} - ${item.value}`
        }
        return (
            <div style={styles}>
                <Component
                    //enableEmptyOption={true}
                    sign='caret'
                    multiple={enableMultiple} searchable={searchable}
                    optionRender={render}
                    data={this.state.data} placeHolderStr={placeHolderStr}
                    value={this.state.value}
                    onChange={this.updateSelectedItem.bind(this)}
                />
                <div className="button-wrapper">
                    <button onClick={this.increase.bind(this)}>increase{this.state.num}</button>
                    <button onClick={this.loadNumberData.bind(this)}>load number data</button>
                    <button onClick={this.loadShortData.bind(this)}>load short data</button>
                    <button onClick={this.loadData.bind(this)}>load data</button>
                    <button onClick={this.loadData0.bind(this)}>load data 0</button>
                </div>
                <div className="value-switcher">
                    <span>change dropdown value to:</span>
                    <ul>
                        {['2','city','direction'].map(p=>{
                            return (
                                <li key={p}>
                                    <input onClick={this.setValue.bind(this, p)} name="value-switcher" type="radio" id={'radio-'+p}/>
                                    <label htmlFor={'radio-'+p}>{p}</label>
                                </li>
                            )
                        })}
                        <li>
                            <input type="checkbox" checked={enableMultiple} onChange={this.changeMultipleStatus.bind(this)} id='enable-multiple'/>
                            <label htmlFor="enable-multiple">enable multiple</label>
                        </li>
                        <li>
                            <input type="checkbox" checked={searchable} onChange={e=>this.setState({searchable:e.currentTarget.checked})} id='enable-searchable'/>
                            <label htmlFor="enable-searchable">searchable</label>
                        </li>

                    </ul>
                </div>

            </div>
        );
    }
}

render(<App/>, document.querySelector(".root"));

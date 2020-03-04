import React from "react";
import ReactDOM from "react-dom";

import "./component.scss"
import ChevronDown from './chevron-down-solid.svg'
import ChevronUp from './chevron-up-solid.svg'

class Component extends React.Component {
    constructor(props, context) {
        super(props, context);

        const {data, value} = props
        let item = data.find(p => p.value == value) || this.props.data[0]
        this.state = {
            data: props.data,
            isOpen: false,
            selected: item || {}
        };
        this.myRef = React.createRef();

        if (item){
            this.fireOnChange()
        }

        document.addEventListener("click", this.hidePanel.bind(this), true);
    }

    componentWillReceiveProps(nextProps) {
        const {data}=nextProps
        if (data.length <= 0 || !data.every(e => this.state.data.includes(e))) {
            setTimeout(()=>{
                this.setState(()=>{
                    return {
                        data,
                        selected: data.find(p => p.value == nextProps.value) || (data.length>0?data[0]:{text:'',value:''})
                    }
                })
            },50)
        }

        setTimeout(()=>{
            if (nextProps.value !== this.state.selected.value) {
                const item = this.state.data.find(p => p.value == nextProps.value)
                item && this.setState({
                    selected: item
                })
            }
        }, 100)

    }


    hidePanel = e => {
        if (!this.myRef.current) {
            return;
        }
        const root = ReactDOM.findDOMNode(this.myRef.current);
        if (root && root.contains(e.target) && this.container !== e.target) {
            return;
        }
        this.setState({isOpen: false});
    };

    toggle = () => {
        this.setState({isOpen: !this.state.isOpen});
    };

    select(item) {
        this.setState({
            selected: item,
            isOpen: false
        }, this.fireOnChange)
    }

    fireOnChange(){
        const {onChange} = this.props
        if (onChange) {
            onChange(this.state.selected)
        }
    }

    render() {
        const {data, selected, isOpen} = this.state;
        return (
            <div ref={this.myRef} className={'se-react-dropdown ' + (this.props.className || '')}>
                <div className="select" onClick={this.toggle.bind(this)}>
                    <span className="text">{selected.text || selected.value || this.props.placeHolderStr}</span>
                    {isOpen ? (<ChevronUp/>) : (<ChevronDown/>)}
                </div>
                <ul className={'panel' + (!this.state.isOpen && ' hide' || '')}>
                    {data.map(item => (
                        <li key={item.text || item.value} onClick={this.select.bind(this, item)}
                            className={(item.value == selected.value?'active':'')}
                            >{item.text || item.value}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Component;


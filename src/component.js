import React from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types'

import "./component.scss"
import ChevronDown from './chevron-down-solid.svg'
import ChevronUp from './chevron-up-solid.svg'

class Component extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isOpen: false,
            selectedValue:props.value
        };
        this.myRef = React.createRef();

        document.addEventListener("click", this.hidePanel.bind(this), true);
    }

    /*componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.state.selectedValue) {
            this.setState({selectedValue: nextProps.value}, this.fireOnChange.bind(this))
        }
    }*/


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
            selectedValue:item.value,
            isOpen: false
        }, this.fireOnChange)
    }

    fireOnChange(){
        const {onChange} = this.props
        if (onChange) {
            onChange(this.getSelected())
        }
    }

    getSelected(){
        const {data}=this.props
        let selected = data.find(p=>p.value==this.state.selectedValue)
        if (!selected && data.length){
            selected = data[0]
        }
        return selected || {}
    }

    render() {
        const {data}=this.props
        let {isOpen} = this.state;
        let selected = this.getSelected()
        const defaultVal = selected.text || selected.value
            || this.props.placeHolderStr
        return (
            <div ref={this.myRef} className={'se-react-dropdown ' + (this.props.className || '')}>
                <div className="select" onClick={this.toggle.bind(this)}>
                    <span className="text">{defaultVal}</span>
                    {isOpen ? (<ChevronUp/>) : (<ChevronDown/>)}
                </div>
                <ul className={'panel' + (!this.state.isOpen && ' hide' || '')}>
                    {data.map(item => (
                        <li key={item.text || item.value} onClick={this.select.bind(this, item)}
                            className={(item.value == selected.value ?'active':'')}
                            >{item.text || item.value}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Component;

Component.propTypes = {
    data:PropTypes.arrayOf(PropTypes.exact({
        value:PropTypes.string,
        text:PropTypes.string
    })),
    value:PropTypes.string,
    placeHolderStr:PropTypes.string,
    onChange:PropTypes.func,
}

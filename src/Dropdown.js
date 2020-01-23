import React from "react";
import ReactDOM from "react-dom";

import "./Dropdown.scss"
import ChevronDown from './chevron-down-solid.svg'
import ChevronUp from './chevron-up-solid.svg'

class Dropdown extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            data: props.data,
            isOpen: false,
            selected: {},
        };

        this.myRef = React.createRef();

        document.addEventListener("click", this.hidePanel.bind(this), true);
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

    select = (item) => {
        this.setState({
            selected: item
        })
        const {onChange}=this.props
        if (onChange){
            onChange(item)
        }
        this.setState({isOpen: false});
    }

    render() {
        const {selected, isOpen} = this.state;
        return (
            <div ref={this.myRef} className={'se-react-dropdown ' + (this.props.className || '')}>
                <div className="select" onClick={this.toggle.bind(this)}>
                    <span className="text">{selected.text || 'Select filter options'}</span>
                    {isOpen? (<ChevronUp/>):(<ChevronDown/>)}
                </div>
                <ul className={'panel' + (!this.state.isOpen && ' hide' || '')}>
                    {[{text:'', value:''}].concat(this.state.data).map(item => (
                        <li key={item.text} onClick={this.select.bind(this, item)} value={item.value}>{item.text}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Dropdown;


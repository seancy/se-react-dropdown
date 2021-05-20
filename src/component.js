import React from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types'

import "./component.scss"
import ChevronDown from './chevron-down-solid.svg'
import ChevronUp from './chevron-up-solid.svg'
import CaretUp from './caret-up-solid.svg'
import CaretDown from './caret-down-solid.svg'
import equal from 'fast-deep-equal'

class Dropdown extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isOpen: false,
            filterValue: '',
            selectedValues: props.value ? props.value.toString().split(',') : [],
            selectedValue: props.value
        };
        this.myRef = React.createRef();

        document.addEventListener("click", this.hidePanel.bind(this), true);
    }

    componentDidUpdate(prevProps) {
        const {value,multiple}=this.props
        if(!equal(value, prevProps.value))
        {
            if (multiple) {
                this.setState({selectedValues:value.toString().split(',')})
            }else {
                this.setState({selectedValue:value})
            }
        }
    }

    clean() {
        this.setState({
            selectedValues: [],
            selectedValue: ''
        }, this.fireOnChange)
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
        const {multiple} = this.props
        if (multiple) {
            return false;
        }
        this.setState({
            selectedValue: item.value,
            isOpen: false
        }, this.fireOnChange)
    }

    selectMultiple(e, item) {
        const target = e.currentTarget, checked = target.checked
        this.setState((prev) => {
            let {selectedValues} = prev
            if (checked) {
                selectedValues.push(item.value)
            } else {
                selectedValues = selectedValues.filter(val => val != item.value)
            }
            return {
                selectedValues
                //isOpen: false
            }
        }, this.fireOnChange)
    }

    fireOnChange() {
        const {onChange} = this.props
        if (onChange) {
            onChange(this.getSelected())
        }
    }

    getSelected() {
        const {data, multiple} = this.props
        const {selectedValue, selectedValues} = this.state
        let selectedItems = [], selectedItem = null
        if (multiple) {
            selectedItems = data.filter(p => {
                return selectedValues.includes(p.value)
            })
            return selectedItems
        } else {
            selectedItem = data.find(p => {
                return p.value === selectedValue
            })
            /*if (!selectedItem && data.length){
                selectedItem = data[0] || {}
            }*/
            if (!selectedItem) {
                selectedItem = {text: '', value: ''}
            }
            return selectedItem
        }
        //return selected.length <= 1 ? (selected[0] || {}) : selected
    }

    getUpOrDownIcon(isOpen) {
        if (isOpen) {
            return this.props.sign == 'caret' ? <CaretUp/> : <ChevronUp/>
        } else {
            return this.props.sign == 'caret' ? <CaretDown/> : <ChevronDown/>
        }
    }

    render() {
        const {data, multiple, optionRender, searchable} = this.props
        let {isOpen, filterValue, selectedValues} = this.state;
        let selected = this.getSelected()
        const getDefaultVal = (item) => {
            if (multiple) {
                return selected.map((p, i) => (<span key={`span-${i}`}>{getItemText(p)}</span>))
            } else {
                return getItemText(item)
                    || this.props.placeHolderStr
            }
        }
        const getItemText = (item) => {
            return optionRender ? optionRender(item.text, item) : (item.text || item.value)
        }
        const getIfChecked = item => {
            if (multiple) {
                return selected.find(p => p.value == item.value) == null ? false : true
            } else {
                return selected.value == item.value
            }

        }
        const list = filterValue != '' ? data.filter(({text, value}) => ((text || value).toLowerCase().includes(filterValue.toLowerCase()) || selectedValues.includes(value))) : data
        return (
            <div ref={this.myRef} className={'lt-react-dropdown ' + (this.props.className || '')}>
                <div className="select" onClick={this.toggle.bind(this)}>
                    {<span className="text">{getDefaultVal(selected)}</span>}
                    {/*{multiple && <input type="text" onChange={e=>this.setState({filterValue:e.currentTarget.value})}/>}*/}
                    {this.getUpOrDownIcon(isOpen)}
                </div>
                <div className={'panel' + (!this.state.isOpen && ' hide' || '')}>
                    {searchable && <input type="text" ref={input => input && input.focus()}
                                          onChange={e => this.setState({filterValue: e.currentTarget.value})}/>}
                    <ul>
                        {list.map((item, i) => {
                            const boxID = `box-${i}`
                            return (

                                <li key={`index-${i}`} onClick={this.select.bind(this, item)}
                                    className={(item.value == selected.value ? 'active' : '')}
                                >
                                    {multiple && <input type="checkbox" id={boxID} checked={getIfChecked(item)}
                                                        onChange={(e) => {
                                                            this.selectMultiple(e, item)
                                                        }}/>}
                                    {multiple && <label htmlFor={boxID}>{getItemText(item)}</label>}
                                    {!multiple && getItemText(item)}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Dropdown;

Dropdown.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        text: PropTypes.string
    })),
    multiple: PropTypes.bool,
    searchable: PropTypes.bool,
    optionRender: PropTypes.func,
    value: PropTypes.string,
    placeHolderStr: PropTypes.string,
    onChange: PropTypes.func
}

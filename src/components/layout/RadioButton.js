import React, { Component } from 'react'
import PropTypes from 'prop-types'

class RadioButton extends Component {
    static propTypes = {
        runtime: PropTypes.string.isRequired,
        runtimeText: PropTypes.string.isRequired,
        runtimeId: PropTypes.string.isRequired,
        selectedRuntime: PropTypes.number.isRequired
    }

    render() {
        const { runtime, runtimeText, runtimeId, selectedRuntime } = this.props;
        let checkedRuntime = false;
        if (runtime === selectedRuntime){
            checkedRuntime = true;
        }

        return (
            <div className="runtime-filter">
                <input 
                    type="radio" 
                    className="film-times" 
                    name="runtime" 
                    id={runtimeId}
                    value={runtime}
                    defaultChecked={checkedRuntime}
                        />
                <label htmlFor={runtimeId}>{runtimeText}</label>
            </div>)
    }
}

export default RadioButton

import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class RadioButton extends Component {
    static propTypes = {
        runtime: PropTypes.string.isRequired,
        runtimeText: PropTypes.string.isRequired,
        runtimeId: PropTypes.string.isRequired
    }

    render() {
        return (
            <div className="runtime-filter">
                <input 
                    type="radio" 
                    className="film-times" 
                    name="runtime" 
                    id={this.props.runtimeId}
                    value={this.props.runtime}
                        />
                <label htmlFor={this.props.runtimeId}>{this.props.runtimeText}</label>
            </div>)
    }
}

export default RadioButton

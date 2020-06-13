import React, { Component } from 'react'
import PropTypes from 'prop-types';

class Checkbox extends Component {
    static propTypes = {
        genre: PropTypes.string.isRequired
    }   

    render() {
        return (
            <div className="genre-selector">
                <input id={this.props.genre} type="checkbox" className="genre-items" value={this.props.genre} />
                <label htmlFor={this.props.genre}>{this.props.genre}</label>    
            </div>)
    }
}

export default Checkbox

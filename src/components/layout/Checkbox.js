import React, { Component } from 'react'
import PropTypes from 'prop-types';

class Checkbox extends Component {
    static propTypes = {
        genre: PropTypes.string.isRequired,
        genres: PropTypes.array.isRequired
    }   

    render() {
        const { genre, genres } = this.props;
        let checkedGenre = genres.some(g => genres.includes(genre));

        return (
            <div className="genre-selector">
                <input id={this.props.genre} defaultChecked={checkedGenre} type="checkbox" className="genre-items" value={this.props.genre} />
                <label htmlFor={this.props.genre}>{this.props.genre}</label>    
            </div>)
    }
}

export default Checkbox

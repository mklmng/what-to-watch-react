import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FilmCard extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
        director: PropTypes.array.isRequired,
        genres: PropTypes.array.isRequired,
        runtime: PropTypes.number.isRequired,
        whereToWatch: PropTypes.string.isRequired,
        trailer: PropTypes.string.isRequired,
        handleToggleOverlay: PropTypes.func.isRequired,
        convertTime: PropTypes.func.isRequired
    }

    render() {
        const { id, title, year, director, genres, runtime, whereToWatch, trailer, handleToggleOverlay, convertTime } = this.props;

        let fullGenres = genres.join(", ");
        let fullDirector = (director.length > 1 ? director.join(", ") : director);
        let fullTime = convertTime(runtime);

        return (
            <div className="col-md-4" key={id}>
                <div className="card film-card mb-4 box-shadow">
                    <img className="card-img-top" src={`https://via.placeholder.com/336x255?text=${title}`} alt={title} />
                    <div className="card-body">                            
                        <p itemScope className="card-text">
                            <span className="card-text__category">Title: </span> 
                            <span itemProp="title">{title}</span>
                        </p>
                        <p itemScope className="card-text">
                            <span className="card-text__category">Year: </span> 
                            <span itemProp="year">{year}</span>
                        </p>
                        <p itemScope className="card-text">
                            <span className="card-text__category">Director: </span> 
                            <span itemProp="director">{fullDirector}</span>
                        </p>
                        <p itemScope className="card-text">
                            <span className="card-text__category">Genres: </span>
                            <span itemProp="genres">{fullGenres}</span>
                        </p>
                        <p itemScope className="card-text">
                            <span className="card-text__category">Runtime: </span>
                            <span itemProp="runtime">{fullTime}</span>
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                                <a href={`https://www.justwatch.com/uk/movie/${whereToWatch}`} className="btn btn-sm btn-outline-secondary btn-vod">Watch Film</a>
                                <button type="button" className="btn btn-sm btn-outline-secondary btn-trailer" onClick={() => handleToggleOverlay(trailer)}>Watch trailer</button>
                            </div>
                        </div>
                    </div>
                </div>    
            </div>
        )
    }
}

export default FilmCard;
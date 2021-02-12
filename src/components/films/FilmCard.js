import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';

class FilmCard extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
        director: PropTypes.array.isRequired,
        genres: PropTypes.array.isRequired,
        runtime: PropTypes.number.isRequired,
        watched: PropTypes.bool.isRequired,
        whereToWatch: PropTypes.string.isRequired,
        trailer: PropTypes.string.isRequired,
        handleToggleOverlay: PropTypes.func.isRequired,
        convertTime: PropTypes.func.isRequired,
        toggleFilmWatched: PropTypes.func.isRequired,
        handleFilterByYear: PropTypes.func.isRequired,
        handleFilterByDirector: PropTypes.func.isRequired,
        handleFilterByGenre: PropTypes.func.isRequired
    }

    render() {
        const { id, title, year, director, genres, runtime, watched, whereToWatch, trailer, handleToggleOverlay, convertTime, toggleFilmWatched, handleFilterByYear, handleFilterByDirector, handleFilterByGenre } = this.props;
        let fullTime = convertTime(runtime);

        return (
            <div className="col-md-4" key={id}>
                <div className={`card film-card mb-4 box-shadow ${watched ? 'watched' : ''}`}>                
                    <button className="icon-watched" title={`${!watched ? 'Mark as watched' : 'Mark as unwatched'}`} onClick={() => toggleFilmWatched(id)}></button>
                    <img className="card-img-top" src={`https://via.placeholder.com/336x255?text=${title}`} alt={`Poster of ${title}`} />
                    <div className="card-body">                            
                        <p itemScope className="card-text">
                            <span className="card-text__category">Title: </span> 
                            <span itemProp="title">{title}</span>
                        </p>
                        <p itemScope className="card-text">
                            <span className="card-text__category">Year: </span> 
                            <span className="card-text__filter" itemProp="year" onClick={() => handleFilterByYear(year)}>{year}</span>
                        </p>
                        <p itemScope className="card-text">
                            <span className="card-text__category">Director: </span> 
                            {director.map((d, index) => {
                            return (
                                <Fragment key={index}>
                                    <span 
                                        className="card-text__filter"
                                        itemProp="director" 
                                        onClick={() => handleFilterByDirector(d)}
                                        >
                                    {d}
                                    </span>{(index < director.length - 1) && ', '}
                                </Fragment>
                                )
                                })
                            }
                        </p>
                        <p itemScope className="card-text">
                            <span className="card-text__category">Genres: </span>
                            {genres.map((g, index) => {
                            return (
                                <Fragment key={index}>
                                    <span 
                                        className="card-text__filter"
                                        itemProp="genre" 
                                        onClick={() => handleFilterByGenre(g)}
                                        >
                                    {g}
                                    </span>{(index < genres.length - 1) && ', '}
                                </Fragment>
                                )
                                })
                            }                            
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
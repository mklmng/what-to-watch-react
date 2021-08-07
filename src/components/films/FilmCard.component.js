import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';

import './FilmCard.styles.css';

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
            <li className='item' key={id}>
                <div className={`card film-card item-container ${watched ? 'watched' : ''}`}>
                    <button className='icon-watched' title={`${!watched ? 'Mark as watched' : 'Mark as unwatched'}`} onClick={() => toggleFilmWatched(id)}></button>

                    <div className='item-poster-container'>
                        <img src={`https://via.placeholder.com/510x360?text=${title}`} alt={`Poster of ${title}`}  className='item-poster' />
                        <div className='card-body'></div>
                    </div>
                    <div className='item-title-container'>
                        <h1>{title}</h1>
                        <p itemScope className='card-text'>
                            <span className='card-text--description'>Directed by:</span>{director.map((d, index) => {
                            return (
                                <Fragment key={index}>
                                    <span 
                                        className='card-text__filter'
                                        itemProp='director' 
                                        onClick={() => handleFilterByDirector(d)}
                                        >
                                    {d}
                                    </span>{(index < director.length - 1) && ', '}
                                </Fragment>
                                )
                                })
                            }
                        </p>
                        <p itemScope className='card-text'>
                            <span className='card-text--description'>Genres:</span>
                            {genres.map((g, index) => {
                            return (
                                <Fragment key={index}>
                                    <span 
                                        className='card-text__filter'
                                        itemProp='genre' 
                                        onClick={() => handleFilterByGenre(g)}
                                        >
                                    {g}
                                    </span>{(index < genres.length - 1) && ', '}
                                </Fragment>
                                )
                                })
                            }                            
                        </p>
                        <p itemScope className='card-text'>
                            <span itemProp='runtime'>{fullTime}</span>
                        </p>
                        <p itemScope className='card-text'>
                            <span className='card-text__filter' itemProp='year' onClick={() => handleFilterByYear(year)}>({year})</span>
                        </p>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div className='btn-group'>
                                {whereToWatch && <a href={`https://www.justwatch.com/uk/movie/${whereToWatch}`} className='btn btn-sm btn-outline-secondary btn-vod'>Watch Film</a>}
                                {trailer && <button type='button' className='btn btn-sm btn-outline-secondary btn-trailer' onClick={() => handleToggleOverlay(trailer)}>Watch trailer</button>}
                            </div>
                        </div>
                    </div>
                </div>       
            </li>
        )
    }
}

export default FilmCard;
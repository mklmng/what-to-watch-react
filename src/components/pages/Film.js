import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

export class Film extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
        director: PropTypes.array.isRequired,
        genres: PropTypes.array.isRequired,
        runtime: PropTypes.number.isRequired,
        whereToWatch: PropTypes.string.isRequired,
        trailer: PropTypes.string.isRequired
    }

    render() {
        const { title, year, director, genres, runtime, whereToWatch, trailer } = this.props.location;

        return (
            <div className="container">
                <div className="row products-list">
                    <div className="col-md-4">
                        <div className="card film-card mb-4 box-shadow">
                            <img className="card-img-top" src={`https://via.placeholder.com/336x255?text=${title}`} alt={title} />
                                <div className="card-body">
                                    <p className="card-text">
                                        <span>Title: </span> {title}
                                    </p>
                                    <p className="card-text">
                                        <span>Year: </span> {year}
                                    </p>
                                    <p className="card-text">
                                        <span>Director: </span> {director}
                                    </p>
                                    <p className="card-text"><span>Genres: </span> {genres}</p>
                                    <p className="card-text"><span>Runtime: </span> {runtime}</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="btn-group">
                                            <a href={`https://www.justwatch.com/uk/movie/${whereToWatch}`} className="btn btn-sm btn-outline-secondary btn-vod">Watch Film</a>
                                            <button 
                                                type="button" 
                                                className="btn btn-sm btn-outline-secondary btn-trailer"
                                                >Watch trailer</button>
                                        </div>
                                    </div>
                                </div>
                        </div> 
                    </div>
                </div>  
                <Link to ='/' className='btn ntb-light'>
                Back to Search
                </Link>
                {/* <p>
                    <b>Title: </b>{this.props.location.title}
                </p>
                <p>
                    <b>Year: </b>{this.props.location.year}
                </p> */}


            </div>                 

        )
    }
}

export default Film

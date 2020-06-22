import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FilmCard extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
        director: PropTypes.array.isRequired,
        genres: PropTypes.array.isRequired,
        whereToWatch: PropTypes.string.isRequired,
        handleToggleOverlay: PropTypes.func.isRequired,
        trailer: PropTypes.string.isRequired
    }

    render() {
        const convertTime = (time) => {
            let hours = time / 60;
            if (time < 60){
                return `${time}mins`;
            } 
            let fullTime = ((time % 60) > 0) ? `${Math.floor(hours)}h ${(time % 60)}mins` : `${hours}h`;
            return fullTime;
        }

        let fullGenres = this.props.genres.join(", ");
        let fullDirector = (this.props.director.length > 1 ? this.props.director.join(", ") : this.props.director);
        let fullTime = convertTime(this.props.runtime);

        return (
            <div className="col-md-4" key={this.props.id}>
                <div className="card film-card mb-4 box-shadow">
                    <img className="card-img-top" src={`https://via.placeholder.com/336x255?text=${this.props.title}`} alt={this.props.title} />
                    <div className="card-body">                            
                        <p className="card-text">
                            <span>Title: </span> {this.props.title}
                        </p>
                        <p className="card-text">
                            <span>Year: </span> {this.props.year}
                        </p>
                        <p className="card-text">
                            <span>Director: </span> {fullDirector}
                        </p>
                        <p className="card-text">
                            <span>Genres: </span> {fullGenres}
                        </p>
                        <p className="card-text">
                            <span>Runtime: </span> {fullTime}
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                                <a href={`https://www.justwatch.com/uk/movie/${this.props.whereToWatch}`} className="btn btn-sm btn-outline-secondary btn-vod">Watch Film</a>
                                <button type="button" className="btn btn-sm btn-outline-secondary btn-trailer" onClick={() => this.props.handleToggleOverlay(this.props.trailer)}>Watch trailer</button>
                            </div>
                        </div>
                    </div>
                </div>    
            </div>
        )
    }
}

export default FilmCard;
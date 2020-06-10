import React, { Fragment , Component } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import FilmCard from './FilmCard';
import PropTypes from 'prop-types'

export class FilmList extends Component {
    static propTypes = {
        watched: PropTypes.bool.isRequired,
        runtime: PropTypes.number.isRequired
    }

    state = {
        films: [],
        loading: false
    }

    componentDidMount() {
        this.setState({ loading: true }, () => {
            axios.get('https://gist.githubusercontent.com/mklmng/fa894dc9c86dfed34e45063adcf1b73e/raw/aaebe9185fbb4b1ebcaf5343335168c9d2898f9a/Films.json')
            .then(response => {
                this.setState({ films: response.data, loading: false })
            })
            .catch(error => {
                this.setState({ loading: false })
            });
        });
    }   

    render() {
        let results = '';
        let filteredFilms = this.state.films;

        if (!this.props.watched){
            filteredFilms = filteredFilms.filter(film => film.watched === this.props.watched && film.runtime <= this.props.runtime);
        } else{
            filteredFilms = filteredFilms.filter(film => film.runtime <= this.props.runtime);
        }

        if (filteredFilms.length > 0){
            if (filteredFilms.length > 1){
            results = `There are ${filteredFilms.length} matches.`; 
            } else {
                results = `There is 1 match.`
            }
        } else {
            results = `Sorry. There aren't any matches.`
        }

        return (
            <Fragment>
                <div className="row space-below">
                    <div className="col-md-12">
                        <div className="results">
                            {results}
                        </div>
                    </div>
                </div>
                <div className="row">
                    {this.state.loading && <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                    </Spinner>}
                    {filteredFilms.map((film) => {
                        return (
                            <FilmCard 
                                key={film.id}
                                id={film.id}
                                title={film.title}
                                year={film.year}
                                director={film.director}
                                genres={film.genres}
                                runtime={film.runtime}
                                whereToWatch={film.whereToWatch}
                                trailer={film.trailer}
                            />
                        )                            
                    })}
                </div>
            </Fragment>
        )
    } 
}

export default FilmList